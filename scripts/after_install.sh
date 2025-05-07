#!/bin/bash
# This script is run after the installation of the package.
cd /deployments/my-page-api
echo "Installing dependencies..."
sudo npm install --omit=dev
echo "Building my-page-api app..."
sudo npm run build