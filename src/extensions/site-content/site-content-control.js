/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksLabsToggleControl from '../coblocks-labs/coblocks-labs-toggle-control';
import SiteContentImage from '../../../assets/coblocks-labs/site-content.png';
// import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from './constants';

registerPlugin( 'coblocks-site-content-control', {
	render: () => (
		<CoBlocksLabsToggleControl
			description={ __( 'Quickly and easily manage your websites pages and posts from inside the editor.', 'coblocks' ) }
			help={ __( 'This feature requires the Go Theme', 'coblocks' ) }
			imageAlt={ __( 'Site content example', 'coblocks' ) }
			imageSrc={ SiteContentImage }
			label={ __( 'Site Content', 'coblocks' ) }
			// settingsKey={ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY }
		/>
	),
} );

