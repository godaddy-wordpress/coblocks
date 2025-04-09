/* global siteDesign */
import STORE_KEY from '../data/constants';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

function useTypeRatio() {
	/* istanbul ignore next */
	const typeRatio = useSelect( ( select ) => select( STORE_KEY ).getTypeRatio(), [] );
	/* istanbul ignore next */
	const designStyleObj = useSelect( ( select ) => select( STORE_KEY ).getDesignStyleObj(), [] );
	const designTypeRatio = designStyleObj?.type_ratio;

	useEffect( () => {
		if ( ! typeRatio ) {
			return;
		}
		const editor = document.getElementsByClassName( siteDesign.editorClass )[ 0 ];
		if ( editor ) {
			editor.style.setProperty( '--go--type-ratio', typeRatio );
		}
	}, [ typeRatio ] );

	return [ typeRatio, designTypeRatio ];
}

export default useTypeRatio;
