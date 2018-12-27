resource "aws_ecs_cluster" "app" {
  name = "${var.ecs_cluster_name}"
  tags = [
    {
        key                 = "AppName"
        value               = "${var.app_tag_name}"
        propagate_at_launch = true
      }
  ]
}

resource "aws_ecr_repository" "master" {
  name = "${var.ecr_repository_name}"
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

  # tags = {
  #   key                 = "AppName"
  #   value               = "${var.app_tag_name}"
  #   propagate_at_launch = true
  # }

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
    availability_zones = ["${lookup(var.availability_zones[terraform.workspace], "a")}","${lookup(var.availability_zones[terraform.workspace], "b")}"]
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
      {
        key                 = "AppName"
        value               = "${var.app_tag_name}"
        propagate_at_launch = true
      }
    ]
}
