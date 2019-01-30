
import materialIcons from './material';

/**
 * Custom icons
 */
const icons = { outlined: {}, filled: {} };

const keywords = {
	heart : 'plus add circle insert',
	add_circle : 'plus add circle insert',
	remove_circle : 'plus add circle insert',
	gesture : 'plus add circle insert',
	flag : 'plus add circle insert',
};

Object.entries( materialIcons ).filter(function( item ){
	if( item[0].includes( 'outline' ) ){
		icons.outlined[ item[0].replace( '_outline', '' ) ] = {
			icon: item[1],
			keywords : keywords[ item[0] ],
		}
	}else{
		icons.filled[ item[0] ] = {
			icon: item[1],
			keywords : keywords[ item[0] ],
		}
	}
});

export default icons;
