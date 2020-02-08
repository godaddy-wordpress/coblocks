#! /bin/bash

sudo apt-get update
sudo apt-get install subversion mysql-client-5.7
sudo -E docker-php-ext-install mysqli
sudo sh -c "printf '\ndeb http://ftp.us.debian.org/debian sid main\n' >> /etc/apt/sources.list"

.dev/bin/install-wp-tests.sh wordpress_test root '' 127.0.0.1 latest
