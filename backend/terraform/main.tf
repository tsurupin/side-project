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
  availability_zone = "us-west-1a"
  tags {
    Name = "#{var.tag_name}"
  }
  map_public_ip_on_launch = true
}

resource "aws_subnet" "main-1b" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-west-1b"
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
resource "aws_security_group" "incoming" {
  name = "incoming"
  description = "Allow all incoming trafic"
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
  name = "ecs"
  description = "Allows all traffic"
  vpc_id = "${aws_vpc.main.id}"

  # TODO: remove this and replace with a bastion host for SSHing into
  # individual machines.
  ingress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      security_groups = ["${aws_security_group.load_balancers.id}"]
  }

  egress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_autoscaling_group" "ecs-cluster" {
  name = "${var.ecs_cluster_name}"
}


resource "aws_autoscaling_group" "ecs-cluster" {
    availability_zones = ["${var.availability_zone}"]
    name = "ECS ${var.ecs_cluster_name}"
    min_size = "${var.autoscale_min}"
    max_size = "${var.autoscale_max}"
    desired_capacity = "${var.autoscale_desired}"
    health_check_type = "EC2"
    launch_configuration = "${aws_launch_configuration.ecs.name}"
    vpc_zone_identifier = ["${aws_subnet.main.id}"]
}


