/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './styles/style.scss';

// Default list style for reset.
registerBlockStyle( 'core/list', {
	name: 'default',
	label: _x( 'Default', 'block styles', 'coblocks' ),
	isDefault: true,
} );

registerBlockStyle( 'core/list', {
	name: 'none',
	label: _x( 'None', 'block styles', 'coblocks' ),
	isDefault: false,
} );

registerBlockStyle( 'core/list', {
	name: 'checkbox',
	label: _x( 'Checkbox', 'block styles', 'coblocks' ),
	isDefault: false,
} );

