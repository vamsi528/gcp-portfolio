---
title: "Building a zero-cost portfolio on GCP"
date: "2026-08-02"
tags: ["Cloud", "DevOps", "GCP"]
---

When I set out to build [vamsithokala.in](https://vamsithokala.in), I had one constraint: it should cost **\$0 to run** until real users show up. No \`t2.micro\` instances, no always-on VMs — just pure serverless, scaling to zero.

## The stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router, TypeScript) |
| Hosting | Cloud Run (serverless) |
| Image registry | Artifact Registry |
| CI/CD | Cloud Build + GitHub Actions |
| Infrastructure | Terraform |
| Domain | Cloud Domains |

## Why Cloud Run?

Cloud Run gives you **2 million requests/month for free**. Combined with scaling to zero, you pay nothing when idle. The cold start is under a second with a Next.js standalone build on Node.js Alpine.

## Lessons learned

1. **Certificate Manager API** — must be enabled before creating domain mappings, or SSL provisioning stalls indefinitely.
2. **Cloud Run v2 minimum memory** — 512Mi when CPU is always allocated. The docs say 256Mi works, but only for v1.
3. **Multi-stage Docker builds** — reduced the final image from 600MB to under 100MB.
4. **Terraform vs Cloud Build** — let Cloud Build own the service deployment (`gcloud run deploy`); Terraform should only create the underlying resources.

The entire setup took about 2 hours from `gcloud auth login` to a live HTTPS site. Not bad for \$0/month.
