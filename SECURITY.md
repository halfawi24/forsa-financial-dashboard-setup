# Security Incident Response Runbook

This runbook is for emergency repository/account compromise response for `<owner-username>`.

## 1) Immediate containment (first 15 minutes)

- [ ] Change GitHub password immediately.
- [ ] Enable/verify 2FA and passkeys.
- [ ] Revoke all active sessions: **Settings → Password and authentication → Sessions**.
- [ ] Revoke all PATs, fine-grained PATs, OAuth app grants, SSH keys, and GPG keys.
- [ ] Freeze risky repos by making them **Private** and **Archived** before any deletion.
- [ ] Disable GitHub Actions temporarily on high-risk repos.
- [ ] Rotate all secrets outside GitHub (cloud/API/DB/payment keys) before re-enabling automation.

## 2) Confirmation gates before irreversible deletion

Never delete first. Delete only after all gates are true:

- [ ] Owner confirms repo is not needed for legal, audit, billing, or recovery.
- [ ] A final forensic backup exists (mirror clone + metadata export + workflow logs).
- [ ] Access has already been revoked and secrets rotated.
- [ ] Repo has been quarantined (private + archived) for at least one review cycle.
- [ ] A second explicit owner confirmation is captured in writing.

## 3) Evidence preservation checklist

Preserve before cleanup:

- [ ] Repository mirror backup (`git clone --mirror`) and hash of backup artifact.
- [ ] Branch list, tags, protected branch settings, rulesets.
- [ ] Collaborators, teams, deploy keys, installed GitHub Apps.
- [ ] Actions workflow run history and failed/suspicious job logs.
- [ ] Security alerts (code scanning, secret scanning, Dependabot) snapshots.
- [ ] Timeline of suspicious events with UTC timestamps and actor IDs.

## 4) Repository triage model (quarantine vs delete)

- **Critical risk (Delete candidate after quarantine):**
  - Unknown admin/collaborator access, suspicious automation writes, or exfiltration indicators.
- **High risk (Quarantine first):**
  - Unverified bot writes, unprotected default branch, unknown deploy keys/apps/secrets exposure.
- **Medium risk (Harden and monitor):**
  - No confirmed abuse, but weak controls or stale access.
- **Low risk (Retain):**
  - Owner-only access verified, clean audit trail, protections enabled.

Default action order: **Private → Archive → Investigate → Decide Delete/Retain**.

## 5) Recovery and hardening checklist

- [ ] Enforce least privilege for all repos (remove all non-essential collaborators/teams).
- [ ] Re-add only explicitly approved users with minimum required role.
- [ ] Remove unknown deploy keys and unused GitHub App installations.
- [ ] Recreate secrets with rotated values and least-scope tokens.
- [ ] Enable branch protections/rulesets on default branches.
- [ ] Require PR reviews and status checks before merge.
- [ ] Enable secret scanning and code scanning where available.
- [ ] Keep Actions permissions minimal (`read` by default, explicit `write` only when needed).

## 6) What can be automated here vs what is manual

### Automatable in-repo/workflow
- Documented triage checklist and response steps (this file).
- Local detection scripts and workflow policy-as-code checks.
- Branch protection/security baseline verification reports.

### Manual in GitHub settings (owner action required)
- Repository deletion, visibility changes, and archival toggle.
- Collaborator/team removal across all repositories.
- Deploy key removal and GitHub App uninstall.
- PAT/OAuth/session/key revocation and organization-level access policy changes.

## 7) Incident log template (fill during response)

- **Incident ID:** `IR-YYYYMMDD-01`
- **Detected at (UTC):**
- **Reporter:**
- **Scope (repos/accounts):**
- **Initial containment completed at (UTC):**
- **Deletion approved? (Y/N):**
- **Recovery completed at (UTC):**
- **Post-incident review date:**
