### PostgreSQL Installation

https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04#:~:text=When%20you%20install%20PostgreSQL%20a,interact%20with%20the%20database%20engine.

```sh

# update packages
sudo apt update

sudo apt install wget ca-certificates

psql -V

sudo systemctl status postgresql

# psql as postgres user
sudo -u postgres psql
# change to postgres user
sudo -i -u postgres
```