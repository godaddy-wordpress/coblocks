/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useAsyncList } from '@wordpress/compose';
import { Button, Spinner } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Render the layout previews into columns.
 */
export const LayoutSelectorResults = ( { layouts, category, onInsert } ) => {
	const getEntityRecord = useSelect( ( select ) => select( 'core' ).getEntityRecord, [] );

	const imageCategory = getEntityRecord( 'root', 'site' )?.image_category || '';

	const filteredLayouts = useMemo(
		() => layouts
			.filter( ( layout ) => layout.category === category && !! layout.parsedBlocks?.length )
			.map( ( layout ) => ( {
				...layout,
				/**
				 * Filters the list of blocks within the layout preview.
				 *
				 * @param {Array} blocks The block objects of the layout.
				 */
				blocks: applyFilters( 'coblocks.layoutPreviewBlocks', layout.parsedBlocks ),
			} ) ),
		[ JSON.stringify( layouts ), category, imageCategory ]
	);

	// Needed to render our list of previews asynchronously for better performance.
	const currentShowLayouts = useAsyncList( filteredLayouts );

	return category && !! filteredLayouts.length
		? (
			<div className="coblocks-layout-selector__layouts">
				<LayoutPreviewList
					layouts={ filteredLayouts }
					shownLayouts={ currentShowLayouts }
					onClickLayout={ onInsert }
				/>
			</div>
		)
		: ( <p><em>{ __( 'No layouts are available for this category.', 'coblocks' ) }</em></p> );
};

/**
 * Renders the layout's block preview.
 */
export const LayoutPreview = ( { layout, onClick } ) => {
	return (
		<Button
			className={ classnames( 'coblocks-layout-selector__layout' ) }
			onClick={ () => onClick( layout ) }>

			<Spinner />

			<BlockPreview blocks={ layout.blocks } viewportWidth={ 700 } />
		</Button>
	);
};

/**
 * Renders the layout's loading placeholder.
 */
export const LayoutPreviewPlaceholder = () => {
	return (
		<div className="coblocks-layout-selector__layout is-placeholder">
			<Spinner />
		</div>
	);
};

/**
 * Renders a list of previews for the layouts passed. Placeholders rendered
 * for components not yet loaded async via `shownLayouts`.
 */
export const LayoutPreviewList = ( { layouts, shownLayouts, onClickLayout } ) => {
	return layouts.map( ( layout, index ) => {
		const isShown = shownLayouts.includes( layout );
		return isShown
			? (
				<LayoutPreview
					key={ index }
					layout={ layout }
					onClick={ onClickLayout }
				/>
			)
			: (
				<LayoutPreviewPlaceholder key={ index } />
			);
	} );
};
