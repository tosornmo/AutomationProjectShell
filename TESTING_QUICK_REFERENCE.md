# Quick Reference: Running Tests

## 🌐 Web Tests (Playwright)

```bash
cd apps/web

# Run all tests
npm test                    # Unit tests (Vitest)
npx playwright test         # E2E tests

# Run specific test
npx playwright test example.spec.ts

# Options
npx playwright test --headed                    # See browser
npx playwright test --workers=1                 # Sequential
npx playwright test --debug                     # Debug mode
npx playwright test -g "should load"            # Filter tests

# Reports
npx playwright show-report                      # HTML report
npx playwright show-trace <trace-file>          # Trace viewer
```

## 📱 Mobile Tests (Maestro)

```bash
cd tests/maestro

# Run all tests
./run_all_tests.sh                              # All tests with summary

# Run single test
maestro test 01_app_launch.yaml

# Interactive testing
maestro studio                                  # Maestro Studio GUI

# Device management
maestro device list                             # Show devices
maestro device logs                             # View device logs

# Debugging
maestro test 01_app_launch.yaml --verbose       # Verbose output
maestro test 01_app_launch.yaml -o report.json  # JSON report
```

## 🧪 Unit Tests (Vitest)

```bash
cd apps/web

# Run all unit tests
npm test

# Watch mode
npm test -- --watch

# Run specific test
npm test -- generate-image.test.ts

# Coverage
npm test -- --coverage
```

## 📊 Combined Testing

```bash
# From project root

# 1. Unit Tests
cd apps/web && npm test

# 2. Web E2E Tests
cd apps/web && npx playwright test

# 3. Mobile Tests
cd tests/maestro && ./run_all_tests.sh

# All together (manual)
npm test && npx playwright test && cd ../../tests/maestro && ./run_all_tests.sh
```

## 📈 Test Results

### Web (Playwright)
- Location: `apps/web/test-results/`
- Report: `npx playwright show-report`
- Files: Screenshots, videos, traces

### Mobile (Maestro)
- Output: Console
- Optional: JSON report with `-o report.json`
- Screenshots: Captured on failures

### Unit Tests (Vitest)
- Output: Console in watch mode
- Coverage: Can be generated with `--coverage`

## 🔍 Debugging

### Playwright
```bash
# Debug mode - opens inspector
npx playwright test --debug

# View traces
npx playwright show-trace <path-to-trace>

# Slow motion (helps see what's happening)
npx playwright test --headed --workers=1
```

### Maestro
```bash
# Verbose output
maestro test <script> --verbose

# Interactive mode
maestro studio

# View logs
maestro device logs
```

### Vitest
```bash
# Watch mode (re-runs on changes)
npm test -- --watch

# Debug specific test
npm test -- --reporter=verbose <test-file>
```

## ✅ Status Checks

```bash
# Check all frameworks installed
maestro --version                               # Mobile
npx playwright --version                        # Web
npm test -- --version 2>/dev/null || echo "vitest installed"

# Verify configurations
ls apps/web/playwright.config.ts
ls apps/web/vitest.config.ts
ls tests/maestro/*.yaml
```

## 🚀 Typical Workflow

```bash
# 1. Make code changes
# (edit files in src/, api/, etc.)

# 2. Run unit tests
cd apps/web && npm test

# 3. Run E2E tests
npx playwright test

# 4. Run mobile tests
cd ../../tests/maestro && ./run_all_tests.sh

# 5. View reports
# (from apps/web)
npx playwright show-report

# (from tests/maestro)
maestro studio
```

## 📍 File Locations

```
AutomationProjectShell/
├── apps/web/
│   ├── e2e/
│   │   └── example.spec.ts          # Playwright E2E tests
│   ├── tests/
│   │   └── generate-image.test.ts   # Vitest unit tests
│   ├── playwright.config.ts
│   ├── vitest.config.ts
│   └── test-results/
├── tests/
│   ├── maestro/
│   │   ├── 01_app_launch.yaml
│   │   ├── 02_ui_elements.yaml
│   │   ├── 03_scrolling.yaml
│   │   ├── 04_generate_image.yaml
│   │   ├── 05_login_flow.yaml
│   │   ├── 06_settings_navigation.yaml
│   │   ├── run_all_tests.sh
│   │   └── README.md
│   └── allure/
│       └── README.md
└── TEST_SUITES_SUMMARY.md
```

## 🎯 Common Commands Cheat Sheet

| Task | Command |
|------|---------|
| Run all unit tests | `cd apps/web && npm test` |
| Run all E2E tests | `cd apps/web && npx playwright test` |
| Run all mobile tests | `cd tests/maestro && ./run_all_tests.sh` |
| Debug E2E tests | `cd apps/web && npx playwright test --debug` |
| Debug mobile tests | `cd tests/maestro && maestro studio` |
| View web report | `cd apps/web && npx playwright show-report` |
| View mobile report | `cd tests/maestro && maestro studio` |
| Watch unit tests | `cd apps/web && npm test -- --watch` |

## ⚡ Pro Tips

1. **Run one test first:** Start with `maestro test 01_app_launch.yaml` before all tests
2. **Use headed mode:** `npx playwright test --headed` to see what's happening
3. **Filter tests:** Use `-g "keyword"` to run specific tests
4. **Slow down:** Add `--headed` and `--workers=1` to see interactions clearly
5. **Check logs:** Always check device logs if mobile tests fail
6. **Screenshots:** Both frameworks take screenshots on failure automatically
