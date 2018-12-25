resource "aws_db_parameter_group" "default" {
  name   = "rds-pg"
  family = "postgres10"
  description = "Custom parameters"

}

resource "aws_db_subnet_group" "rds" {
  name = "${var.rds_name}"
  subnet_ids = ["${aws_subnet.main-1a.id}", "${aws_subnet.main-1b.id}"]
}

resource "aws_db_instance" "default" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "10.4"
  instance_class       = "db.t2.micro"
  name                 = "${var.rds_name}"
  username             = "${var.rds_username}"
  password             = "${var.rds_password}"
  parameter_group_name = "${aws_db_parameter_group.default.id}"
  vpc_security_group_ids     = ["${aws_security_group.rds.id}"]
  port = 5342
  identifier = "${var.rds_identifier}"
 
  db_subnet_group_name = "${aws_db_subnet_group.rds.name}"
  availability_zone = "${var.availability_zones["a"]}"
  multi_az = false
  backup_retention_period    = 0
  auto_minor_version_upgrade = true
  skip_final_snapshot        = true
  #storage_encrypted = true

  #enabled_cloudwatch_logs_exports = ["alert", "audit", "error", "general", "listener", "slowquery", "trace", "postgresql", "upgrade"]
  deletion_protection = false
  lifecycle {
    ignore_changes = ["password"]
    prevent_destroy = true
  }
}
