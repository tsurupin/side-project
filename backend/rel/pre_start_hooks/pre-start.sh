#!/bin/sh

# Runs ecto.create, ecto.migrate and ecto.seed
release_ctl eval --mfa "Elixir.Db.Tasks.ReleaseTasks.setup/0"
