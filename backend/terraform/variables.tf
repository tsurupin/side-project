
variable "aws_access_key" {
    description = "The AWS access key."
}

variable "aws_secret_key" {
    description = "The AWS secret key."
}

variable "region" {
    description = "The AWS region to create resources in."
    default = "us-east-1"
}

variable "availability_zones" {
    description = "The availability zone"
    type = "map"
    default = {
       "a" = "us-east-1a",
       "b" = "us-east-1b",
    }
}

variable "ecs_cluster_name" {
    description = "The name of the Amazon ECS cluster."
    default = "side-project-prod"
}

variable "ecr_repository_name" {
    description = "The name of the Amazon ECR Repository."
    default = "side-project"
}

variable "ecs_service_name" {
    description = "The name of the Amazon ECS service."
    default = "side-project-prod"
}

variable "tag_name" {
    description = "The name of tag"
    default = "side-project-prod"
}

variable "amis" {
    description = "Which AMI to spawn. Defaults to the AWS ECS optimized images."
    type = "map"
    default = {
       "us-west-1" = "ami-009d6802948d06e52",
       "us-west-2" = "ami-009d6802948d06e52",
    }
}


variable "autoscale_min" {
    default = "1"
    description = "Minimum autoscale (number of EC2)"
}

variable "autoscale_max" {
    default = "2"
    description = "Maximum autoscale (number of EC2)"
}

variable "autoscale_desired" {
    default = "2"
    description = "Desired autoscale (number of EC2)"
}


variable "ecs_instance_type" {
    default = "t2.small"
}

variable "ssh_public_key_path" {
    description = "Path to an SSH public key"
    default = "~/.ssh/id_rsa.pub"
}

variable "public_key_name" {
    description = "ssh public key name for aws"
    default = "side-project"
}

