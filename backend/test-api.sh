#!/bin/bash
# ASM Backend API Test Suite
# This script tests all major features of the ASM application

set -e

API_URL="http://localhost:5000"
RESULTS_FILE="test-results.log"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize results
echo "=== ASM Backend API Test Results ===" > $RESULTS_FILE
echo "Test Date: $(date)" >> $RESULTS_FILE
echo "" >> $RESULTS_FILE

log_test() {
    echo -e "${YELLOW}[TEST]${NC} $1"
    echo "[TEST] $1" >> $RESULTS_FILE
}

log_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
    echo "[PASS] $1" >> $RESULTS_FILE
}

log_error() {
    echo -e "${RED}[FAIL]${NC} $1"
    echo "[FAIL] $1" >> $RESULTS_FILE
}

# Wait for server to be ready
wait_for_server() {
    log_test "Waiting for server to start..."
    for i in {1..30}; do
        if curl -s "$API_URL/health" > /dev/null 2>&1; then
            log_success "Server is ready"
            return 0
        fi
        sleep 1
    done
    log_error "Server failed to start"
    return 1
}

# Test 1: Health Check
test_health() {
    log_test "Testing health endpoint..."
    response=$(curl -s -w "\n%{http_code}" "$API_URL/health")
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "200" ]; then
        log_success "Health check passed"
        echo "  Response: $body" >> $RESULTS_FILE
        return 0
    else
        log_error "Health check failed (status: $status_code)"
        return 1
    fi
}

# Test 2: API Root
test_api_root() {
    log_test "Testing API root endpoint..."
    response=$(curl -s -w "\n%{http_code}" "$API_URL/api")
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "200" ]; then
        log_success "API root endpoint passed"
        echo "  Response: $body" >> $RESULTS_FILE
        return 0
    else
        log_error "API root failed (status: $status_code)"
        return 1
    fi
}

# Test 3: User Registration
test_registration() {
    log_test "Testing user registration..."
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/auth/register" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "test@example.com",
            "password": "TestPass123",
            "firstName": "Test",
            "lastName": "User"
        }')
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "201" ]; then
        log_success "User registration passed"
        echo "  Response: $body" >> $RESULTS_FILE
        # Extract and save token
        echo "$body" | grep -o '"token":"[^"]*"' | cut -d'"' -f4 > /tmp/auth_token.txt
        return 0
    else
        log_error "User registration failed (status: $status_code)"
        echo "  Response: $body" >> $RESULTS_FILE
        return 1
    fi
}

# Test 4: User Login
test_login() {
    log_test "Testing user login..."
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/auth/login" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "test@example.com",
            "password": "TestPass123"
        }')
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "200" ]; then
        log_success "User login passed"
        echo "  Response: $body" >> $RESULTS_FILE
        # Extract and save token
        echo "$body" | grep -o '"token":"[^"]*"' | cut -d'"' -f4 > /tmp/auth_token.txt
        return 0
    else
        log_error "User login failed (status: $status_code)"
        echo "  Response: $body" >> $RESULTS_FILE
        return 1
    fi
}

# Test 5: Get Profile (Authenticated)
test_profile() {
    log_test "Testing get profile (authenticated)..."
    TOKEN=$(cat /tmp/auth_token.txt 2>/dev/null || echo "")
    
    response=$(curl -s -w "\n%{http_code}" "$API_URL/api/auth/profile" \
        -H "Authorization: Bearer $TOKEN")
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "200" ]; then
        log_success "Get profile passed"
        echo "  Response: $body" >> $RESULTS_FILE
        return 0
    else
        log_error "Get profile failed (status: $status_code)"
        echo "  Response: $body" >> $RESULTS_FILE
        return 1
    fi
}

# Test 6: Input Validation (Invalid Email)
test_validation() {
    log_test "Testing input validation (should fail)..."
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/auth/register" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "invalid-email",
            "password": "short",
            "firstName": "Test",
            "lastName": "User"
        }')
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "400" ]; then
        log_success "Validation correctly rejected invalid input"
        echo "  Response: $body" >> $RESULTS_FILE
        return 0
    else
        log_error "Validation failed to reject invalid input (status: $status_code)"
        echo "  Response: $body" >> $RESULTS_FILE
        return 1
    fi
}

# Test 7: Unauthorized Access
test_unauthorized() {
    log_test "Testing unauthorized access (should fail)..."
    response=$(curl -s -w "\n%{http_code}" "$API_URL/api/auth/profile")
    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "401" ]; then
        log_success "Unauthorized access correctly rejected"
        echo "  Response: $body" >> $RESULTS_FILE
        return 0
    else
        log_error "Failed to reject unauthorized access (status: $status_code)"
        echo "  Response: $body" >> $RESULTS_FILE
        return 1
    fi
}

# Run all tests
main() {
    echo ""
    echo "================================"
    echo "  ASM Backend API Test Suite"
    echo "================================"
    echo ""
    
    wait_for_server || exit 1
    
    echo ""
    echo "Running tests..."
    echo ""
    
    PASSED=0
    FAILED=0
    
    test_health && ((PASSED++)) || ((FAILED++))
    test_api_root && ((PASSED++)) || ((FAILED++))
    test_registration && ((PASSED++)) || ((FAILED++))
    test_login && ((PASSED++)) || ((FAILED++))
    test_profile && ((PASSED++)) || ((FAILED++))
    test_validation && ((PASSED++)) || ((FAILED++))
    test_unauthorized && ((PASSED++)) || ((FAILED++))
    
    echo ""
    echo "================================"
    echo "  Test Summary"
    echo "================================"
    echo -e "${GREEN}Passed: $PASSED${NC}"
    echo -e "${RED}Failed: $FAILED${NC}"
    echo ""
    echo "Results saved to: $RESULTS_FILE"
    echo ""
    
    echo "" >> $RESULTS_FILE
    echo "=== Test Summary ===" >> $RESULTS_FILE
    echo "Passed: $PASSED" >> $RESULTS_FILE
    echo "Failed: $FAILED" >> $RESULTS_FILE
    
    if [ $FAILED -eq 0 ]; then
        echo -e "${GREEN}All tests passed!${NC}"
        return 0
    else
        echo -e "${RED}Some tests failed${NC}"
        return 1
    fi
}

main
