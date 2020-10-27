/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import { useAsyncList } from '@wordpress/compose';
import { Button, Spinner } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';

export const LayoutSelectorResults = ( { layouts, category, onInsert } ) => {
	const filteredLayouts = useMemo(
		() => layouts.filter( ( layout ) => layout.category === category ),
		[ layouts, category ]
	);

	const currentShowLayouts = useAsyncList( filteredLayouts );

	const chunkedLayoutsList = [ [], [] ];
	filteredLayouts.forEach( ( layout, index ) => chunkedLayoutsList[ index % 2 ].push( layout ) );

	return category && !! filteredLayouts.length
		? (
			<div className="coblocks-layout-selector__layouts">
				{ chunkedLayoutsList.map(
					( theLayouts, columnIndex ) => (
						<div key={ columnIndex } className="coblocks-layout-selector__layouts-column">
							<LayoutPreviewList
								layouts={ theLayouts }
								shownLayouts={ currentShowLayouts }
								onClickLayout={ onInsert }
							/>
						</div>
					)
				) }
			</div>
		)
		: ( <p><em>{ __( 'No layouts are available for this category.', 'coblocks' ) }</em></p> );
};

export const LayoutPreview = ( { layout, onClick } ) => {
	const [ overlay, setOverlay ] = useState( false );
	const isSelected = false;

	return (
		<a href="#!"
			className={ classnames( 'coblocks-layout-selector__layout', { 'is-selected': isSelected } ) }
			onClick={ ( event ) => {
				event.preventDefault();
				onClick( layout );
			} }
			onMouseEnter={ () => setOverlay( true ) }
			onMouseLeave={ () => setOverlay( false ) }>

			<div className={ classnames( 'coblocks-layout-selector__layout--overlay', { 'is-active': overlay } ) }>
				<Button isPressed>
					{ __( 'Select Layout', 'coblocks' ) }
				</Button>
			</div>

			<BlockPreview blocks={ layout.blocks } viewportWidth={ 700 } />
		</a>
	);
};

const LayoutPreviewPlaceholder = () => {
	return (
		<div className="coblocks-layout-selector__layout is-placeholder">
			<Spinner />
		</div>
	);
};

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
