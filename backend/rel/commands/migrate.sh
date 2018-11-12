#!/bin/sh

echo "Run migration"
# Runs ecto.create, ecto.migrate and ecto.seed
release_ctl eval --mfa "Elixir.Db.Tasks.ReleaseTasks.migrate/0"
