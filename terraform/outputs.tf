output "project_id" {
  description = "The resolved GCP project ID"
  value       = var.project_id
}

output "artifact_registry" {
  description = "Artifact Registry repository URL"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.image_repository}"
}
