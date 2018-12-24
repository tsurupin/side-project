# resource "aws_iam_role" "ecs_host_role" {
#     name = "ecs_host_role"
#     assume_role_policy = "${file("policies/ecs-role.json")}"
# }

# resource "aws_iam_role_policy" "ecs_instance_role_policy" {
#     name = "ecs_instance_role_policy"
#     policy = "${file("policies/ecs-instance-role-policy.json")}"
#     role = "${aws_iam_role.ecs_host_role.id}"
# }

# resource "aws_iam_role" "ecs_service_role" {
#     name = "ecs_service_role"
#     assume_role_policy = "${file("policies/ecs-role.json")}"
# }

# resource "aws_iam_role_policy" "ecs_service_role_policy" {
#     name = "ecs_service_role_policy"
#     policy = "${file("policies/ecs-service-role-policy.json")}"
#     role = "${aws_iam_role.ecs_service_role.id}"
# }

# resource "aws_iam_instance_profile" "ecs" {
#     name = "ecs-instance-profile"
#     path = "/"
#     roles = ["${aws_iam_role.ecs_host_role.name}"]
# }

resource "aws_iam_role" "ecs" {
  name = "${var.ecs_iam_role}"

  assume_role_policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}


resource "aws_iam_role_policy" "ecs_service" {
  name = "${var.ecs_iam_role_policy}"
  role = "${aws_iam_role.ecs.name}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:Describe*",
        "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
        "elasticloadbalancing:RegisterTargets"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}