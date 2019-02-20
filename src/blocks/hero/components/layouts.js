/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import icons from './icons';

export const layoutOptions = {
	{ key: '50-50', name: __( '50/50' ), icon: icons.colOne, smallIcon: icons.colOne },
	{ key: '66-33', name: __( '66/33' ), icon: icons.colTwo, smallIcon: icons.colTwo },
	{ key: '33-66', name: __( '33/66' ), icon: icons.colThree, smallIcon: icons.colThree },
	{ key: '75-25', name: __( '75/25' ), icon: icons.colFour, smallIcon: icons.colFour },
	{ key: '25-75', name: __( '25/75' ), icon: icons.colTwo, smallIcon: icons.colTwo },
	{ key: '33-33-33', name: __( '33/33/33' ), icon: icons.colThree, smallIcon: icons.colThree },
};