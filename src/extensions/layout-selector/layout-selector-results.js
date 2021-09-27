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
 *
 * @param {Object}   obj
 * @param {Object}   obj.layouts  Object containing layout information
 * @param {string}   obj.category String representing user chosen layout category
 * @param {Function} obj.onInsert Function that acts as callback when layout is clicked
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
 *
 * @param {Object}   obj
 * @param {string}   obj.layout  String representing layout choice
 * @param {Function} obj.onClick Callback function used to select the choice.
 */
export const LayoutPreview = ( { layout, onClick } ) => {
	const sanitizedBlocks = sanitizeBlocks( layout.blocks );

	return (
		<Button
			className={ classnames( 'coblocks-layout-selector__layout' ) }
			onClick={ () => onClick( layout ) }>

			<Spinner />

			<BlockPreview blocks={ sanitizedBlocks } viewportWidth={ 700 } />
		</Button>
	);
};

/**
 * Remove unwanted stuff from blocks displayed in preview
 * - Remove animations
 *
 * @param {Array} blocks Array of blocks
 * @return {Array} Sanitized version of the blocks
 */
export const sanitizeBlocks = ( blocks ) => {
	return blocks.map( ( block ) => {
		// Remove animation
		if ( block?.attributes?.animation ) {
			block.attributes.animation = '';
		}

		// Process innerBlocks, if any
		if ( block?.innerBlocks?.length > 0 ) {
			block.innerBlocks = sanitizeBlocks( block.innerBlocks );
		}

		return block;
	} );
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
 *
 * @param {Object}   obj
 * @param {Array}    obj.layouts       Array of layouts available
 * @param {Array}    obj.shownLayouts  Array of async filtered allowed layouts
 * @param {Function} obj.onClickLayout Function used as callback to select layout
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
