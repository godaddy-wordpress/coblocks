/**
 * Internal dependencies
 */
import materialIcons from './material-icons';

/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;

/**
 * Generate icons from material.js
 */
const svgs = {
	outlined: {},
	filled: {},
};

const keywords = {
	circle_add : {
		label: _x( 'Add Circle', 'icon label' ),
		keywords: _x( 'add minus circle insert plus round math', 'icon search tags' ),
	},
	circle_remove : {
		label: _x( 'Minus Circle', 'icon label' ),
		keywords: _x( 'add minus circle insert plus round math', 'icon search tags' ),
	},
	data_usage : {
		label: _x( 'Pie Chart', 'icon label' ),
		keywords: _x( 'stats round circle pie chart graph', 'icon search tags' ),
	},
	emoticon : {
		label: _x( 'Emoticon', 'icon label' ),
		keywords: _x( 'happy emotion emoticon smile fun joy', 'icon search tags' ),
	},
	functions : {
		label: _x( 'Functions', 'icon label' ),
		keywords: _x( 'code greek math', 'icon search tags' ),
	},
	gesture : {
		label: _x( 'Doodle', 'icon label' ),
		keywords: _x( 'drawing doodle art creative type font pencil marker', 'icon search tags' ),
	},
	heart : {
		label: _x( 'Heart', 'icon label' ),
		keywords: _x( 'love shape valentine kiss', 'icon search tags' ),
	},
	scatter_plot : {
		label: _x( 'Scatter Plot', 'icon label' ),
		keywords: _x( 'stats round circle pie chart graph dots data', 'icon search tags' ),
	},
	desktop_mac : {
		label: _x( 'Desktop', 'icon label' ),
		keywords: _x( 'computer apple montior device pc desk office', 'icon search tags' ),
	},
	device_hub : {
		label: _x( 'Hub', 'icon label' ),
		keywords: _x( 'usb connect hub device social', 'icon search tags' ),
	},
	drafts : {
		label: _x( 'Email', 'icon label' ),
		keywords: _x( 'email mail os read letter', 'icon search tags' ),
	},
	keyboard_voice : {
		label: _x( 'Voice', 'icon label' ),
		keywords: _x( 'microphone podcast computer device', 'icon search tags' ),
	},
	laptop_mac : {
		label: _x( 'Laptop', 'icon label' ),
		keywords: _x( 'computer apple montior device pc desk office', 'icon search tags' ),
	},
	signal : {
		label: _x( 'Signal', 'icon label' ),
		keywords: _x( 'wifi radio waves', 'icon search tags' ),
	},
	tablet_mac : {
		label: _x( 'Tablet', 'icon label' ),
		keywords: _x( 'computer ipad surface apple montior device pc desk office', 'icon search tags' ),
	},
	widgets : {
		label: _x( 'Boxes', 'icon label' ),
		keywords: _x( 'blocks block box square build foundation', 'icon search tags' ),
	},
};

Object.entries( materialIcons ).filter( function( item ) {
	if ( item[0].includes( 'outline' ) ) {
		svgs.outlined[ item[0].replace( '_outline', '' ) ] = {
			icon: item[1],
			label : ( keywords[ item[0].replace( '_outline', '' ) ] ) ? keywords[ item[0].replace( '_outline', '' ) ].label : null,
			keywords : ( keywords[ item[0].replace( '_outline', '' ) ] ) ? keywords[ item[0].replace( '_outline', '' ) ].keywords : null,
		}
	} else {
		svgs.filled[ item[0] ] = {
			icon: item[1],
			label : ( keywords[ item[0] ] ) ? keywords[ item[0] ].label : null,
			keywords : ( keywords[ item[0] ] ) ? keywords[ item[0] ].keywords : null,
		}
	}
});

export default svgs;
