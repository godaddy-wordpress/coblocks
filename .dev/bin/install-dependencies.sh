#! /bin/bash

sudo apt-get update && sudo apt-get install -y subversion default-mysql-client

.dev/bin/install-wp-tests.sh wordpress_test root '' 127.0.0.1 latest
