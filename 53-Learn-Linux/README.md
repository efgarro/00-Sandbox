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
ssh -i "/c/00-CodeShop/00-Sandbox/53-Learn-Linux/learn-linux.pem" ubuntu@ec2-100-26-47-1.compute-1.amazonaws.com

ssh -i "mosqtto-user.pem" ubuntu@ec2-3-85-17-83.compute-1.amazonaws.com

psql --host=100.26.47.1 --port=5432 --username=postgres --dbname=template1

```

sudo -i -u postgres

The \*.pem file has to be set-up before the instance is created.

## Vim Editor

https://coderwall.com/p/adv71w/basic-vim-commands-for-getting-started

## Upload Files to EC2 Instance

https://angus.readthedocs.io/en/2014/amazon/transfer-files-between-instance.html

```sh
scp -i learn-linux.pem file.txt ubuntu@ec2-100-26-47-1.compute-1.amazonaws.com:~/data/
```
