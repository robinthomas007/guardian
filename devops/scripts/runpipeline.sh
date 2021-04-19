#!/bin/bash

set -e

ENV=${ENV:-"dev"}
ENV="$(echo $ENV | tr A-Z a-z)"
case "$ENV" in
dev)
    S3_BUCKET="usaws03-guardian-website-dev"
    CLOUDFRONT_DISTRIBUTION_ID="EVD77YJQTPQUR"
    AWS_IAM_ROLE_ARN="arn:aws:iam::184233242460:role/aws03-guardian-cicd"
    ;;
qa)
    S3_BUCKET="usaws03-guardian-website-qa"
    CLOUDFRONT_DISTRIBUTION_ID="E3G7L2S24TQ3U6"
    AWS_IAM_ROLE_ARN="arn:aws:iam::184233242460:role/aws03-guardian-cicd"
    ;;
stage)
    S3_BUCKET="usaws03-guardian-website-stage"
    CLOUDFRONT_DISTRIBUTION_ID="E1Y20ESONKYM93"
    AWS_IAM_ROLE_ARN="arn:aws:iam::184233242460:role/aws03-guardian-cicd"
    ;;
sandbox)
    S3_BUCKET="usaws03-guardian-website-sandbox"
    CLOUDFRONT_DISTRIBUTION_ID="E26PDUXGYYVWFH"
    AWS_IAM_ROLE_ARN="arn:aws:iam::184233242460:role/aws03-guardian-cicd"
    ;;
test)
    S3_BUCKET="usaws03-guardian-website-test"
    CLOUDFRONT_DISTRIBUTION_ID="E1IN08IPY5ZRDB"
    AWS_IAM_ROLE_ARN="arn:aws:iam::184233242460:role/aws03-guardian-cicd"
    ;;
prod)
    S3_BUCKET="usaws03-guardian-website-prod"
    CLOUDFRONT_DISTRIBUTION_ID="E30GJKOTYDOGW2"
    AWS_IAM_ROLE_ARN="arn:aws:iam::184233242460:role/aws03-guardian-cicd"
    ;;
esac

GIT_REF=${GIT_REF:-"$GITHUB_REF"}
GIT_COMMIT=${GIT_COMMIT:-"$GITHUB_SHA"}
PIPELINE=${PIPELINE:-"build-execute"}
IMAGE_URL="$(jq -r '.Image.URL' devops/tekton/trigger.json):$GIT_COMMIT"

cat >userdata.json <<-EOF
{
    "ENV": "$ENV",
    "S3_BUCKET": "$S3_BUCKET",
    "CLOUDFRONT_DISTRIBUTION_ID": "$CLOUDFRONT_DISTRIBUTION_ID",
    "AWS_IAM_ROLE_ARN": "$AWS_IAM_ROLE_ARN"
}
EOF
# USER_DATA=base64({"ENV": "", S3_BUCKET": "", "CLOUDFRONT_DISTRIBUTION_ID": "", "AWS_IAM_ROLE_ARN": ""})
USER_DATA="$(cat userdata.json | base64)"
rm -f userdata.json
jq ".API.Pipeline=\"$PIPELINE\"|.Git.Ref=\"$GIT_REF\"|.Git.Revision=\"$GIT_COMMIT\"|.Image.Tag=\"$GIT_COMMIT\"|.Config.UserData=\"$USER_DATA\"" \
    devops/tekton/trigger.json >trigger.json

cat trigger.json

export EVENT_ID=$(curl http://el-build-pipeline-listener.tekton-pipelines.svc.cluster.local:8080/v1/$PIPELINE \
    -d @trigger.json | jq -r '.eventID')

echo Execution Logs: https://tekton.devops.umgapps.com/#/pipelineruns?labelSelector=triggers.tekton.dev%2Ftriggers-eventid%3D$EVENT_ID

tknwatch
