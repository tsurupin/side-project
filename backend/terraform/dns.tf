resource "aws_route53_zone" "app" {
  name         = "side-proj.com."
  vpc_id = "${aws_vpc.main.id}"
}

resource "aws_route53_record" "www" {
  zone_id = "${aws_route53_zone.app.zone_id}"
  name    = "www.${aws_route53_zone.app.name}"
  type    = "A"
 

  alias {
    name                   = "${aws_alb.main.dns_name}"
    zone_id                = "${aws_alb.main.zone_id}"
    evaluate_target_health = true
  }
}

resource "aws_service_discovery_private_dns_namespace" "app" {
  name        = "side-project-prod"
  description = "example"
  vpc         = "${aws_vpc.main.id}"
}