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
	circle_add : __( 'add minus circle insert plus round math' ),
	circle_remove : 'add minus circle insert plus round math',
	data_usage : 'stats round circle pie chart graph',
	emoticon : 'happy emotion emoticon smile fun joy',
	functions : 'code greek math',
	gesture : 'drawing doodle art creative type font pencil marker',
	heart : 'love shape valentine kiss',
	scatter_plot : 'stats round circle pie chart graph dots data',
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
