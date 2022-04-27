/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

// Add default for reset, until WordPress 5.3 is released.
registerBlockStyle( 'core/paragraph', {
	name: 'info',
	/* translators: block style */
	label: __( 'Info', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/paragraph', {
	name: 'success',
	/* translators: block style */
	label: __( 'Success', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/paragraph', {
	name: 'warning',
	/* translators: block style */
	label: __( 'Warning', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/paragraph', {
	name: 'error',
	/* translators: block style */
	label: __( 'Error', 'coblocks' ),
	isDefault: false,
} );
