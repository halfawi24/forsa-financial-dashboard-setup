# Emergency Access Lockdown Runbook

Use this when account compromise is suspected.

## 0) Preserve Evidence First (5-10 min)

- Capture screenshots/exports of:
  - GitHub security log
  - Repository audit/activity (issues, PRs, actions runs, branch events)
  - Recent token/app/key changes
- Save copies in an offline incident folder with UTC timestamps.

## 1) Immediate Containment (Critical)

1. **Account settings**
   - Change GitHub password.
   - Force sign-out all sessions/devices.
   - Enable/require strongest MFA available (passkeys + TOTP/security key).
2. **Credentials**
   - Revoke all classic PATs and fine-grained PATs.
   - Remove all SSH keys and GPG/S/MIME keys until reissued.
   - Revoke OAuth app authorizations and GitHub App grants not explicitly trusted.
3. **Repository access**
   - Remove all outside collaborators from each repository.
   - Remove/disable team access (if organization-managed).
   - Restrict repository visibility (private) during incident handling.

## 2) Repository Hardening

1. Enable branch protection on default and release branches:
   - Require pull requests
   - Require status checks
   - Require conversation resolution
   - Restrict push/force push/deletion
2. Disable risky repository features temporarily:
   - Disable Actions (or allow only trusted actions)
   - Disable auto-merge and merge queue if abuse suspected
3. Lock down environments/secrets:
   - Require approvals for deployments
   - Rotate all repository/environment secrets immediately

## 3) Cross-Repository Sweep

For every repository in account/org:

- Remove collaborators not explicitly approved.
- Remove deploy keys not in active inventory.
- Review webhooks and integrations.
- Archive or delete repositories **only after evidence is captured** and owner confirms deletion.

## 4) Recovery and Validation

- Rotate cloud/database/API credentials (see checklist).
- Re-enable only required integrations one by one.
- Re-run dependency and secret scans.
- Monitor logs daily for at least 14 days.

## 5) Destructive Actions (Owner-Only Manual)

- Repository deletion/transfer and account-wide policy enforcement must be executed manually by the owner/admin in GitHub Settings.
