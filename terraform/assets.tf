resource "aws_s3_bucket" "beh_assets" {
  bucket = "beyond-health-assets"
}
resource "aws_s3_bucket_public_access_block" "beh_assets" {
  bucket = aws_s3_bucket.beh_assets.id
  block_public_acls   = false
  block_public_policy = false
}
resource "aws_cloudfront_distribution" "assets_cdn" {
  origin {
    domain_name = aws_s3_bucket.beh_assets.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.beh_assets.bucket
  }
  enabled         = true
  is_ipv6_enabled = true
  comment         = "beh Assets CDN"
  aliases         = []
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.beh_assets.bucket
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  price_class = "PriceClass_200"
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}