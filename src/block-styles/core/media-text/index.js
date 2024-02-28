/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

import './style.scss';

registerBlockStyle( 'core/media-text', {
	name: 'default',
	/* translators: block style */
	label: __( 'Default', 'coblocks' ),
	isDefault: true,
} );

registerBlockStyle( 'core/media-text', {
	name: 'card',
	/* translators: block style */
	label: __( 'Card', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/media-text', {
	name: 'overlap',
	/* translators: block style */
	label: __( 'Overlap', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/media-text', {
	name: 'outline',
	/* translators: block style */
	label: __( 'Outline', 'coblocks' ),
	isDefault: false,
} );
