#!/bin/sh
set -e

echo "Connecting nodes"
release_ctl eval --mfa "Elixir.Db.Tasks.BootTasks.connect/0"
echo "Connected nodes"