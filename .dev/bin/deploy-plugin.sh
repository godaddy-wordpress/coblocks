#! /bin/bash

# Checkout Coblocks from WordPress.org
svn co "http://svn.wp-plugins.org/coblocks" $HOME/coblocks

# Clean /trunk/ and copy over plugin files
rm -rf $HOME/coblocks/trunk/*
cp -a build/coblocks/* $HOME/coblocks/trunk/

# Copy the WordPress.org assets over
rm -rf $HOME/coblocks/assets/*
cp -a .wordpress-org/* $HOME/coblocks/assets/

# Deploy Coblocks to WordPress.org
cd $HOME/coblocks
svn add * --force
svn ci --no-auth-cache --username ${WP_ORG_USERNAME} --password ${WP_ORG_PASSWORD} -m "Deploy new version of Coblocks"

# Deploy a Coblocks Github release
ghr -t ${GH_ACCESS_TOKEN} -u ${CIRCLE_PROJECT_USERNAME} -r ${CIRCLE_PROJECT_REPONAME} -c ${CIRCLE_SHA1} -delete ${CIRCLE_TAG} /tmp/artifacts
