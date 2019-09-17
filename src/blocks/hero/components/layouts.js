/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import icons from './icons';

export const layoutOptions = [
	{ value: 'top-left', label: __( 'Top Left' ), icon: icons.colOne },
	{ value: 'top-center', label: __( 'Top Center' ), icon: icons.colTwo },
	{ value: 'top-right', label: __( 'Top Right' ), icon: icons.colThree },
	{ value: 'center-left', label: __( 'Center Left' ), icon: icons.colFour },
	{ value: 'center-center', label: __( 'Center Center' ), icon: icons.colOne },
	{ value: 'center-right', label: __( 'Center Right' ), icon: icons.colTwo },
	{ value: 'bottom-left', label: __( 'Bottom Left' ), icon: icons.colThree },
	{ value: 'bottom-center', label: __( 'Bottom Center' ), icon: icons.colFour },
	{ value: 'bottom-right', label: __( 'Bottom Right' ), icon: icons.colOne },
];
