# Branch Protection Hardening Guidance

Apply to `main` and any production/release branches.

## Required Controls

- Require pull request before merge (no direct pushes).
- Require at least 1 approving review.
- Dismiss stale approvals when new commits are pushed.
- Require status checks to pass before merge.
- Require conversation resolution before merge.
- Restrict who can push (owner/admin only during incident response).
- Disable force pushes.
- Disable branch deletion.

## Optional Emergency Mode

Use during active incident containment:

- Temporarily lock branch to owner-only merges.
- Disable merge methods except one controlled path (for example squash).
- Temporarily disable GitHub Actions or allow only vetted actions.

## Verification

- Confirm branch shows `protected: true` after applying rules.
- Attempt test push from non-privileged account to ensure denial.
- Re-check access list after each permission change.
