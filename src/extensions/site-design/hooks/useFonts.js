/* global coblocksBlockData */

import STORE_KEY from '../data/constants';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

function useFonts() {
	const fonts = useSelect( ( select ) => select( STORE_KEY ).getFonts(), [] );
	const currentFonts = useSelect( ( select ) => select( STORE_KEY ).getSelectedFonts(), [] );

	useEffect( () => {
		if ( ! currentFonts ) {
			return;
		}

		const [ fontHeadingName, fontHeadingWeights ] = currentFonts[ 0 ];
		const [ fontBodyName, fontBodyWeights ] = currentFonts[ 1 ];

		const editor = document.getElementsByClassName( coblocksBlockData.siteDesign.editorClass )[ 0 ];

		if ( ! editor ) {
			return;
		}

		editor.style.setProperty( '--go-heading--font-family', fontHeadingName );
		editor.style.setProperty( '--go-heading--font-weight', fontHeadingWeights[ 0 ] );
		editor.style.setProperty( '--go--font-family', fontBodyName );
		editor.style.setProperty( '--go--font-weight', fontBodyWeights[ 0 ] );
	}, [ currentFonts ] );

	return [ fonts, currentFonts ];
}

export default useFonts;
