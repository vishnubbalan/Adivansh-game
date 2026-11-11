# Release and Operations Runbook

## Environments
- Local: developer machine and local Vite server.
- Pull request: CI validation and review; never assume preview is production.
- Production: GitHub Pages URL configured in repository settings.

Record environment URLs, deployment source, branch, workflow and owner. Do not commit secrets or environment-specific credentials.

## Pull request gate
1. Confirm scope is one bounded task and docs match approved direction.
2. Run `npm test`, `npm run build` and `npm run test:e2e` as applicable.
3. Inspect screenshots/traces and attach evidence for visual/input changes.
4. Confirm no unrelated files or generated artifacts.
5. Review dependencies and asset rights.
6. Obtain human approval for product, art, spend, privacy or major architecture decisions.
7. Merge only after required checks and repository policy are satisfied.

## Deployment verification
After merge, verify workflow success, deployed URL, expected commit/version, initial load, start interaction and one critical gameplay path. A deployed smoke test is not a complete playtest. Record any real-device Safari verification separately.

## Rollback
Identify the last known-good commit and deployment artifact. Revert the offending change through a reviewed PR, rerun CI and redeploy. For a critical outage, follow repository owner emergency policy and document the action afterwards. Never delete user saves or data as a rollback shortcut.

## Incident severity
- P0: security/privacy breach, data loss, widespread crash or unusable game.
- P1: critical progression blocked or major browser/device failure.
- P2: substantial defect with workaround.
- P3: minor polish or isolated issue.

Record time, affected build, symptoms, reproduction, impact, mitigation, root cause, corrective action and verification.

## Workflow operations
Scheduled agent runs can be delayed, skipped or fail due to quotas, secrets, permissions or upstream service changes. Check the Actions run and logs; do not infer success from a cron schedule. Review PRs before enabling auto-merge. Keep required checks and least-privilege token permissions.

## Release record
Version/tag; commit SHA; date; changed player-facing features; known issues; tests and devices; asset-rights status; privacy/security review; deployment URL; rollback target; approver.
