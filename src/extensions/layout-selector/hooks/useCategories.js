/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

function useCategories( layouts ) {
	const categories = useSelect( ( select ) => select( 'coblocks/template-selector' ).getCategories(), [] );

	const getLayoutsInCategory = ( category ) => {
		return layouts.filter( ( layout ) => layout.category === category ) || [];
	};

	const hasLayoutsInCategory = ( category ) => {
		return !! getLayoutsInCategory( category ).length;
	};

	return useMemo(
		() => categories.filter( ( category ) => hasLayoutsInCategory( category.slug ) ),
		[ JSON.stringify( layouts ) ]
	);
}

export default useCategories;
