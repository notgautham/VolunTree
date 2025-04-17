# ------------------------------
# 🔶 FRONTEND: S3 + CloudFront
# ------------------------------

# S3 bucket for frontend hosting
resource "aws_s3_bucket" "frontend" {
  bucket = "voluntree-frontend-bucket-${random_id.suffix.hex}"

  tags = {
    Name = "voluntree-frontend"
  }

  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "frontend_website" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid       = "PublicReadGetObject",
      Effect    = "Allow",
      Principal = "*",
      Action    = "s3:GetObject",
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
    }]
  })
}

# Unique suffix to avoid bucket name collisions
resource "random_id" "suffix" {
  byte_length = 4
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "frontend_cdn" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "s3-frontend-origin"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "s3-frontend-origin"

    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Name = "voluntree-frontend-cdn"
  }
}



#============================================================================

provider "aws" {
  region = "ap-south-1" # Mumbai (or update if needed)
}

data "aws_vpc" "default" {
  default = true
}

# Security Group for EC2
resource "aws_security_group" "ec2_sg" {
  name        = "voluntree-ec2-sg-frontendd"
  description = "Allow SSH and backend port"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description      = "Allow SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
  }

  ingress {
    description      = "Allow backend (port 5000)"
    from_port        = 5000
    to_port          = 5000
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
  }

  egress {
    description      = "Allow all outbound"
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
  }

  tags = {
    Name = "voluntree-ec2-sg"
  }
}


# EC2 Instance
resource "aws_instance" "backend" {
  ami = "ami-0f58b397bc5c1f2e8"
  instance_type = "t3.micro"
  #key_name      = aws_key_pair.voluntree_key.key_name\
  key_name = "voluntree-key"
  security_groups = [aws_security_group.frontend_sg.name]
  tags = {
    Name = "voluntree-backend"
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier         = "voluntree-db"
  engine             = "postgres"
  engine_version     = "15.12"
  instance_class     = "db.t3.micro"
  allocated_storage  = 20
  db_name            = "voluntree"
  username           = "voluntree_user"
  password           = "Admin12345"  # Change this later and don’t expose in real projects
  skip_final_snapshot = true
  publicly_accessible = true

  vpc_security_group_ids = [aws_security_group.frontend_sg.id]

  tags = {
    Name = "voluntree-rds"
  }
}
