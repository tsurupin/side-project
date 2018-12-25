provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region = "${var.region}"
}

resource "aws_key_pair" "default" {
    key_name = "${var.public_key_name}"
    public_key = "${file(var.ssh_public_key_path)}"
}
