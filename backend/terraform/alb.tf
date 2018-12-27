
resource "aws_alb_target_group" "ecs" {
  name = "${var.ecs_service_name}"
  port = 80
  protocol = "HTTP"
  target_type = "instance"
  vpc_id   = "${aws_vpc.main.id}"
}

resource "aws_alb" "main" {
  name            = "${var.alb_name}"
  internal = false
  enable_deletion_protection = true
  subnets         = ["${aws_subnet.main-1a.id}", "${aws_subnet.main-1b.id}"]
  security_groups = ["${aws_security_group.alb.id}"]

  tags = [    
     {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     }
  ]   

  # depends_on = ["aws_s3_bucket.app"]
  
  # access_logs {    
  #   bucket = "${var.s3_app_bucket_name}"    
  #   prefix = "ELB-logs" 
  #   enabled = true 
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

# resource "aws_lb_listener" "https" {
#   load_balancer_arn = "${aws_alb.main.arn}"
#   port              = "443"
#   protocol          = "HTTPS"
#   ssl_policy        = "ELBSecurityPolicy-2015-05"
#   #certificate_arn   = "arn:aws:iam::187416307283:server-certificate/test_cert_rab3wuqwgja25ct3n4jdj2tzu4"

#   default_action {
#     type             = "forward"
#     target_group_arn = "${aws_alb_target_group.ecs.arn}"
#   }
# }


