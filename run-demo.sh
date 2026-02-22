#!/bin/bash

# ASM Application - Live Demonstration Script
# This script shows the application running with all features

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'
BOLD='\033[1m'

clear
echo ""
echo -e "${BOLD}${CYAN}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║                                                                           ║${NC}"
echo -e "${BOLD}${CYAN}║              ${GREEN}ASM Backend Application${CYAN} - Live Demonstration                 ║${NC}"
echo -e "${BOLD}${CYAN}║                        ${YELLOW}Running on Screen${CYAN}                                   ║${NC}"
echo -e "${BOLD}${CYAN}║                                                                           ║${NC}"
echo -e "${BOLD}${CYAN}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BOLD}${BLUE}1. APPLICATION STATUS${NC}"
echo -e "${YELLOW}─────────────────────────────────────────────────────────────────────────────${NC}"
APP_PID=$(pgrep -f "node dist/index.js" | head -1)
if [ ! -z "$APP_PID" ]; then
    echo -e "   ${GREEN}●${NC} Status: ${GREEN}${BOLD}RUNNING${NC}"
    echo -e "   ${GREEN}●${NC} Process ID: ${CYAN}$APP_PID${NC}"
    echo -e "   ${GREEN}●${NC} Port: ${CYAN}5000${NC}"
    echo -e "   ${GREEN}●${NC} URL: ${CYAN}http://localhost:5000${NC}"
    echo -e "   ${GREEN}●${NC} Environment: ${CYAN}development${NC}"
else
    echo -e "   ${RED}●${NC} Status: ${RED}NOT RUNNING${NC}"
    echo -e "   ${YELLOW}   Run: ${CYAN}cd backend && npm run dev${NC}"
fi
echo ""

echo -e "${BOLD}${BLUE}2. TESTING LIVE ENDPOINTS${NC}"
echo -e "${YELLOW}─────────────────────────────────────────────────────────────────────────────${NC}"
if [ ! -z "$APP_PID" ]; then
    echo -e "${PURPLE}   GET /health${NC}"
    HEALTH=$(curl -s http://localhost:5000/health)
    echo -e "   Response: ${CYAN}$HEALTH${NC}"
    echo ""
    echo -e "${PURPLE}   GET /api${NC}"
    API=$(curl -s http://localhost:5000/api)
    echo "$API" | jq '.' 2>/dev/null || echo -e "   Response: ${CYAN}$API${NC}"
else
    echo -e "   ${YELLOW}Start the application first${NC}"
fi
echo ""

echo -e "${BOLD}${BLUE}3. API ENDPOINTS (20 Total)${NC}"
echo -e "${YELLOW}─────────────────────────────────────────────────────────────────────────────${NC}"
echo -e "${GREEN}   Authentication (3 endpoints)${NC}"
echo -e "      ${CYAN}POST${NC}   /api/auth/register      - Register new user"
echo -e "      ${CYAN}POST${NC}   /api/auth/login         - Login user"
echo -e "      ${CYAN}GET${NC}    /api/auth/profile       - Get user profile"
echo ""
echo -e "${GREEN}   Sites Management (6 endpoints)${NC}"
echo -e "      ${CYAN}POST${NC}   /api/sites              - Create site (ADMIN/MANAGER)"
echo -e "      ${CYAN}GET${NC}    /api/sites              - List sites (paginated)"
echo -e "      ${CYAN}GET${NC}    /api/sites/:id          - Get site details"
echo -e "      ${CYAN}PUT${NC}    /api/sites/:id          - Update site (ADMIN/MANAGER)"
echo -e "      ${CYAN}DELETE${NC} /api/sites/:id          - Delete site (ADMIN)"
echo -e "      ${CYAN}GET${NC}    /api/sites/manager/:id  - Filter by manager"
echo ""
echo -e "${GREEN}   Operations Tracking (5 endpoints)${NC}"
echo -e "      ${CYAN}POST${NC}   /api/operations         - Create operation"
echo -e "      ${CYAN}GET${NC}    /api/operations/site/:id - Get by site"
echo -e "      ${CYAN}GET${NC}    /api/operations/:id     - Get operation"
echo -e "      ${CYAN}PUT${NC}    /api/operations/:id     - Update operation"
echo -e "      ${CYAN}DELETE${NC} /api/operations/:id     - Delete (ADMIN/MANAGER)"
echo ""
echo -e "${GREEN}   Document Management (6 endpoints)${NC}"
echo -e "      ${CYAN}POST${NC}   /api/documents          - Upload to S3"
echo -e "      ${CYAN}GET${NC}    /api/documents          - List documents"
echo -e "      ${CYAN}GET${NC}    /api/documents/:id      - Get document"
echo -e "      ${CYAN}PUT${NC}    /api/documents/:id      - Update metadata"
echo -e "      ${CYAN}DELETE${NC} /api/documents/:id      - Delete from S3 & DB"
echo -e "      ${CYAN}GET${NC}    /api/documents/:id/download-url - Get presigned URL"
echo ""

echo -e "${BOLD}${BLUE}4. SECURITY FEATURES${NC}"
echo -e "${YELLOW}─────────────────────────────────────────────────────────────────────────────${NC}"
echo -e "   ${GREEN}✓${NC} 3-Tier Rate Limiting"
echo -e "      ${CYAN}→${NC} Auth endpoints: 5 requests/15 min"
echo -e "      ${CYAN}→${NC} API endpoints: 100 requests/15 min"
echo -e "      ${CYAN}→${NC} Write operations: 10 requests/min"
echo -e "   ${GREEN}✓${NC} JWT Authentication with bcrypt password hashing"
echo -e "   ${GREEN}✓${NC} Role-Based Access Control (ADMIN, MANAGER, WORKER, OFFICE_ADMIN)"
echo -e "   ${GREEN}✓${NC} Input Validation (express-validator on all endpoints)"
echo -e "   ${GREEN}✓${NC} Helmet.js Security Headers"
echo -e "   ${GREEN}✓${NC} CORS Protection"
echo -e "   ${GREEN}✓${NC} File Upload Security (10MB limit, type whitelist)"
echo ""

echo -e "${BOLD}${BLUE}5. TECHNOLOGY STACK${NC}"
echo -e "${YELLOW}─────────────────────────────────────────────────────────────────────────────${NC}"
echo -e "   ${GREEN}●${NC} Node.js 18+ with TypeScript"
echo -e "   ${GREEN}●${NC} Express.js with Helmet, CORS"
echo -e "   ${GREEN}●${NC} Prisma ORM with PostgreSQL"
echo -e "   ${GREEN}●${NC} AWS SDK v3 (S3 for document storage)"
echo -e "   ${GREEN}●${NC} JWT + bcrypt authentication"
echo -e "   ${GREEN}●${NC} Multer for file uploads"
echo -e "   ${GREEN}●${NC} Express Rate Limit"
echo ""

echo -e "${BOLD}${CYAN}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
if [ ! -z "$APP_PID" ]; then
    echo -e "${BOLD}${CYAN}║  ${GREEN}✓ ASM Application is LIVE and RUNNING on http://localhost:5000${CYAN}        ║${NC}"
else
    echo -e "${BOLD}${CYAN}║  ${YELLOW}⚠ Start the application with: cd backend && npm run dev${CYAN}             ║${NC}"
fi
echo -e "${BOLD}${CYAN}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ ! -z "$APP_PID" ]; then
    echo -e "${YELLOW}Quick Test Commands:${NC}"
    echo -e "${CYAN}curl http://localhost:5000/health${NC}"
    echo -e "${CYAN}curl http://localhost:5000/api${NC}"
    echo ""
fi
