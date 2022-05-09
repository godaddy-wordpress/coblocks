/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import CoBlocksLabsToggleControl from '../coblocks-labs/coblocks-labs-toggle-control';
import { LAYOUT_SELECTOR_FEATURE_ENABLED_KEY } from './constants';
import layoutSelectorExample from '../../../assets/coblocks-labs/layout-selector.png';

registerPlugin( 'coblocks-labs-layout-selector-control', {
	render: () => (
		<CoBlocksLabsToggleControl
			conditionalDisable={ true }
			description={ __( 'Get access to high-quality, professionally designed layouts when creating new pages to make page creation easier.', 'coblocks' ) }
			imageAlt={ __( 'Layout selector example', 'coblocks' ) }
			imageSrc={ layoutSelectorExample }
			label={ __( 'Layout Selector', 'coblocks' ) }
			settingsKey={ LAYOUT_SELECTOR_FEATURE_ENABLED_KEY }
			showGoHelp={ true }
		/>
	),
} );

