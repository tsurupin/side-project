#!/bin/bash
APP_PATH=../../apps/db
echo "Creating .hosts.erlang"

ScalingGroup=aws ec2 describe-tags --filters "Name=resource-id,Values=$AWS_AUTOSCALING_GROUP" "Name=key,Values=aws:autoscaling:groupName" --region $AWS_DEFAULT_REGION --query 'Tags[].Value[]'  --output text`
aws ec2 describe-instances --region $AWS_DEFAULT_REGION --filters Name=tag:"aws:autoscaling:groupName",Values=$ScalingGroup --output text --query 'Reservations[].Instances[].NetworkInterfaces[].PrivateIpAddresses[].PrivateIpAddress' | sed '$!N;s/\t/\n/g' | sed -e "s/\(.*\)/'\1'./" > $APP_PATH/.hosts.erlang

echo ".hosts.erlang created"