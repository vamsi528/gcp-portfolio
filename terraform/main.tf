terraform {
  required_version = ">= 1.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Uncomment to store state in GCS (recommended for CI/CD):
  # backend "gcs" {
  #   bucket = "vamsithokala-tfstate"
  #   prefix = "terraform/state"
  # }
}

# ─────────────────────────────────────────────────────────────────
# Local: resolved project ID (created or existing)
# ─────────────────────────────────────────────────────────────────
locals {
  project = var.project_id
}

# ─────────────────────────────────────────────────────────────────
# Provider — uses ADC (gcloud auth application-default login),
# never a service account JSON key file.
# ─────────────────────────────────────────────────────────────────
provider "google" {
  project = var.project_id
  region  = var.region
}

# ─────────────────────────────────────────────────────────────────
# Optional: create the project + link billing (automated, no GUI)
# ─────────────────────────────────────────────────────────────────
resource "google_project" "portfolio" {
  count = var.create_project ? 1 : 0

  name            = var.project_name
  project_id      = var.project_id
  billing_account = var.billing_account != "" ? var.billing_account : null
}

# ─────────────────────────────────────────────────────────────────
# Enable required APIs
# ─────────────────────────────────────────────────────────────────
resource "google_project_service" "run" {
  project = local.project
  service = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  project = local.project
  service = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "domains" {
  project = local.project
  service = "domains.googleapis.com"
  disable_on_destroy = false
}

# ─────────────────────────────────────────────────────────────────
# Artifact Registry repository for container images
# ─────────────────────────────────────────────────────────────────
resource "google_artifact_registry_repository" "images" {
  project       = local.project
  location      = var.region
  repository_id = var.image_repository
  format        = "DOCKER"

  depends_on = [google_project_service.run]
}

# ─────────────────────────────────────────────────────────────────
# Cloud Run service (scales to zero when idle → zero cost)
# ─────────────────────────────────────────────────────────────────
resource "google_cloud_run_v2_service" "portfolio" {
  name     = var.service_name
  location = var.region
  project  = local.project

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${local.project}/${var.image_repository}/${var.service_name}"
      ports {
        container_port = var.container_port
      }
      resources {
        limits = {
          cpu    = var.cpu
          memory = var.memory
        }
      }
    }

    scaling {
      min_instance_count = var.min_instances   # 0 = scale to zero (free when idle)
      max_instance_count = var.max_instances
    }
  }

  # Allow unauthenticated access (public portfolio site)
  ingress = "INGRESS_TRAFFIC_ALL"

  depends_on = [google_project_service.run]
}

# ─────────────────────────────────────────────────────────────────
# Public access (allows anyone to visit your site)
# ─────────────────────────────────────────────────────────────────
resource "google_cloud_run_service_iam_member" "public" {
  project  = local.project
  location = google_cloud_run_v2_service.portfolio.location
  service  = google_cloud_run_v2_service.portfolio.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ─────────────────────────────────────────────────────────────────
# Domain mapping to vamsithokala.in (uncomment after domain purchase)
# ─────────────────────────────────────────────────────────────────
# resource "google_cloud_run_domain_mapping" "custom" {
#   location = var.region
#   name     = "vamsithokala.in"
#
#   metadata {
#     namespace = local.project
#   }
#
#   spec {
#     route_name = google_cloud_run_v2_service.portfolio.name
#   }
# }
