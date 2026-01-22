#!/bin/bash
# Maestro Test Runner
# Runs all mobile tests and generates a report

set -e

echo "🎭 Maestro Mobile Test Suite"
echo "============================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if maestro is installed
if ! command -v maestro &> /dev/null; then
    echo -e "${RED}❌ Maestro is not installed${NC}"
    echo "Install with: brew install maestro"
    exit 1
fi

echo -e "${YELLOW}📱 Maestro Version:${NC}"
maestro --version
echo ""

# Get available tests
TESTS=(*.yaml)
TOTAL_TESTS=${#TESTS[@]}

echo -e "${YELLOW}📋 Found $TOTAL_TESTS test(s):${NC}"
for test in "${TESTS[@]}"; do
    echo "  - $test"
done
echo ""

# Run tests
PASSED=0
FAILED=0

for test in "${TESTS[@]}"; do
    echo -e "${YELLOW}▶️  Running: $test${NC}"
    if maestro test "$test"; then
        echo -e "${GREEN}✅ $test passed${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ $test failed${NC}"
        ((FAILED++))
    fi
    echo ""
done

# Summary
echo "============================"
echo -e "${YELLOW}📊 Test Summary:${NC}"
echo -e "  Total:  $TOTAL_TESTS"
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi
