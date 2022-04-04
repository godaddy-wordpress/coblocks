/* global coblocksBlockData */

import STORE_KEY from '../data/constants';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

function useFontSize() {
	/* istanbul ignore next */
	const fontSize = useSelect( ( select ) => select( STORE_KEY ).getFontSize(), [] );
	const baseFontSize = Number( fontSize?.replace( 'rem', '' ) );

	/* istanbul ignore next */
	const designStyleObj = useSelect( ( select ) => select( STORE_KEY ).getDesignStyleObj(), [] );
	const designFontSize = Number( designStyleObj?.font_size?.replace( 'rem', '' ) );

	useEffect( () => {
		if ( ! baseFontSize ) {
			return;
		}
		document.getElementsByClassName( coblocksBlockData.siteDesign.editorClass )[ 0 ].style.setProperty( '--go--font-size', `${ baseFontSize }rem` );
	}, [ baseFontSize ] );

	return [ baseFontSize, designFontSize ];
}

export default useFontSize;
