#!/bin/bash
# ============================================================
# ShopEase - Rebuild & Run Script
# Run this on the Azure VM to apply all fixes:
#   1. Rebuilds frontend (fixes API proxy / registration bug)
#   2. Rebuilds product-service (adds pre-seeded products)
#   3. Starts all services via docker-compose on a shared network
# ============================================================

set -e

echo "======================================"
echo "  ShopEase - Rebuild & Deploy"
echo "======================================"

# ---------- Stop any existing containers ----------
echo ""
echo ">>> Stopping existing containers..."
docker stop frontend user-service product-service order-service payment-service 2>/dev/null || true
docker rm   frontend user-service product-service order-service payment-service 2>/dev/null || true

# ---------- Rebuild frontend ----------
echo ""
echo ">>> Building frontend image (fixes API routing)..."
docker build -t frontend:latest ./frontend

# ---------- Rebuild product-service (adds data seeder) ----------
echo ""
echo ">>> Building product-service image (adds sample products)..."
docker build -t product-service:latest ./backend/product-service

# ---------- Start everything via docker-compose ----------
echo ""
echo ">>> Starting all services with docker-compose..."
docker-compose up -d

# ---------- Wait and show status ----------
echo ""
echo ">>> Waiting 15 seconds for services to start..."
sleep 15

echo ""
echo ">>> Container status:"
docker ps

echo ""
echo "======================================"
echo "  Done! ShopEase is running at:"
echo "  http://$(curl -s ifconfig.me 2>/dev/null || echo '<VM-IP>'):3000"
echo "======================================"
