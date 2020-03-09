#!/usr/bin/env bash

if [ $# -lt 3 ]; then
	echo "usage: $0 <specs> <db-user> <db-pass> [db-host] [wordpress-version]"
	exit 1
fi

SPECS=$1
DB_USER=$2
DB_PASS=$3
DB_HOST=${4-localhost}
WP_VERSION=${5-latest}

# Build the plugin files
echo "Building CoBlocks..."
npm run build &> /dev/null
npx grunt clean:build copy:build &> /dev/null

# Setup WordPress
DB_NAME="e2e_wordpress_$WP_VERSION"
WP_CLI="./vendor/bin/wp --path=wordpress_$WP_VERSION"
rm -rf wordpress_$WP_VERSION
mkdir -p wordpress_$WP_VERSION
$WP_CLI core download --version=$WP_VERSION

$WP_CLI config create --dbhost=$DB_HOST --dbname=$DB_NAME --dbuser=$DB_USER --dbpass=$DB_PASS
$WP_CLI db drop --yes
$WP_CLI db create
$WP_CLI core install --url="http://localhost:8080" --title="CoBlocks" --admin_user="admin" --admin_password="password" --admin_email="test@admin.com" --skip-email
$WP_CLI site empty --uploads --yes
(curl -N http://loripsum.net/api/5 | $WP_CLI post generate --post_content --count=25) &> /dev/null

echo "Activating CoBlocks."
cp -r build/coblocks wordpress_$WP_VERSION/wp-content/plugins/coblocks
$WP_CLI plugin activate coblocks

echo "Downloading and activating the Gutenberg Starter Theme."
git clone https://github.com/WordPress/gutenberg-starter-theme.git wordpress_$WP_VERSION/wp-content/themes/gutenberg-starter-theme &> /dev/null
$WP_CLI theme activate gutenberg-starter-theme

# $WP_CLI theme install go --activate
# $WP_CLI plugin install gutenberg --activate

echo "Starting the WP-CLI server."
$WP_CLI server --host=0.0.0.0 --port=8080 --allow-root &> /dev/null &

if [ "$SPECS" = "open" ]; then
	echo "Opening Cypress..."
	npx cypress open --env testURL='http://localhost:8080' --config video=false,screenshotsFolder="cypress/wordpress_$WP_VERSION/screenshots",videosFolder="cypress/wordpress_$WP_VERSION/videos"
elif [ -n "$SPECS" ]; then
	echo "Running defined specs..."
	npm run test-e2e -- --spec $SPECS --env testURL='http://localhost:8080' --config video=false,screenshotsFolder="cypress/wordpress_$WP_VERSION/screenshots",videosFolder="cypress/wordpress_$WP_VERSION/videos"
else
	echo "Running all specs..."
	npm run test-e2e -- --env testURL='http://localhost:8080' --config video=false,screenshotsFolder="cypress/wordpress_$WP_VERSION/screenshots",videosFolder="cypress/wordpress_$WP_VERSION/videos"
fi

# Kill the webserver
echo "Shutting down the WP-CLI server."
kill $(ps aux | grep wp-cli | awk '{print $2}')
