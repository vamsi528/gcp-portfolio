# ─────────────────────────────────────────────────────────────────
# Required variables
# ─────────────────────────────────────────────────────────────────
variable "project_id" {
  description = "Your GCP project ID"
  type        = string
}

# ─────────────────────────────────────────────────────────────────
# Optional: project creation + billing (automate the manual step)
# ─────────────────────────────────────────────────────────────────
variable "create_project" {
  description = "When true, Terraform creates the project (instead of using an existing one)"
  type        = bool
  default     = false
}

variable "billing_account" {
  description = "Billing account ID to link (required if create_project is true). Find with: gcloud beta billing accounts list"
  type        = string
  default     = ""
  sensitive   = true
}

variable "project_name" {
  description = "Display name for the project (only used when create_project = true)"
  type        = string
  default     = "Vamsi Portfolio"
}

# ─────────────────────────────────────────────────────────────────
# Region
# ─────────────────────────────────────────────────────────────────
variable "region" {
  description = "GCP region for Cloud Run and other resources"
  type        = string
  default     = "us-central1"
}

# ─────────────────────────────────────────────────────────────────
# Cloud Run service
# ─────────────────────────────────────────────────────────────────
variable "service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  default     = "portfolio"
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 8080
}

variable "cpu" {
  description = "CPU limit per instance (e.g. '1000m' = 1 vCPU)"
  type        = string
  default     = "1000m"
}

variable "memory" {
  description = "Memory limit per instance"
  type        = string
  default     = "256Mi"
}

variable "min_instances" {
  description = "Minimum number of instances (0 = scale to zero, free when idle)"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of instances"
  type        = number
  default     = 3
}

variable "image_repository" {
  description = "Artifact Registry repository name for container images"
  type        = string
  default     = "cloud-run-source-deploy"
}
