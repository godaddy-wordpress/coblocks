#! /bin/bash

sudo apt-get update && sudo apt-get install -y subversion default-mysql-client
sudo -E docker-php-ext-install mysqli

.dev/bin/install-wp-tests.sh wordpress_test root '' 127.0.0.1 latest
