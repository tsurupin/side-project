# #!/bin/bash
# set -e

# APP_PATH=../..
# echo "Creating .hosts.erlang"

# InstanceID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
# ScalingGroup=$(aws ec2 describe-tags --filters "Name=resource-id,Values=$InstanceID" "Name=key,Values=aws:autoscaling:groupName" --region $AWS_DEFAULT_REGION --query 'Tags[].Value[]'  --output text)
# IPS=$(aws ec2 describe-instances --region $AWS_DEFAULT_REGION --filters Name=tag:"aws:autoscaling:groupName",Values=$ScalingGroup --output text --query 'Reservations[].Instances[].NetworkInterfaces[].PrivateIpAddresses[].PrivateIpAddress')
# echo $IPS
# echo $PWD
# ##$IPS > $APP_PATH/.hosts.erlang
# ##$IPS | sed '$!N;s/\t/\n/g' | sed -e "s/\(.*\)/'\1'./)" > $APP_PATH/.hosts.erlang

# echo ".hosts.erlang created"