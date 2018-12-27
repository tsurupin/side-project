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

data "aws_iam_policy_document" "ecs" {
  statement {
    actions = [
      "ec2:CreateNetworkInterface",
      "ec2:DeleteNetworkInterface",
      "ec2:DescribeInstances",
      "ec2:DescribeNetworkInterfaces",
      "ecs:DescribeContainerInstances",
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "route53:ChangeResourceRecordSets",
      "route53:CreateHealthCheck",
      "route53:DeleteHealthCheck",
      "route53:GetHealthCheck",
      "route53:GetHostedZone",
      "route53:ListHostedZonesByName",
      "route53:UpdateHealthCheck",
      "servicediscovery:DeregisterInstance",
      "servicediscovery:Get*",
      "servicediscovery:List*",
      "servicediscovery:RegisterInstance",
      "ec2:Describe*",
      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
      "elasticloadbalancing:DeregisterTargets",
      "elasticloadbalancing:Describe*",
      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
      "elasticloadbalancing:RegisterTargets"
    ]

    effect    = "Allow"
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "ecs" {
  name = "${var.ecs_iam_role_policy}"
  role = "${aws_iam_role.ecs.name}"

  policy = "${data.aws_iam_policy_document.ecs.json}"

}