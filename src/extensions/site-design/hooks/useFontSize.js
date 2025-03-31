/* global siteDesign */
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
		const iframe = document.getElementsByName('editor-canvas')[ 0 ];
		if ( iframe ) {
			const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
			const targetElement = iframeDocument.querySelector('.editor-styles-wrapper');
			if ( targetElement ) {
				targetElement.style.setProperty( '--go--font-size', `${ baseFontSize }rem` );
			}
		} else {
			const editor = document.getElementsByClassName( siteDesign.editorClass )[ 0 ];
			if ( editor ) {
				editor.style.setProperty( '--go--font-size', `${ baseFontSize }rem` );
			}
		}
	}, [ baseFontSize ] );

	return [ baseFontSize, designFontSize ];
}

export default useFontSize;
