#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
# setup-billing.sh — Link a GCP project to a billing account
# ─────────────────────────────────────────────────────────────────
# Automates the manual "Go to console → billing" step.
# Uses Application Default Credentials (ADC) — no JSON key needed.
#
# Usage:
#   ./scripts/setup-billing.sh PROJECT_ID [BILLING_ACCOUNT_ID]
#
#   If BILLING_ACCOUNT_ID is omitted, the script lists available
#   accounts and prompts you to choose one.
#
# Prerequisites:
#   - gcloud CLI installed
#   - Authenticated: gcloud auth login
#   - ADC set:       gcloud auth application-default login
# ─────────────────────────────────────────────────────────────────
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info()  { echo -e "${GREEN}[INFO]${NC}  $*"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*"; }

# ── Parse arguments ─────────────────────────────────────────────
PROJECT_ID="${1:-}"
BILLING_ACCOUNT_ID="${2:-}"

if [[ -z "$PROJECT_ID" ]]; then
  echo "Usage: $0 PROJECT_ID [BILLING_ACCOUNT_ID]"
  echo ""
  echo "Link a GCP project to a billing account."
  echo ""
  echo "Examples:"
  echo "  $0 my-project-123              # prompts for billing account"
  echo "  $0 my-project-123 0X0X0X-0X0X0X-0X0X0X  # direct link"
  exit 1
fi

# ── Verify gcloud is authenticated ───────────────────────────────
if ! gcloud auth list --filter="status:ACTIVE" --format="value(account)" 2>/dev/null | grep -q '@'; then
  log_error "Not authenticated. Run: gcloud auth login"
  exit 1
fi

log_info "Authenticated as: $(gcloud auth list --filter='status:ACTIVE' --format='value(account)')"

# ── Check project exists ─────────────────────────────────────────
if ! gcloud projects describe "$PROJECT_ID" --format="value(name)" &>/dev/null; then
  log_error "Project '$PROJECT_ID' not found or you lack permissions."
  exit 1
fi

log_info "Project '$PROJECT_ID' exists."

# ── Check if billing is already enabled ──────────────────────────
CURRENT_BILLING=$(gcloud beta billing projects describe "$PROJECT_ID" \
  --format="value(billingAccountName)" 2>/dev/null || true)

if [[ -n "$CURRENT_BILLING" ]]; then
  log_info "Billing is already enabled on '$PROJECT_ID'."
  log_info "Billing account: $CURRENT_BILLING"
  exit 0
fi

# ── Resolve billing account ──────────────────────────────────────
if [[ -z "$BILLING_ACCOUNT_ID" ]]; then
  log_info "No billing account specified. Listing available accounts..."

  ACCOUNTS=$(gcloud beta billing accounts list \
    --format="value(name,displayName,open)" 2>/dev/null || true)

  if [[ -z "$ACCOUNTS" ]]; then
    log_error "No billing accounts found. You may need to create one first:"
    log_error "  https://console.cloud.google.com/billing"
    exit 1
  fi

  echo ""
  echo "Available billing accounts:"
  echo "──────────────────────────────────────────────────────"
  # Print with line numbers
  echo "$ACCOUNTS" | awk '{print NR ") " $0}'
  echo "──────────────────────────────────────────────────────"
  echo ""
  read -r -p "Enter the number of the billing account to use: " CHOICE

  BILLING_ACCOUNT_ID=$(echo "$ACCOUNTS" | sed -n "${CHOICE}p" | awk '{print $1}')

  if [[ -z "$BILLING_ACCOUNT_ID" ]]; then
    log_error "Invalid selection."
    exit 1
  fi
fi

# ── Link billing account ─────────────────────────────────────────
log_info "Linking project '$PROJECT_ID' to billing account '$BILLING_ACCOUNT_ID'..."

gcloud beta billing projects link "$PROJECT_ID" \
  --billing-account="$BILLING_ACCOUNT_ID"

log_info "Billing linked successfully!"
log_info "Verify: gcloud beta billing projects describe $PROJECT_ID"
