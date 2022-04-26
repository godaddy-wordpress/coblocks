/* global coblocksLabs */
/**
  External dependencies
 */
import { ColorPaletteStyles } from '@godaddy-wordpress/coblocks-icons';
const icon = ColorPaletteStyles?.outlined;

/**
  WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { useEntityProp } from '@wordpress/core-data';
import { compose, ifCondition } from '@wordpress/compose';

/**
  Internal dependencies
 */
import SiteDesignComponent from './component';
import { PLUGIN_NAME, SITE_DESIGN_FEATURE_ENABLED_KEY } from './constant';

/* istanbul ignore next */
registerPlugin( PLUGIN_NAME, {
	icon,
	render: compose( [
		ifCondition( () => {
			const [ siteDesignEnabled ] = useEntityProp( 'root', 'site', SITE_DESIGN_FEATURE_ENABLED_KEY );
			const isLabsEnabled = !! coblocksLabs?.isLabsEnabled;
			return siteDesignEnabled && isLabsEnabled;
		} ),
	] )( SiteDesignComponent ),
} );
