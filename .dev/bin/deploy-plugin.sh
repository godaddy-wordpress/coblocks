#! /bin/bash

svn co "http://svn.wp-plugins.org/coblocks" $HOME/coblocks

# Clean trunk and copy over new files
rm -rf $HOME/coblocks/trunk/*
cp -a build/coblocks/* $HOME/coblocks/trunk/

# Deploy the plugin
cd $HOME/coblocks
svn ci --no-auth-cache --username $WP_ORG_USERNAME --password $WP_ORG_PASSWORD -m "Deploy new version of Coblocks"
