/**
 * Styles
 */
import './styles/style.scss';

/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

// Add default for reset, until WordPress 5.3 is released.
registerBlockStyle( 'core/image', {
	name: 'default',
	label: _x( 'Default', 'block style', 'coblocks' ),
	isDefault: true,
} );

registerBlockStyle( 'core/image', {
	name: 'bottom-wave',
	label: _x( 'Bottom Wave', 'block style', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/image', {
	name: 'top-wave',
	label: _x( 'Top Wave', 'block style', 'coblocks' ),
	isDefault: false,
} );
