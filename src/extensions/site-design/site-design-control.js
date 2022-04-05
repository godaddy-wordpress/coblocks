/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksLabsToggleControl from '../coblocks-labs/coblocks-labs-toggle-control';
import SiteDesignImage from '../../../assets/coblocks-labs/site-design.png';
// import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from './constants';

registerPlugin( 'coblocks-site-design-control', {
	render: () => (
		<CoBlocksLabsToggleControl
			description={ __( 'Easily explore curated design styles, then customize your colors and fonts inside the editor to get the perfect fit.', 'coblocks' ) }
			help={ __( 'This feature requires the Go Theme', 'coblocks' ) }
			imageAlt={ __( 'Site design example', 'coblocks' ) }
			// settingsKey={ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY }
			imageSrc={ SiteDesignImage }
			label={ __( 'Site Design', 'coblocks' ) }
		/>
	),
} );

