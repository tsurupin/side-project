#!/bin/sh
set -e
export CONTAINER_PRIVATE_IP=$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)
##export CONTAINER_PRIVATE_IP=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
echo "Set CONTAINER IP! '$CONTAINER_PRIVATE_IP'"
