/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksLabsToggleControl from '../coblocks-labs/coblocks-labs-toggle-control';
import { SITE_DESIGN_FEATURE_ENABLED_KEY } from './constant.js';
import SiteDesignImage from '../../../assets/coblocks-labs/site-design.png';

registerPlugin( 'coblocks-site-design-control', {
	render: () => (
		<CoBlocksLabsToggleControl
			conditionalDisable={ true }
			description={ __( 'Easily explore curated design styles, then customize your colors and fonts inside the editor to get the perfect fit.', 'coblocks' ) }
			imageAlt={ __( 'Site design example', 'coblocks' ) }
			imageSrc={ SiteDesignImage }
			label={ __( 'Site Design', 'coblocks' ) }
			settingsKey={ SITE_DESIGN_FEATURE_ENABLED_KEY }
			showGoHelp={ true }
		/>
	),
} );

