# Security hardening guide

This repository has been hardened, but it cannot completely secure a GitHub account, browser session, deployment platform, or user device by itself. Security remains a shared responsibility across application code, hosting, GitHub settings, credentials, and user behavior.

## Repository audit summary

### What was found

- No committed secrets were found in tracked source files during the repository review.
- `.env*` files are already ignored, but there was no checked-in example showing safe environment-variable usage.
- The app was missing baseline HTTP hardening headers and a Content Security Policy.
- The sample API route reflected request bodies and did not explicitly disable caching for user-supplied responses.
- The deployment workflow did not explicitly reduce default `GITHUB_TOKEN` permissions.
- Framework dependencies were behind current patched releases and required review/update.
- There is no real authentication or session-management implementation in this repository, so account takeover protections such as MFA, passkeys, session review, and token hygiene must be enforced in GitHub and the identity provider, not in this codebase.

### What changed in the repository

- Added baseline security headers and CSP in `next.config.ts`.
- Added safer API defaults in `src/app/api/hello/route.ts`.
- Added `.env.example` to document safe public env usage.
- Reduced GitHub Actions workflow permissions and added a job timeout in `.github/workflows/deploy.yml`.
- Updated documentation so account-level controls are explicit and actionable.

## Manual account and GitHub security steps

These protections cannot be fully enforced from repository code and should be completed manually.

### GitHub account

1. Enable passkeys if available for your GitHub account.
2. Enforce two-factor authentication and prefer a hardware security key or authenticator app over SMS.
3. Review active sessions and sign out of any device you do not recognize.
4. Review authorized OAuth apps and GitHub Apps; remove anything unused.
5. Rotate any personal access token that has broad scopes, long lifetime, or uncertain exposure history.
6. Prefer fine-grained personal access tokens with the minimum repository permissions and short expiration dates.
7. Store PATs only in a password manager or secrets manager, never in source code, screenshots, chat logs, or plaintext notes.

### SSH keys

1. Remove old or unused SSH keys from your GitHub account.
2. Prefer modern keys such as Ed25519.
3. Protect private keys with a strong passphrase.
4. Rotate keys that were copied between machines, shared, or stored insecurely.

### Repository and organization settings

1. Enable branch protection on `main`:
   - require pull requests
   - require status checks
   - require conversation resolution
   - block force pushes
   - block deletion
2. Restrict who can push directly to protected branches.
3. Require code owner review if multiple maintainers work on the repo.
4. Enable Dependabot alerts and security updates.
5. Enable secret scanning and push protection if available on your GitHub plan.
6. Enable code scanning for the default branch.
7. Require reviewers for workflow changes and other privileged files.
8. Use environments with required reviewers for production deployments.

### Deployment and secret hygiene

1. Keep Vercel and GitHub secrets only in platform secret stores.
2. Rotate `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` if exposure is suspected.
3. Give deployment tokens the minimum permissions needed.
4. Avoid reusing the same token across unrelated repositories.
5. Review deployment logs for accidental secret exposure before sharing them.

## Ongoing checklist

- Keep Next.js and other dependencies current and monitor `npm audit`.
- Never place credentials in `NEXT_PUBLIC_*` variables.
- Review pull requests for third-party action usage and prefer least privilege.
- Re-run secret scanning before commits.
- Periodically review account sessions, PATs, SSH keys, and repository collaborators.
