provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region = "${var.region}"
}

resource "aws_key_pair" "default" {
    key_name = "${var.public_key_name}"
    public_key = "${file(var.ssh_public_key_path)}"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  //enable_dns_hostnames = true

  tags {
    Name = "${var.tag_name}"
  }
}

resource "aws_internet_gateway" "main-gw" {
  vpc_id = "${aws_vpc.main.id}"
  tags {
    Name = "${var.tag_name}"
  }
}

resource "aws_subnet" "main-1a" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.0.0/24"
  availability_zone = "${lookup(var.availability_zones, "a")}"
  tags {
    Name = "${var.tag_name}"
  }
  map_public_ip_on_launch = true
}

resource "aws_subnet" "main-1b" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "${lookup(var.availability_zones, "b")}"
  tags {
    Name = "${var.tag_name}"
  }
  map_public_ip_on_launch = true
}

resource "aws_route_table" "main" {
  vpc_id = "${aws_vpc.main.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.main-gw.id}"
  }
  tags {
    Name = "${var.tag_name}"
  }
}

resource "aws_route_table_association" "main-1a" {
  subnet_id = "${aws_subnet.main-1a.id}"
  route_table_id = "${aws_route_table.main.id}"
}

resource "aws_route_table_association" "main-1b" {
  subnet_id = "${aws_subnet.main-1b.id}"
  route_table_id = "${aws_route_table.main.id}"
}

resource "aws_security_group" "internet" {
  name = "internet"
  description = "Allow access to internet"
  vpc_id = "${aws_vpc.main.id}"
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "alb" {
  name = "side-project-alb"
  description = "Allow all incoming trafic through ALB"
  vpc_id = "${aws_vpc.main.id}"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}



resource "aws_security_group" "rds" {
  name = "${var.rds_name}"
  vpc_id = "${aws_vpc.main.id}"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "internal" {
  name = "internal"
  description = "Allow all internal trafic"
  vpc_id = "${aws_vpc.main.id}"
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_security_group" "ecs" {
  name = "side-project-ecs"
  description = "ECS Allowed Ports"
  vpc_id = "${aws_vpc.main.id}"

  ingress {
      from_port = 9000
      to_port = 9100
      protocol = "TCP"
      self = true
      description = "internal-nodes"
  }

  ingress {
      from_port = 0
      to_port = 65535
      protocol = "TCP"
      security_groups = ["${aws_security_group.alb.id}"]
      description = "side-project-alb"
  }

  ingress {
      from_port = 22
      to_port = 22
      protocol = "TCP"
      cidr_blocks = ["71.145.209.98/32"]
      description = "side-project-ssh"
  }

  ingress {
      from_port = 4369
      to_port = 4369
      protocol = "TCP"
      self = true
      description = "side-project-erlang.erlang connections from same ec2 container instances"
  }

  egress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_cluster" "app" {
  name = "${var.ecs_cluster_name}"
  tags {
    Name = "${var.tag_name}"
  }
}

resource "aws_ecr_repository" "master" {
  name = "${var.ecr_repository_name}"
}

resource "aws_alb_target_group" "ecs" {
  name = "${var.ecs_service_name}"
  port = 80
  protocol = "HTTP"
  target_type = "instance"
  vpc_id   = "${aws_vpc.main.id}"
}

resource "aws_alb" "main" {
  name            = "${var.alb_name}"
  subnets         = ["${aws_subnet.main-1a.id}", "${aws_subnet.main-1b.id}"]
  security_groups = ["${aws_security_group.alb.id}"]
  #   internal        = "${var.internal_alb}"  
  #   idle_timeout    = "${var.idle_timeout}"  
  # tags {    
  #   Name    = "${var.alb_name}"    
  # }   
  # access_logs {    
  #   bucket = "${var.s3_bucket}"    
  #   prefix = "ELB-logs"  
  # }
}


resource "aws_alb_listener" "app" {
  load_balancer_arn = "${aws_alb.main.id}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = "${aws_alb_target_group.ecs.id}"
    type             = "forward"
  }
}



resource "aws_ecs_task_definition" "app" {
  family = "${var.ecs_task_definition}"
  task_role_arn         = "${aws_iam_role.ecs.arn}"
  #network_mode             = "awsvpc"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.ecs_service_name}",
    "image": "busybox",
    "cpu": 10,
    "memory": 10,
    "essential": true,
    "portMappings": [
      {
        "containerPort": 4000,
        "hostPort": 80
      }
    ]
  }
]
DEFINITION
}

