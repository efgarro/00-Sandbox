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

## Linux Commands Cheatsheet

https://www.geeksforgeeks.org/linux-commands-cheat-sheet/

```sh
# update packages
sudo apt update
```

## Linux Auth

Add or replace a ssh key-pair
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/replacing-key-pair.html

```sh
# change to postgres user
sudo -i -u postgres

# retrieve public key from private key
ssh-keygen -y -f /path_to_key_pair/my-key-pair.pem
```

## Bash Permissions

https://www.fullstackfoundations.com/courses/bash-course-for-complete-beginners/bash-permissions#setting-permissions

## Connectiong to EC2 Instance

https://repost.aws/knowledge-center/ec2-linux-connection-options

Method 1: Use a terminal window

### EntryHost24v10 EC2 Instance (3.85.17.83)
```sh
ssh -i "/c/00-CodeShop/99-References/ssh_auth_keys/mosqtto-user.pem" ubuntu@ec2-3-85-17-83.compute-1.amazonaws.com
ssh -i "/c/00-CodeShop/99-References/ssh_auth_keys/efgarro24v10.pem" ubuntu@ec2-3-85-17-83.compute-1.amazonaws.com
ssh -i "/c/00-CodeShop/99-References/ssh_auth_keys/2024v10-entry-server.pem" ubuntu@ec2-3-85-17-83.compute-1.amazonaws.com
```

### Postgresql24v10 EC2 Instance (54-205-165-107)
```sh
ssh -i "/c/00-CodeShop/99-References/ssh_auth_keys/postgresql24v10.pem" ubuntu@ec2-54-205-165-107.compute-1.amazonaws.com

psql --host=54.205.165.107 --port=5432 --username=postgres --dbname=postgres

```


The \*.pem file has to be set-up before the instance is created.

## Vim Editor

https://coderwall.com/p/adv71w/basic-vim-commands-for-getting-started

## Upload Files to EC2 Instance

https://angus.readthedocs.io/en/2014/amazon/transfer-files-between-instance.html

```sh
scp -i /c/00-CodeShop/99-References/ssh_auth_keys/mosqtto-user.pem /c/00-CodeShop/99-References/ssh_auth_keys/efgarro24v10.pem  ubuntu@ec2-3-85-17-83.compute-1.amazonaws.com:~/data/
```

## Description of Linux File System Hierarchy

https://manpages.ubuntu.com/manpages/jammy/en/man7/hier.7.html

## Network Mapper

https://nmap.org/


