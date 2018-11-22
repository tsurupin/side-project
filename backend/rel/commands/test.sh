#!/bin/sh
echo "Run seed script"
release_remote_ctl rpc 'Elixir.Db.Tasks.BootTasks.test/0'