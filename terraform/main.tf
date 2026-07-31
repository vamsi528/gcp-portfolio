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

provider "google" {
  project = var.project_id
  region  = var.region
}

# ─────────────────────────────────────────────────────────────────
# Enable required APIs
# ─────────────────────────────────────────────────────────────────
resource "google_project_service" "run" {
  service = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  service = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "domains" {
  service = "domains.googleapis.com"
  disable_on_destroy = false
}

# ─────────────────────────────────────────────────────────────────
# Cloud Run service (scales to zero when idle → zero cost)
# ─────────────────────────────────────────────────────────────────
resource "google_cloud_run_v2_service" "portfolio" {
  name     = var.service_name
  location = var.region

  template {
    containers {
      image = "us-docker.pkg.dev/${var.project_id}/cloud-run-source-deploy/${var.service_name}"
      ports {
        container_port = 8080
      }
      resources {
        limits = {
          cpu    = "1000m"
          memory = "256Mi"
        }
      }
    }

    scaling {
      min_instance_count = 0   # ← scale to zero (free when idle)
      max_instance_count = 3
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
#     namespace = var.project_id
#   }
#
#   spec {
#     route_name = google_cloud_run_v2_service.portfolio.name
#   }
# }
