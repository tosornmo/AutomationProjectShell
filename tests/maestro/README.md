# Maestro Mobile Test Scripts

Maestro is a cloud-native mobile testing framework. These scripts automate testing for your mobile app.

## Installation

Maestro is already installed via Homebrew. Verify:

```bash
maestro --version
```

## Running Tests

### Run a Single Test
```bash
maestro test 01_app_launch.yaml
```

### Run All Tests in Sequence
```bash
maestro test *.yaml
```

### Run Tests on Specific Device
```bash
maestro test 01_app_launch.yaml --device <device_id>
```

### List Connected Devices
```bash
maestro device list
```

## Test Scripts Overview

### 01_app_launch.yaml
- Launches the app
- Verifies welcome message displays
- Tests basic navigation to generate button

**Use case:** Smoke test - verify app starts without crashes

### 02_ui_elements.yaml
- Launches the app
- Verifies all main UI elements are visible
- Checks headers and descriptions

**Use case:** UI regression testing - ensure UI elements exist

### 03_scrolling.yaml
- Tests scroll functionality
- Scrolls down and up
- Verifies content remains stable

**Use case:** Scroll and content stability testing

### 04_generate_image.yaml
- Launches the app
- Taps the Generate button
- Waits for API response
- Takes screenshot of result

**Use case:** Feature testing - verify image generation works

### 05_login_flow.yaml
- Tests complete login workflow
- Enters username and password
- Verifies dashboard appears

**Use case:** Authentication testing (customize with your credentials)

### 06_settings_navigation.yaml
- Tests navigation to settings
- Toggles dark mode
- Tests back button

**Use case:** Navigation and settings testing

## YAML Structure

Each test file contains:

```yaml
appId: com.example.automationproject  # Your app's bundle ID
---
- launchApp                            # Action
- assertVisible:                       # Assertion
    text: Welcome                      # Parameters
- tapOn:                               # Action
    text: Generate                     # Parameters
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `launchApp` | Launch the app |
| `tapOn` | Tap on element by text, id, or coordinates |
| `inputText` | Type text into focused field |
| `scroll` | Scroll in specified direction |
| `assertVisible` | Verify element is visible |
| `waitForAnimationToEnd` | Wait for UI animations to complete |
| `takeScreenshot` | Capture screenshot with name |
| `swipe` | Swipe across screen |
| `eraseText` | Clear text from field |
| `pressKey` | Press device key (back, home, etc) |

## Customization

### Update App ID
Replace `com.example.automationproject` with your actual app bundle ID:

```yaml
appId: your.actual.app.id
```

### Update UI Selectors
- **By text:** `text: "Button Text"`
- **By ID:** `id: button_id`
- **By coordinates:** `point: { x: 100, y: 200 }`

### Add Delays
```yaml
- pause: 2000  # Pause 2 seconds
```

## Running with Reports

Generate test reports:

```bash
maestro test 01_app_launch.yaml --output report.json
```

View HTML report:
```bash
maestro report report.json
```

## Environment Setup

### For iOS (Simulator)
1. Open Xcode
2. Select a simulator: `Cmd + Shift + 2`
3. Run test normally

### For Android (Emulator)
1. Start Android emulator
2. Run test normally

### For Real Devices
1. Connect device via USB
2. Run: `maestro device list` to verify
3. Run test normally

## Debugging

### View Device Logs
```bash
maestro device logs
```

### Interactive Mode
```bash
maestro studio
```

Opens Maestro Studio for interactive testing and script generation.

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Maestro Tests
  run: maestro test tests/maestro/*.yaml
```

### GitLab CI Example
```yaml
test:maestro:
  script:
    - maestro test tests/maestro/*.yaml
```

## Tips

1. **Always wait for animations:** Use `waitForAnimationToEnd` after navigation
2. **Use unique selectors:** Prefer IDs over generic text
3. **Keep tests focused:** One user flow per script
4. **Take screenshots:** For debugging failed tests
5. **Use pause for APIs:** Wait for network responses with `pause`

## Troubleshooting

### App Won't Launch
- Verify app is installed
- Check appId is correct
- Try: `maestro device list`

### Elements Not Found
- Check element selectors are correct
- Add `takeScreenshot` to see actual UI
- Use `maestro studio` for interactive debugging

### Tests Timeout
- Increase pause times for slow APIs
- Check network connectivity
- Verify device isn't locked

## Resources

- [Maestro Documentation](https://maestro.mobile.dev/docs)
- [API Reference](https://maestro.mobile.dev/docs/api-reference)
- [Best Practices](https://maestro.mobile.dev/docs/best-practices)
