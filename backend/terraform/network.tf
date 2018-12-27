resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = [    
     {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     }
  ]   
}

resource "aws_internet_gateway" "main-gw" {
  vpc_id = "${aws_vpc.main.id}"
  tags = [    
     {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     }
  ]   
}

resource "aws_subnet" "main-1a" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.0.0/24"
  availability_zone = "${lookup(var.availability_zones[terraform.workspace], "a")}"
  tags = [    
     {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     }
  ]   
  map_public_ip_on_launch = true
}

resource "aws_subnet" "main-1b" {
  vpc_id     = "${aws_vpc.main.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "${lookup(var.availability_zones[terraform.workspace], "b")}"
  tags = [    
     {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     }
  ]   
  map_public_ip_on_launch = true
}

resource "aws_route_table" "main" {
  vpc_id = "${aws_vpc.main.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.main-gw.id}"
  }
  tags = [    
     {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     }
  ]   
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
    from_port = 5432
    to_port = 5432
    protocol = "TCP"
    security_groups = ["${aws_security_group.ecs.id}"]
    description = "side-project-ecs"
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
