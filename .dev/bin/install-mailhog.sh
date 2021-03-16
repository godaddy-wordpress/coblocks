sudo apt-get -y install golang-go
go get github.com/mailhog/MailHog

alias MailHog="~/go/bin/MailHog"

mkdir /tmp/wordpress/wp-content/mu-plugins

# Setup the Mailhog MU plugin
cp /home/circleci/project/.dev/mailhog.php /tmp/wordpress/wp-content/mu-plugins/mailhog.php
