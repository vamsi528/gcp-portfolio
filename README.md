# vamsithokala.in — Zero-Cost Portfolio on GCP

A dynamic Next.js portfolio site hosted on **Google Cloud Run**, designed to cost **$0 until real users arrive**. Includes infrastructure-as-code (Terraform), a CI/CD pipeline (Cloud Build for deploys, GitHub Actions for PR checks), and a simple "Hello, World" dynamic page you can extend into a full portfolio.

---

## Architecture

```
Pull Request ──→ GitHub Actions (build check)
                      │
GitHub push (main) ──→ Cloud Build → Docker image → Artifact Registry → Cloud Run
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
| PR Checks | GitHub Actions | Build + type-check on every pull request |
| Domain | Cloud Domains | Register `vamsithokala.in` |
| IaC | Terraform | Declarative GCP resource provisioning |

---

## Security Principles

- **No service account JSON keys** — uses Application Default Credentials (ADC) everywhere. Run `gcloud auth application-default login` once.
- **No hardcoded values** — everything is parameterized via Terraform variables, Cloud Build substitutions, and environment variables.
- **No manual billing steps** — automate linking with `scripts/setup-billing.sh` or via Terraform directly.

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

- A Google Cloud account
- `gcloud` CLI installed: `brew install google-cloud-sdk` (macOS) or [gcloud install guide](https://cloud.google.com/sdk/docs/install)
- Terraform installed: `brew install terraform` (macOS) or [terraform install guide](https://developer.hashicorp.com/terraform/install)
- A GitHub account

### 1. Authenticate (ADC — no JSON keys)

```bash
# One-time setup. Uses your Google account, no key file needed.
gcloud auth login
gcloud auth application-default login
```

### 2. Create a GCP Project & Link Billing

**Option A — Script (recommended):**

```bash
# Create the project
gcloud projects create YOUR_PROJECT_ID --name="Vamsi Portfolio"

# Set it as active
gcloud config set project YOUR_PROJECT_ID

# Link billing — automated, no console needed
./scripts/setup-billing.sh YOUR_PROJECT_ID
```

**Option B — Terraform (fully automated):**

Set `create_project = true` and `billing_account = "XXXXXX-XXXXXX-XXXXXX"` in your `terraform.tfvars` (see step 4). Terraform will create the project and link billing in one `apply`.

### 3. Register the Domain

```bash
# Go to Cloud Domains in the console:
# https://console.cloud.google.com/net-services/domains/registrations

# Search for "vamsithokala.in"
# Follow the prompts to purchase (~$10-15/year)
# Verify your email when prompted (ICANN requirement)
```

> 💡 The `.in` domain has no residency restrictions — anyone can register it.

### 4. Clone and Push to GitHub

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

### 5. Provision Infrastructure with Terraform

```bash
cd terraform

# Copy the example vars and fill in your project ID
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars → set project_id = "YOUR_PROJECT_ID"

# Initialize and apply
terraform init
terraform plan
terraform apply
```

Terraform will:
- Enable Cloud Run, Cloud Build, and Cloud Domains APIs
- Create the Artifact Registry repository
- Create the Cloud Run service (scales to zero)
- Set public IAM access
- Optionally create the project and link billing (if configured)

All resource settings are parameterized — see `variables.tf` for the full list:

| Variable | Default | Description |
|----------|---------|-------------|
| `project_id` | *(required)* | GCP project ID |
| `region` | `us-central1` | GCP region |
| `service_name` | `portfolio` | Cloud Run service name |
| `cpu` | `1000m` | CPU per instance |
| `memory` | `256Mi` | Memory per instance |
| `min_instances` | `0` | Min instances (0 = free when idle) |
| `max_instances` | `3` | Max instances |
| `container_port` | `8080` | Container listen port |
| `billing_account` | `""` | Billing account ID (for project creation) |
| `create_project` | `false` | Let Terraform create the project |

After apply, Terraform outputs your Cloud Run URL (e.g., `https://portfolio-xxxxx-uc.a.run.app`).

### 6. Set Up CI/CD

**GitHub Actions PR checks (automatic — no setup required):**

The `.github/workflows/pr-check.yml` workflow runs on every pull request to `main`. It checks:
- Dependencies install cleanly (`npm ci`)
- The app builds without errors (`npm run build`, which includes TypeScript type-checking)

No configuration needed — GitHub detects the workflow file automatically. A green check means the PR is safe to merge.

**Cloud Build — automatic deploys on push to main:**

**Option A — GitHub connection (automatic deploys):**

1. Go to [Cloud Build → Repositories](https://console.cloud.google.com/cloud-build/repositories)
2. Connect your GitHub repo (2nd gen)
3. Create a trigger:
   - Name: `deploy-on-push`
   - Event: Push to a branch
   - Branch: `^main$`
   - Configuration: Cloud Build configuration file (`cloudbuild.yaml`)
   - Location: Repository root
4. Override substitution variables if needed (all default to zero-cost-friendly values):

| Substitution | Default | Description |
|-------------|---------|-------------|
| `_REGION` | `us-central1` | Deployment region |
| `_SERVICE_NAME` | `portfolio` | Cloud Run service name |
| `_MEMORY` | `256Mi` | Memory per instance |
| `_CPU` | `1` | CPU per instance |
| `_MIN_INSTANCES` | `0` | Min instances |
| `_MAX_INSTANCES` | `3` | Max instances |
| `_SITE_URL` | `https://vamsithokala.in` | Public site URL |
| `_SITE_NAME` | `Vamsi Thokala` | Display name |
| `_SITE_DOMAIN` | `vamsithokala.in` | Public site domain |

Grant Cloud Build permission to deploy to Cloud Run:

```bash
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

### 7. Map Your Custom Domain

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
# Set up environment
cp .env.example .env.local
# Edit .env.local with your values (site name, domain, etc.)

npm install
npm run dev
# → http://localhost:3000
```

The page shows:
- A "Hello, World" greeting (name from `NEXT_PUBLIC_SITE_NAME`)
- Request metadata (server timestamp, host, user-agent) — proving it's dynamic
- Footer with your domain from `NEXT_PUBLIC_SITE_DOMAIN`

### Environment Variables

| Variable | Default | Used in |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_NAME` | `Vamsi Thokala` | Page title, greeting |
| `NEXT_PUBLIC_SITE_DOMAIN` | `vamsithokala.in` | Footer |
| `NEXT_PUBLIC_SITE_URL` | `https://vamsithokala.in` | Cloud Build deploy |
| `NODE_ENV` | `development` | Runtime mode |
| `PORT` | `3000` | Local dev server |

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

```
.
├── .env.example                     # Template for local env vars
├── .github/
│   └── workflows/
│       └── pr-check.yml             # GitHub Actions PR quality gate
├── .gitignore                       # Ignores .env, terraform state, build artifacts
├── Dockerfile                       # Multi-stage Next.js build
├── README.md                        # This file
├── cloudbuild.yaml                  # CI/CD pipeline (substitution variables)
├── next.config.js                   # Next.js config (standalone output)
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── scripts/
│   └── setup-billing.sh             # Automated billing account linking
├── terraform/
│   ├── main.tf                      # GCP resources (Cloud Run, Artifact Registry, IAM)
│   ├── outputs.tf                   # Terraform outputs
│   ├── variables.tf                 # All parameterized variables
│   └── terraform.tfvars.example     # Template for your tfvars
└── src/
    └── app/
        ├── layout.tsx               # Root layout + metadata
        └── page.tsx                 # Home page (dynamic server component)
```
