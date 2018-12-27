#### base variables #####
# variable "aws_access_key" {
#     description = "The AWS access key."

# }

# variable "aws_secret_key" {
#     description = "The AWS secret key."
    
# }
variable "regions" {
    description = "The AWS region to create resources in."
    type = "map"
    default = {
        "staging" = "us-east-1"
        "production" = "us-west-2"
    }
}

variable "availability_zones" {
    description = "The availability zone"
    type = "map"
    default = {
        "staging" = {
            "a" = "us-east-1a",
            "b" = "us-east-1b",  
        },
        "production" = {
            "a" = "us-west-2a",
            "b" = "us-west-2b"
        }
    }
}

variable "app_tag_name" {
    description = "The name of tag"
    default = "side-project"
}

variable "ssh_public_key_path" {
    description = "Path to an SSH public key"
    default = "~/.ssh/id_rsa.pub"
}

variable "public_key_name" {
    description = "ssh public key name for aws"
    default = "side-project"
}




#### RDS variables #####
variable "rds_name" {
    description = "db name for RDS"
    default = "side_project_prod"
}

variable "rds_identifier" {
    description = "db identifier for RDS"
    default = "side-project-prod"
}

variable "rds_username" {
    description = "db username for RDS"
    default = "postgres"
}

variable "rds_password" {
    description = "db password for RDS"
    default = "password"
}


#### ECS variables #####
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


variable "alb_name" {
    description = "ALB for side-project"
    default = "side-project"
}


variable "ecs_iam_role" {
    description = "IAM role for ecs"
    default = "side-project-ecs-role"
}

variable "ecs_iam_role_policy" {
    description = "IAM role policy for ecs"
    default = "side-project-ecs-role-policy"
}

variable "ecs_task_definition" {
    description = "ECS task definition for app"
    default = "side-project-prod"
}

#### S3 variables ####

variable "s3_app_bucket_name" {
    description = "S3 bucket for app"
    default = "side-project-prod-app"
}