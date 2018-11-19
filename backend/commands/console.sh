#!/bin/bash
ssh  -i $AWS_ECS_PEM_FILE_PATH ec2-user@$AWS_ECS_CONTAINER_DNS 
docker exec -it $(eval docker ps -l --format '{{.ID}}')  bash -c "bin/backend remote_console"