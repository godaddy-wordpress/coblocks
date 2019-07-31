#! /bin/bash

sudo apt-get update && sudo apt-get install subversion
sudo -E docker-php-ext-install mysqli
sudo sh -c "printf '\ndeb http://ftp.us.debian.org/debian sid main\n' >> /etc/apt/sources.list"
sudo apt-get update && sudo apt-get install mysql-client-5.7

composer global require "phpunit/phpunit=5.7.*"
composer global require wp-coding-standards/wpcs

phpcs --config-set installed_paths $HOME/.composer/vendor/wp-coding-standards/wpcs

.dev/bin/install-wp-tests.sh wordpress_test root '' 127.0.0.1 latest

cp -a $HOME/project /tmp/wordpress/wp-content/plugins/coblocks
