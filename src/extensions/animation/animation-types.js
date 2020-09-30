import { __ } from '@wordpress/i18n';

export const animationTypes = [
	{
		className: 'fadeIn',
		label: __( 'Fade in', 'coblocks' ),
	},
	{
		className: 'scaleIn',
		label: __( 'Scale in', 'coblocks' ),
	},
	{
		className: 'slideInLeft',
		label: __( 'Slide in from left', 'coblocks' ),
	},
	{
		className: 'slideInRight',
		label: __( 'Slide in from right', 'coblocks' ),
	},
	{
		className: 'slideInBottom',
		label: __( 'Slide in from the bottom', 'coblocks' ),
	},
	{
		className: 'clipHorizontal',
		label: __( 'Clip horizontally', 'coblocks' ),
	},
	{
		className: 'clipVertical',
		label: __( 'Clip vertically', 'coblocks' ),
	},
];
