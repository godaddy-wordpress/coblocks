#! /bin/bash

# Checkout Coblocks from WordPress.org
svn co "http://svn.wp-plugins.org/coblocks" $HOME/coblocks

# Clean /trunk/ and copy over plugin files
rm -rf $HOME/coblocks/trunk/*
cp -a build/coblocks/* $HOME/coblocks/trunk/

# Create the tag on the SVN repo and copy over plugin files
svn cp $HOME/coblocks/trunk $HOME/coblocks/tags/${CIRCLE_TAG}
svn commit -m "Tagging version ${CIRCLE_TAG}"

# Copy the WordPress.org assets over
rm -rf $HOME/coblocks/assets/*
cp -a .wordpress-org/* $HOME/coblocks/assets/

# Deploy Coblocks to WordPress.org
cd $HOME/coblocks
svn add * --force
# Delete removed files
svn status | grep '^!' | awk '{print $2}' | xargs svn delete
svn ci --no-auth-cache --username ${WP_ORG_USERNAME} --password ${WP_ORG_PASSWORD} -m "Deploy new version of CoBlocks"

CHANGELOG=$(sed -n -e '/== Changelog ==/,$p' $HOME/project/readme.txt | tail -n +3)

# Deploy a Coblocks Github release
ghr -t ${GH_AUTH_TOKEN} -u ${CIRCLE_PROJECT_USERNAME} -r ${CIRCLE_PROJECT_REPONAME} -c ${CIRCLE_SHA1} -b "${CHANGELOG}" -delete ${CIRCLE_TAG} /tmp/artifacts
