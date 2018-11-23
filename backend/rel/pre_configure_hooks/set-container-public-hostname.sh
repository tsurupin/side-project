#!/bin/sh
set -e

export CONTAINER_PUBLIC_HOSTNAME=$(curl -s http://169.254.169.254/latest/meta-data/public-hostname)
echo "Set CONTAINER_PUBLIC_HOSTNAME! '$CONTAINER_PUBLIC_HOSTNAME'"
