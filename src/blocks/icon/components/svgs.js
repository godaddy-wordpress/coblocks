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
	// circle_remove : _x( 'add minus circle insert plus round math', 'icon search tags' ),
	// data_usage : _x( 'stats round circle pie chart graph', 'icon search tags' ),
	// emoticon : _x( 'happy emotion emoticon smile fun joy', 'icon search tags' ),
	// functions : _x( 'code greek math', 'icon search tags' ),
	// gesture : _x( 'drawing doodle art creative type font pencil marker', 'icon search tags' ),
	// heart : _x( 'love shape valentine kiss', 'icon search tags' ),
	// scatter_plot : _x( 'stats round circle pie chart graph dots data', 'icon search tags' ),
	// desktop_mac : _x( 'computer apple montior device pc desk office', 'icon search tags' ),
	// device_hub : _x( 'usb connect hub social', 'icon search tags' ),
	// drafts : _x( 'email mail os read letter', 'icon search tags' ),
	// keyboard_voice : _x( 'microphone podcast computer device', 'icon search tags' ),
	// laptop_mac : _x( 'computer apple montior device pc desk office', 'icon search tags' ),
	// signal : _x( 'wifi radio waves', 'icon search tags' ),
	// tablet_mac : _x( 'computer ipad surface apple montior device pc desk office', 'icon search tags' ),
	// widgets : _x( 'blocks block square build foundation', 'icon search tags' ),
};

Object.entries( materialIcons ).filter( function( item ) {
	if ( item[0].includes( 'outline' ) ) {
		svgs.outlined[ item[0].replace( '_outline', '' ) ] = {
			icon: item[1],
			keywords : keywords[ item[0].replace( '_outline', '' ) ],
		}
	} else {
		svgs.filled[ item[0] ] = {
			icon: item[1],
			keywords : keywords[ item[0] ],
		}
	}
});

export default svgs;
