/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

import './style.scss';

// Register custom styles for the core list block.
registerBlockStyle( 'core/button', {
	name: 'circular',
	/* translators: block style */
	label: __( 'Circular', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: '3d',
	/* translators: block style */
	label: __( '3D', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/button', {
	name: 'shadow',
	/* translators: block style */
	label: __( 'Shadow', 'coblocks' ),
	isDefault: false,
} );
