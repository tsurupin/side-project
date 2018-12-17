provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region = "${var.region}"
}

resource "aws_key_pair" "side-project" {
    key_name = "side-project"
    public_key = "${file(var.ssh_pubkey_file)}"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  //enable_dns_hostnames = true

  tags {
    Name = "#{var.tag_name}"
  }
}

resource "aws_internet_gateway" "main-gw" {
  vpc_id = "${aws_vpc.main.id}"
  tags {
    Name = "#{var.tag_name}"
  }
}

resource "aws_subnet" "main-1a" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.0.0/24"
  availability_zone = "${lookup(var.availability_zones, "a")}"
  tags {
    Name = "#{var.tag_name}"
  }
  map_public_ip_on_launch = true
}

resource "aws_subnet" "main-1b" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "${lookup(var.availability_zones, "b")}"
  tags {
    Name = "#{var.tag_name}"
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
    Name = "#{var.tag_name}"
  }
}

resource "aws_route_table_association" "main-1a" {
  subnet_id = "${aws_subnet.main-1a.id}"
  route_table_id = "${aws_route_table.rt.id}"
}

resource "aws_route_table_association" "main-1b" {
  subnet_id = "${aws_subnet.main-1b.id}"
  route_table_id = "${aws_route_table.rt.id}"
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
    cidr_blocks = ["0.0.0.0/0", "::/0"]
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

# resource "aws_security_group" "ssh" {
#   name = "side-project-ssh"
#   description = "Allow all incoming trafic"
#   vpc_id = "${aws_vpc.main.id}"
#   ingress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = -1
#     cidr_blocks = ["0.0.0.0/0"]
#   }
#   egress {
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }
resource "aws_security_group" "ecs" {
  name = "side-project-ecs"
  description = "ECS Allowed Ports"
  vpc_id = "${aws_vpc.main.id}"

  ingress {
      from_port = 9000
      to_port = 9100
      protocol = "TCP"
      security_groups = ["${aws_security_group.ecs.id}"]
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
       security_groups = ["${aws_security_group.ecs.id}"]
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
    Name = "#{var.tag_name}"
  }
}

resource "aws_ecr_repository" "master" {
  name = "${var.ecr_repository_name}"
}


# resource "aws_ecs_service" "side-project-prod" {
#   name            = "side-project-prod"
#   cluster         = "${aws_ecs_cluster.app.id}"
#   task_definition = "${aws_ecs_task_definition.mongo.arn}"
#   desired_count   = 1
#   iam_role        = "${aws_iam_role.foo.arn}"
#   depends_on      = ["aws_iam_role_policy.foo"]

#   # ordered_placement_strategy {
#   #   type  = "binpack"
#   #   field = "cpu"
#   # }

#   # load_balancer {
#   #   target_group_arn = "${aws_lb_target_group.foo.arn}"
#   #   container_name   = "mongo"
#   #   container_port   = 8080
#   # }

#   # placement_constraints {
#   #   type       = "memberOf"
#   #   expression = "attribute:ecs.availability-zone in [us-west-2a, us-west-2b]"
#   # }
# }

resource "aws_launch_configuration" "as_conf" {
  name_prefix   = "ECS ${var.ecs_cluster_name}-"
  image_id      = "${var.amis["us-west-1"]}"
  instance_type = "t2.small"

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
      },


    ]
}


