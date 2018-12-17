variable "aws_access_key" {
    description = "The AWS access key."
}

variable "aws_secret_key" {
    description = "The AWS secret key."
}

variable "region" {
    description = "The AWS region to create resources in."
    default = "us-west-1"
}

variable "availability_zones" {
    description = "The availability zone"
    type = "map"
    default = {
       "a" = "us-west-1a",
       "b" = "us-west-1b",
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

variable "amis" {
    description = "Which AMI to spawn. Defaults to the AWS ECS optimized images."
    type = "map"
    default = {
       "us-west-1" = "ami-ddc7b6b7",
       "us-west-2" = "ami-ddc7b6b7",
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


variable "instance_type" {
    default = "t2.micro"
}

variable "ssh_pubkey_file" {
    description = "Path to an SSH public key"
    default = "~/.ssh/id_rsa.pub"
}