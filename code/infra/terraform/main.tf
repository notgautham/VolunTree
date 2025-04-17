provider "aws" {
  region = "ap-south-1" # Mumbai (or update if needed)
}

# Key Pair
resource "aws_key_pair" "voluntree_key" {
  key_name   = "voluntree-key"
  public_key = file("C:/Users/vgaut/.ssh/voluntree-key.pub")
}

data "aws_vpc" "default" {
  default = true
}

# Security Group for EC2
resource "aws_security_group" "ec2_sg" {
  name        = "voluntree-ec2-sg"
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
  key_name      = aws_key_pair.voluntree_key.key_name
  security_groups = [aws_security_group.ec2_sg.name]
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

  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  tags = {
    Name = "voluntree-rds"
  }
}
