#!/bin/sh
set -e
# export CONTAINER_PRIVATE_IP=$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)
# export CONTAINER_PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
export CONTAINER_PUBLIC_HOSTNAME=$(curl -s http://169.254.169.254/latest/meta-data/public-hostname)
##export CONTAINER_PRIVATE_IP=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
echo "Set CONTAINER IP! '$CONTAINER_PRIVATE_IP'"
