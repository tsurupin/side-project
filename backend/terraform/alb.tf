
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

resource "aws_lb_listener" "https" {
  load_balancer_arn = "${aws_alb.main.arn}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2015-05"
  #certificate_arn   = "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4"

  default_action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.ecs.arn}"
  }
}


