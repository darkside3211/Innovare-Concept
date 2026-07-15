## 2026-07-13T10:51:13+08:00
Implement the custom E2E test runner in the project `org-concept` at `d:\Innovare Web\org-concept\tests\run-tests.js`.
Use the detailed designs and test cases described in:
- d:\Innovare Web\.agents\sub_orch_testing_track\TEST_INFRA.md
- d:\Innovare Web\.agents\sub_orch_testing_track\synthesis.md

Requirements:
1. Create the `tests` directory under `d:\Innovare Web\org-concept` and implement `tests/run-tests.js` containing the 62 test cases.
2. The script must run offline using ONLY Node.js built-in modules.
3. Add `"test": "node tests/run-tests.js"` to `package.json`.
4. Ensure clear pass/fail results (exit 0 on success, 1 on failure) and ANSI colored logs.
5. 11 codebase discrepancies are expected to fail initially. Run them genuinely. Do not mock/hardcode.
