#!/bin/bash
# This script is run before the installation of the package.
# Stops the application if it is running.
echo "Stopping existing my-page app (if running)..."
pm2 stop my-page-api || true
echo "Removing existing my-page-api old files..."
sudo rm -rf /deployments/my-page-api/*
