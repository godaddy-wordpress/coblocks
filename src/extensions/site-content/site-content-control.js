/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksLabsToggleControl from '../coblocks-labs/coblocks-labs-toggle-control';
import { SITE_CONTENT_FEATURE_ENABLED_KEY } from './constant';
import SiteContentImage from '../../../assets/coblocks-labs/site-content.png';

registerPlugin( 'coblocks-site-content-control', {
	render: () => (
		<CoBlocksLabsToggleControl
			description={ __( 'Quickly and easily manage your websites pages and posts from inside the editor.', 'coblocks' ) }
			imageAlt={ __( 'Site content example', 'coblocks' ) }
			imageSrc={ SiteContentImage }
			label={ __( 'Site Content', 'coblocks' ) }
			settingsKey={ SITE_CONTENT_FEATURE_ENABLED_KEY }
		/>
	),
} );

