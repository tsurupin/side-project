
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


