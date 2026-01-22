# Allure Test Reporting

Allure is a lightweight test reporting framework integrated with your Playwright and Maestro tests.

## Quick Start

### 1. Run Tests
```bash
cd ../apps/web
npx playwright test
```

### 2. Generate Allure Report
```bash
allure generate ../apps/web/test-results/allure-results -o allure-report
```

### 3. View Report
```bash
allure open allure-report
```

This will open the Allure report in your browser at http://localhost:4040 (by default).

## What You Get

- **Test Results:** Visual pass/fail status
- **Test Timeline:** How long each test took
- **Trends:** Historical test data
- **Logs:** Detailed execution logs
- **Screenshots:** On failure
- **Video:** Test execution video

## Installation Status

✅ Allure CLI installed (v2.36.0)
✅ Playwright configured with Allure
✅ Sample test created in `../apps/web/tests/e2e.spec.ts`

## Commands Reference

```bash
# Run all Playwright tests
cd ../apps/web && npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run single test file
npx playwright test tests/e2e.spec.ts

# Generate report from results
cd ../tests/allure && allure generate ../apps/web/test-results/allure-results -o allure-report

# View the report
allure open allure-report

# Clean all results
rm -rf allure-report ../apps/web/test-results
```

## Integration with Your Projects

- **Web App (Playwright):** ✅ Configured and ready
- **Mobile App (Maestro):** Can add Allure support
- **Backend:** Can add test reporting

## Next Steps

1. Write your own tests in `../apps/web/tests/`
2. Run: `npm run test`
3. Generate report: `allure generate ...`
4. View: `allure open allure-report`
