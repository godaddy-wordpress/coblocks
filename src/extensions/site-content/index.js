/**
 * External dependencies
 */
import { ContentIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Local dependencies
 */
import { PLUGIN_NAME, SIDEBAR_NAME } from './constant';

export const CoBlocksSiteContent = ( props ) => {
	return null;
};

/* istanbul ignore next */
registerPlugin( PLUGIN_NAME, {
	icon,
	render: null,
} );
