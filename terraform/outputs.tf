output "cloud_run_url" {
  description = "The auto-generated .run.app URL for your service"
  value       = google_cloud_run_v2_service.portfolio.uri
}

output "service_account" {
  description = "Service account email used by Cloud Run"
  value       = google_cloud_run_v2_service.portfolio.service_account
}
