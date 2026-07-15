# Review & Adversarial Challenge Report — 2026-07-13

## Review Summary

**Verdict**: APPROVE

---

## Findings

*No critical or major findings. The custom E2E test runner matches the requirements, runs completely offline, and is robust.*

### Minor Finding 1: SVG Path Coordinate Sensitivity
- **What**: Tests `T1.21`, `T1.22`, and `T1.23` rely on hardcoded SVG path coordinates (`M12 3v1.5`, `M15 12a3`, `M9 5H7`) for validating core pillar icons.
- **Where**: `org-concept/tests/run-tests.js` lines 208-229.
- **Why**: If SVGs are formatted, minified, or optimized in the future (e.g., using SVGO), the visual layout won't change but the path strings will, leading to test failures.
- **Suggestion**: Consider checking for standard metadata, IDs, or target classes on the SVG elements rather than exact coordinate sequences.

---

## Verified Claims

- **62 Test Cases Registered** → Verified by inspecting `run-tests.js` list of test registrations → **PASS**
- **Offline Run Execution** → Verified by checking all imported modules are Node.js built-ins (`fs`, `path`, `child_process`, `assert`, `url`) with no external requests → **PASS**
- **Test Result Counts (54 Passing / 8 Failing)** → Verified by running `node tests/run-tests.js` within `org-concept` workspace → **PASS**
- **Failure-Discrepancy Correlation** → Verified that the 8 failures exactly map to the missing assets/themes identified in the synthesis of parallel work (wildcard routes, crumpled-paper overlay, stars count, active route styles, title in index.html, Facebook linkages) → **PASS**
- **TEST_READY.md Schema Compliance** → Verified that `TEST_READY.md` incorporates the exact coverage metrics summary table and checklist specified in `TEST_INFRA.md` → **PASS**

---

## Coverage Gaps

- *None* — risk level: **LOW** — recommendation: **Accept risk**.

---

## Unverified Items

- *None.*

---

## Challenge Summary

**Overall risk assessment**: LOW

---

## Challenges

### Low Challenge 1: Static Analysis Limitations
- **Assumption challenged**: Substring scans in `App.vue` or `Home.vue` represent true client-side execution.
- **Attack scenario**: A file could include the required text or references in a dead-code comment block or an unused variable, which would bypass the static string checks without rendering it to the client.
- **Blast radius**: Low. Since these E2E tests are designed for lightweight offline validation, static analysis is standard, but does not substitute for real browser-based E2E runners (like Playwright).
- **Mitigation**: Standardize on verifying code elements inside template tags rather than scanning the entire file, or keep the existing structure as it is lightweight.

### Low Challenge 2: Temporary In-place Renaming
- **Assumption challenged**: The test execution will never be interrupted while project-critical files (like `vite.config.js` or `package.json`) are temporarily renamed/written.
- **Attack scenario**: If the system crashes or the runner process is forcibly killed (e.g. SIGKILL) during the execution of `T2.1` or `T2.2`, the original config files will remain backed up, leaving the workspace in an un-runnable state.
- **Blast radius**: Medium. The workspace cannot be compiled or run until manual restoration is performed.
- **Mitigation**: Use `try/finally` blocks (already present) to handle standard execution paths. To mitigate force kills, avoid renaming source files in-place; instead, mock them inside a temporary workspace context or use environment variables.

---

## Stress Test Results

- **Vite config removal handling (`T2.1`)** → Runner renames `vite.config.js` to `.backup`, asserts absence, and restores in `finally` block → **PASS**
- **Malformed package.json handling (`T2.2`)** → Runner writes invalid JSON to `package.json`, asserts that parser throws syntax error, and restores file → **PASS**

---

## Unchallenged Areas

- **Parallel Visual Theme changes integration** — Reason: Out of scope. The runner's test specifications correctly expect these to fail until the visual track implements them.
