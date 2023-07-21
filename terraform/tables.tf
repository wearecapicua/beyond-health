locals {
  vercel_envs = ["production", "preview", "development", "localhost"]
}

resource "aws_dynamodb_table" "auth-dynamodb-table" {
  for_each     = toset(local.vercel_envs)
  name         = "${each.key}-beyond-health-users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"
  range_key    = "sk"
  ttl {
    attribute_name = "expires"
    enabled        = true
  }

  global_secondary_index {
    name            = "GSI1"
    hash_key        = "GSI1PK"
    range_key       = "GSI1SK"
    projection_type = "ALL"
  }

  attribute {
    name = "pk"
    type = "S"
  }
  attribute {
    name = "sk"
    type = "S"
  }
  attribute {
    name = "GSI1PK"
    type = "S"
  }
  attribute {
    name = "GSI1SK"
    type = "S"
  }
}
