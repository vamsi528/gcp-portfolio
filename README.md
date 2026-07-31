# vamsithokala.in — Zero-Cost Portfolio on GCP

A dynamic Next.js portfolio site hosted on **Google Cloud Run**, designed to cost **$0 until real users arrive**. Includes infrastructure-as-code (Terraform), a CI/CD pipeline (Cloud Build), and a simple "Hello, World" dynamic page you can extend into a full portfolio.

---

## Architecture

```
GitHub push → Cloud Build → Docker image → Artifact Registry → Cloud Run
                                                                    ↓
                                                             vamsithokala.in
                                                           (Cloud Domains + SSL)
```

| Layer | Technology | Why |
|-------|-----------|-----|
| App | Next.js 14 (React + TypeScript) | Server-rendered, dynamic, modern |
| Compute | Cloud Run (serverless) | Scales to zero — free when idle |
| Image registry | Artifact Registry | Stores Docker images for Cloud Run |
| CI/CD | Cloud Build | Auto-deploys on every `git push` to main |
| Domain | Cloud Domains | Register `vamsithokala.in` |
| IaC | Terraform | Declarative GCP resource provisioning |

---

## Cost Breakdown

| Resource | Cost |
|----------|------|
| Cloud Run | **Free** — first 2M req/month, scales to zero |
| Artifact Registry | **Free** — first 0.5 GB storage/month |
| Cloud Build | **Free** — first 120 build-minutes/day |
| Cloud Domains (`.in`) | **~$10–15/year** (one-time registration) |
| **Total until users arrive** | **~$10–15/year for the domain only** |

---

## Quick Start (Step by Step)

### Prerequisites

- A Google Cloud account with billing enabled
- `gcloud` CLI installed: `brew install google-cloud-sdk` (macOS) or [gcloud install guide](https://cloud.google.com/sdk/docs/install)
- Terraform installed: `brew install terraform` (macOS) or [terraform install guide](https://developer.hashicorp.com/terraform/install)
- A GitHub account

---

### 1. Create a GCP Project

```bash
# Create the project
gcloud projects create YOUR_PROJECT_ID --name="Vamsi Portfolio"

# Set it as active
gcloud config set project YOUR_PROJECT_ID

# Enable billing (required)
# → Go to: https://console.cloud.google.com/billing
#   Link your project to a billing account
```

### 2. Register the Domain

```bash
# Go to Cloud Domains in the console:
# https://console.cloud.google.com/net-services/domains/registrations

# Search for "vamsithokala.in"
# Follow the prompts to purchase (~$10-15/year)
# Verify your email when prompted (ICANN requirement)
```

> 💡 The `.in` domain has no residency restrictions — anyone can register it.

### 3. Clone and Push to GitHub

```bash
git clone git@github.com:YOUR_USERNAME/gcp-portfolio.git
cd gcp-portfolio

# Or push this repo:
git remote add origin git@github.com:YOUR_USERNAME/gcp-portfolio.git
git branch -M main
git add .
git commit -m "Initial: Next.js portfolio + Cloud Run infra"
git push -u origin main
```

### 4. Provision Infrastructure with Terraform

```bash
cd terraform

# Create a tfvars file with your project ID
cat > terraform.tfvars <<EOF
project_id = "YOUR_PROJECT_ID"
region     = "us-central1"
EOF

# Initialize and apply
terraform init
terraform plan
terraform apply
```

Terraform will:
- Enable Cloud Run, Cloud Build, and Cloud Domains APIs
- Create the Cloud Run service (scales to zero)
- Set public IAM access

After apply, Terraform outputs your Cloud Run URL (e.g., `https://portfolio-xxxxx-uc.a.run.app`).

### 5. Set Up CI/CD with Cloud Build

**Option A — GitHub connection (automatic deploys):**

```bash
# Go to Cloud Build → Repositories:
# https://console.cloud.google.com/cloud-build/repositories

# 1. Connect your GitHub repo (2nd gen)
# 2. Create a trigger:
#    - Name: deploy-on-push
#    - Event: Push to a branch
#    - Branch: ^main$
#    - Configuration: Cloud Build configuration file (cloudbuild.yaml)
#    - Location: Repository root

# Grant Cloud Build permission to deploy to Cloud Run:
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$(gcloud projects describe YOUR_PROJECT_ID \
    --format='value(projectNumber)')@cloudbuild.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$(gcloud projects describe YOUR_PROJECT_ID \
    --format='value(projectNumber)')@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

**Option B — Manual deploy from your machine:**

```bash
gcloud builds submit --config cloudbuild.yaml .
```

### 6. Map Your Custom Domain

Once your domain registration is verified:

```bash
# 1. Map the domain to your Cloud Run service
gcloud beta run domain-mappings create \
  --service portfolio \
  --domain vamsithokala.in \
  --region us-central1

# 2. Get the DNS records Cloud Run needs
gcloud beta run domain-mappings describe \
  --domain vamsithokala.in \
  --region us-central1

# 3. Add the CNAME/A/AAAA records shown to your domain's DNS
#    → Cloud Domains → vamsithokala.in → DNS settings
```

After DNS propagation (up to 24h), your site will be live at `https://vamsithokala.in` with a managed SSL certificate.

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

The page shows:
- A "Hello, World" greeting
- Your name
- Request metadata (server timestamp, host, user-agent) — proving it's dynamic

---

## Extending the Portfolio

This is built to grow:

- **Add pages**: Create `src/app/projects/page.tsx`, `src/app/blog/page.tsx`, etc.
- **Add an API**: Create `src/app/api/.../route.ts` for dynamic endpoints
- **Add a database**: Connect Cloud SQL or Firestore for dynamic content
- **Add styling**: The app is ready for Tailwind CSS, CSS modules, or a component library
- **Add analytics**: Drop in Google Analytics or a privacy-friendly alternative

---

## File Index

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Dynamic home page (server-rendered) |
| `src/app/layout.tsx` | Root layout with metadata |
| `Dockerfile` | Multi-stage build for Cloud Run |
| `cloudbuild.yaml` | Cloud Build CI/CD pipeline |
| `terraform/main.tf` | GCP resources (Cloud Run, APIs, IAM) |
| `terraform/variables.tf` | Terraform input variables |
| `terraform/outputs.tf` | Terraform output values |
| `next.config.js` | Next.js config (standalone output) |
| `.gitignore` | Ignored files for git and Terraform |
| `.dockerignore` | Ignored files for Docker builds |

---

## Troubleshooting

**"Cloud Run service not found" during deploy:**
→ Run `terraform apply` first to create the service.

**"Permission denied" during Cloud Build deploy:**
→ Grant the Cloud Build service account `roles/run.admin` and `roles/iam.serviceAccountUser` (see Step 5).

**Domain mapping stuck in "Certificate provisioning":**
→ Verify your DNS records are correct. It can take up to 24 hours for the SSL certificate to provision.

**Container fails to start:**
→ Check Cloud Run logs: `gcloud run logs read --service portfolio --region us-central1`
→ Verify the container listens on port 8080 (the Dockerfile sets `PORT=8080`).
