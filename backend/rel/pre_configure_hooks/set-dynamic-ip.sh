#!/bin/sh
set -e

echo "Set CONTAINER IP!"
export CONTAINER_IP=$(hostname -i)
echo $CONTAINER_IP