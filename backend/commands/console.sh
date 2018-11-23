#!/bin/bash
ssh  -i $AWS_ECS_PEM_FILE_PATH ec2-user@$AWS_ECS_CONTAINER_DNS 
##docker exec -it $(eval docker ps -l --format '{{.ID}}')  bash -c "bin/backend remote_console"
##http://blog.plataformatec.com.br/2016/05/tracing-and-observing-your-remote-node/
docker exec -it $(eval docker ps -l --format '{{.ID}}')  bash -c "iex --name console@127.0.0.1 --cookie '$NODE_COOKIE'"