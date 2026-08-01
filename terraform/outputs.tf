output "project_id" {
  description = "The resolved GCP project ID"
  value       = google_cloud_run_v2_service.portfolio.project
}

output "cloud_run_url" {
  description = "The auto-generated .run.app URL for your service"
  value       = google_cloud_run_v2_service.portfolio.uri
}

output "artifact_registry" {
  description = "Artifact Registry repository URL"
  value       = "${var.region}-docker.pkg.dev/${google_cloud_run_v2_service.portfolio.project}/${var.image_repository}"
}
