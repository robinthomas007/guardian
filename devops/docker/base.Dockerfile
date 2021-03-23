FROM nginx:1.18

RUN apt-get update -y && apt-get install -y curl less groff jq unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip 2>&1 > /dev/null && ./aws/install 2>&1 > /dev/null && rm -rf aws awscliv2.zip
