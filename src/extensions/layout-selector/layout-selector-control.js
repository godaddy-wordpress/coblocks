/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksLabsToggleControl from '../coblocks-labs/coblocks-labs-toggle-control';
import LayoutSelectorExample from '../../../assets/coblocks-labs/layout-selector.png';
// import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from './constants';

registerPlugin( 'coblocks-labs-layout-selector-control', {
	render: () => (
		<CoBlocksLabsToggleControl
			description={ __( 'Get access to high-quality, professionally designed layouts when creating new pages to make page creation easier.', 'coblocks' ) }
			help={ __( 'This feature requires the Go Theme', 'coblocks' ) }
			imageAlt={ __( 'Layout selector example', 'coblocks' ) }
			// settingsKey={ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY }
			imageSrc={ LayoutSelectorExample }
			label={ __( 'Layout Selector', 'coblocks' ) }
		/>
	),
} );

