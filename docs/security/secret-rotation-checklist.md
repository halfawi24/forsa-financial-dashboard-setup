# Secret Rotation Checklist (Post-Containment)

Run after immediate lockout actions are complete.

## Inventory

- [ ] List all credential types: PATs, SSH keys, API keys, DB credentials, cloud IAM keys, webhook secrets, CI tokens.
- [ ] Map each secret to owner, system, and last rotation time.

## Revoke

- [ ] Revoke compromised or unknown credentials first.
- [ ] Disable old credentials before creating replacements when possible.

## Re-Issue

- [ ] Generate replacement credentials with least privilege scopes.
- [ ] Set expirations and rotation reminders.
- [ ] Store new credentials only in approved secret managers.

## Update Integrations

- [ ] Update GitHub Actions secrets (repo + environment).
- [ ] Update deployment platform secrets (Vercel/cloud/etc).
- [ ] Update application runtime configs and external services.

## Validate

- [ ] Confirm all critical workflows deploy successfully.
- [ ] Confirm revoked credentials no longer authenticate.
- [ ] Run secret scanning on current codebase/history where available.

## Closeout

- [ ] Record each rotated secret ID/name and timestamp.
- [ ] Document incident root cause and preventive controls.
- [ ] Schedule a follow-up access review within 7 days.
