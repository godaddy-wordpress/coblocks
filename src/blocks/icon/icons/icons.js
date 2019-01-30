/**
 * Internal dependencies
 */
import materialIcons from './material';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Generate icons from material.js
 */
const icons = { outlined: {}, filled: {} };

const keywords = {
	circle_add : _x( 'add minus circle insert plus round math', 'icon search tags' ),
	circle_remove : _x( 'add minus circle insert plus round math', 'icon search tags' ),
	data_usage : _x( 'stats round circle pie chart graph', 'icon search tags' ),
	emoticon : _x( 'happy emotion emoticon smile fun joy', 'icon search tags' ),
	functions : _x( 'code greek math', 'icon search tags' ),
	gesture : _x( 'drawing doodle art creative type font pencil marker', 'icon search tags' ),
	heart : _x( 'love shape valentine kiss', 'icon search tags' ),
	scatter_plot : _x( 'stats round circle pie chart graph dots data', 'icon search tags' ),
};

Object.entries( materialIcons ).filter(function( item ){
	if( item[0].includes( 'outline' ) ){
		icons.outlined[ item[0].replace( '_outline', '' ) ] = {
			icon: item[1],
			keywords : keywords[ item[0].replace( '_outline', '' ) ],
		}
	}else{
		icons.filled[ item[0] ] = {
			icon: item[1],
			keywords : keywords[ item[0] ],
		}
	}
});

export default icons;
