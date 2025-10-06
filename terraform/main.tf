module "vpc" {
  source = "./vpc"
}

module "eks" {
  source  = "./clean-eks" # ✅ Local override

  cluster_name    = "primetrade-cluster"
  cluster_version = "1.29"
  subnet_ids      = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id

  eks_managed_node_groups = {
    default = {
      desired_size   = 2
      max_size       = 4
      min_size       = 1
      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"
    }
  }

  tags = {
    Environment = "dev"
    Project     = "primetrade"
  }
}
