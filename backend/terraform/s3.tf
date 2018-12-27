resource "aws_s3_bucket" "app" {
  bucket = "${var.s3_app_bucket_name}"
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://google.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  tags = [
    {
      Name        = "My bucket"
      Environment = "s3"
    },
    {
      key                 = "AppName"
      value               = "${var.app_tag_name}"  
      propagate_at_launch = true
     } 
  ]   
}
