#!/bin/bash
set -ev

# USER_DATA=base64({"ENV": "", "S3_BUCKET": "", "CLOUDFRONT_DISTRIBUTION_ID": "", "AWS_IAM_ROLE_ARN": ""})
USER_DATA=$(echo "$USER_DATA" | base64 --decode)
ENV=$(echo ${USER_DATA} | jq -r '.ENV')
S3_BUCKET=$(echo ${USER_DATA} | jq -r '.S3_BUCKET')
CLOUDFRONT_DISTRIBUTION_ID=$(echo ${USER_DATA} | jq -r '.CLOUDFRONT_DISTRIBUTION_ID')
AWS_IAM_ROLE_ARN=$(echo ${USER_DATA} | jq -r '.AWS_IAM_ROLE_ARN')

cd /usr/share/nginx/html
rm -rf devops .git .github
cp /usr/share/nginx/html/static/config/index.$ENV.js /usr/share/nginx/html/static/config/index.js
cat /usr/share/nginx/html/static/config/index.js

export AWS_REGION=us-east-1

aws_assume_role() {
    # Assume AWS role for specified account
    export aws_assume_creds=$(aws sts assume-role --role-arn $AWS_IAM_ROLE_ARN --role-session-name guardian-cicd)
    export AWS_ACCESS_KEY_ID=$(echo $aws_assume_creds | jq -r ".Credentials.AccessKeyId" | tr -d "\n")
    export AWS_SECRET_ACCESS_KEY=$(echo $aws_assume_creds | jq -r ".Credentials.SecretAccessKey" | tr -d "\n")
    export AWS_SESSION_TOKEN=$(echo $aws_assume_creds | jq -r ".Credentials.SessionToken" | tr -d "\n")
    # END Assume AWS role for specified account
    if [[ -z $AWS_SESSION_TOKEN ]]; then
        echo AWS_SESSION_TOKEN required
        exit 1
    fi
}

aws_assume_role

aws sts get-caller-identity

echo Syncing public assets S3_BUCKET=$S3_BUCKET
aws s3 sync . s3://$S3_BUCKET --delete  --exclude "static/*" --cache-control "public,max-age=0,must-revalidate" > /dev/null

echo Syncing static assets S3_BUCKET=$S3_BUCKET
aws s3 sync ./static s3://$S3_BUCKET/static --cache-control "max-age=31536000,public,immutable" > /dev/null

echo Invalidate CloudFront Cache
aws configure set preview.cloudfront true
aws cloudfront \
    create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths '/*'
