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

resource "google_project_service" "certificatemanager" {
  project = local.project
  service = "certificatemanager.googleapis.com"
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
# Cloud Run service is created and managed by Cloud Build
# (gcloud run deploy in cloudbuild.yaml handles create + update).
# Terraform only creates the underlying infrastructure (APIs, AR).
# ─────────────────────────────────────────────────────────────────

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
