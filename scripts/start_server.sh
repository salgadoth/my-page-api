#!/bin/bash
# This script is run after the installation of the package.
cd /deployments/my-page-api
echo "Starting my-page-api app..."
pm2 start ecosystem.config.js --env production
echo "Saving my-page-api app..."
pm2 save