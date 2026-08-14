# FORSA Financial Dashboard Setup

Next.js financial dashboard starter with analytics pages, UI components, and example API patterns.

## Security posture

- Runtime security headers and a baseline Content Security Policy are configured in `/home/runner/work/forsa-financial-dashboard-setup/forsa-financial-dashboard-setup/next.config.ts`.
- Example API responses in `/home/runner/work/forsa-financial-dashboard-setup/forsa-financial-dashboard-setup/src/app/api/hello/route.ts` now use stricter input handling and `Cache-Control: no-store`.
- Public environment variables are documented in `/home/runner/work/forsa-financial-dashboard-setup/forsa-financial-dashboard-setup/.env.example`.
- Manual GitHub account, token, SSH, branch protection, and repository security steps are documented in `/home/runner/work/forsa-financial-dashboard-setup/forsa-financial-dashboard-setup/SECURITY.md`.

## Environment variables

Copy `.env.example` when setting up local development. Do not place secrets in any `NEXT_PUBLIC_*` variable because those values are exposed to the browser.

## Residual risk

This repository can be hardened, but it cannot completely secure a GitHub account or deployed environment on its own. Review `SECURITY.md` for the remaining manual controls that must be enabled at the GitHub account, organization, repository, and hosting layers.
