sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"

test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile

brew install mailhog

mkdir /tmp/wordpress/wp-content/mu-plugins

# Setup the Mailhog MU plugin
cp /home/circleci/project/.dev/mailhog.php /tmp/wordpress/wp-content/mu-plugins/mailhog.php
