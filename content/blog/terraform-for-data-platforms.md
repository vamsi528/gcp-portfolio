---
title: "Terraform for data platforms: why it matters"
date: "2026-06-10"
tags: ["Terraform", "IaC", "Data Engineering"]
---

Data infrastructure has historically been a manual affair — someone creates a BigQuery dataset through the console, someone else adds a service account by hand, and six months later nobody knows who has access to what.

## Infrastructure as code changes everything

When your entire data platform lives in Terraform:

- **Reproducibility** — spin up an identical dev environment in minutes
- **Auditability** — every resource change is a reviewed PR
- **Disaster recovery** — tear down and rebuild from code
- **Compliance** — IAM policies are code-reviewed, not console-clicked

A basic Terraform setup for a data platform should cover:

```hcl
resource "google_bigquery_dataset" "analytics" {
  dataset_id = "analytics_prod"
  location   = "US"
}

resource "google_storage_bucket" "datalake" {
  name     = "my-company-datalake"
  location = "US"
}
```

Start small, version everything, and never click "Create" in the console again.
