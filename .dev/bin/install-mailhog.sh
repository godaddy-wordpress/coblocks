sudo apt-get -y install golang-go
go get github.com/mailhog/MailHog

touch ~/.bash_aliases
echo alias MailHog="~/go/bin/MailHog" > ~/.bash_aliases
source ~/.bashrc

mkdir /tmp/wordpress/wp-content/mu-plugins

# Setup the Mailhog MU plugin
cp /home/circleci/project/.dev/mailhog.php /tmp/wordpress/wp-content/mu-plugins/mailhog.php