# Simply specify the family to find the latest ACTIVE revision in that family.
data "aws_ecs_task_definition" "app" {
  depends_on = ["aws_ecs_task_definition.app"]
  task_definition = "${aws_ecs_task_definition.app.family}"
}


resource "aws_service_discovery_private_dns_namespace" "app" {
  name        = "side-project-prod"
  description = "example"
  vpc         = "${aws_vpc.main.id}"
}

resource "aws_service_discovery_service" "app" {
  name = "side-project-prod"

  dns_config {
    namespace_id = "${aws_service_discovery_private_dns_namespace.app.id}"

    dns_records {
      ttl  = 60
      type = "SRV"
    }

    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 1
  }
}

resource "aws_ecs_service" "app" {
  name            = "${var.ecs_service_name}"
  cluster         = "${aws_ecs_cluster.app.id}"
  task_definition = "${aws_ecs_task_definition.app.family}:${max("${aws_ecs_task_definition.app.revision}", "${data.aws_ecs_task_definition.app.revision}")}"
  desired_count   = 1
  #iam_role        = "${aws_iam_role.ecs.name}"
  depends_on      = ["aws_ecs_task_definition.app", "aws_alb_target_group.ecs"]
  health_check_grace_period_seconds = 30
  # ordered_placement_strategy {
  #   type  = "binpack"
  #   field = "cpu"
  # }

  service_registries  = {
    registry_arn = "${aws_service_discovery_service.app.arn}"
    container_name = "${var.ecs_service_name}"
    container_port = 4000
  }

  load_balancer {
    target_group_arn = "${aws_alb_target_group.ecs.arn}"
    container_name   = "${var.ecs_service_name}"
    container_port   = 4000
  }

  tags {

  }

}

resource "aws_launch_configuration" "as_conf" {
  name_prefix   = "ECS ${var.ecs_cluster_name}-"
  image_id      = "${var.amis["us-west-1"]}"
  instance_type = "${var.ecs_instance_type}"
  key_name = "${var.public_key_name}"
  security_groups = ["${aws_security_group.ecs.id}"]

  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_autoscaling_group" "ecs-cluster" {
    name = "ECS ${var.ecs_cluster_name}"
    availability_zones = ["${var.availability_zones["a"]}","${var.availability_zones["b"]}"]
    min_size = "${var.autoscale_min}"
    max_size = "${var.autoscale_max}"
    desired_capacity = "${var.autoscale_desired}"
    health_check_type = "EC2"
    launch_configuration = "${aws_launch_configuration.as_conf.name}"
    vpc_zone_identifier = ["${aws_subnet.main-1a.id}", "${aws_subnet.main-1b.id}"]

    tags = [
      {
        key                 = "Description"
        value               = "This instance is the part of the Auto Scaling group which was created through ECS Console"
        propagate_at_launch = true
      },
       {
        key                 = "Name"
        value               = "ECS ${var.ecs_cluster_name}"
        propagate_at_launch = true
      }
    ]
}
resource "aws_db_parameter_group" "default" {
  name   = "rds-pg"
  family = "postgres10"
  description = "Custom parameters"

}

resource "aws_db_subnet_group" "rds" {
  name = "${var.rds_name}"
  subnet_ids = ["${aws_subnet.main-1a.id}", "${aws_subnet.main-1b.id}"]
}

resource "aws_db_instance" "default" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "10.4"
  instance_class       = "db.t2.micro"
  name                 = "${var.rds_name}"
  username             = "${var.rds_username}"
  password             = "${var.rds_password}"
  parameter_group_name = "${aws_db_parameter_group.default.id}"
  vpc_security_group_ids     = ["${aws_security_group.rds.id}"]
  port = 5342
  identifier = "${var.rds_identifier}"
 
  db_subnet_group_name = "${aws_db_subnet_group.rds.name}"
  availability_zone = "${var.availability_zones["a"]}"
  multi_az = false
  backup_retention_period    = 0
  auto_minor_version_upgrade = true
  skip_final_snapshot        = true
  #storage_encrypted = true

  #enabled_cloudwatch_logs_exports = ["alert", "audit", "error", "general", "listener", "slowquery", "trace", "postgresql", "upgrade"]
  deletion_protection = false
  lifecycle {
    ignore_changes = ["password"]
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "app" {
  bucket = "${var.s3_app_bucket_name}"
  acl    = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://google.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
