# AWS Configuration and Access Notes


## AWS CLI

https://docs.aws.amazon.com/signin/latest/userguide/command-line-sign-in.html

```sh
aws configure sso
```
https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html#sso-configure-profile-token-auto-sso

```sh
aws sso login --profile PowerUserAccess-941936532135
```

## Connectiong to EC2 Instance

https://repost.aws/knowledge-center/ec2-linux-connection-options

Method 1: Use a terminal window

```sh
ssh -i "learn-linux.pem" ubuntu@ec2-100-26-47-1.compute-1.amazonaws.com
```

The *.pem file has to be set-up before the instance is created. 