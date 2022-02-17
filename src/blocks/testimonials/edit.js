/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import Controls from './controls';
import GutterWrapper from './../../components/gutter-control/gutter-wrapper';
import Inspector from './inspector';
import { blockStyles, getActiveStyle } from './utils';

const Edit = ( props ) => {
	const {
		attributes,
		clientId,
		isSelected,
		setAttributes,
	} = props;

	const { columns } = attributes;

	const blockProps = useBlockProps( { className: classnames( {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
	} ) } );

	const {
		backgroundColor,
		color,
	} = blockProps.style;

	// We descend these specific styles to testimonial and keep all others.
	delete blockProps.style.color;
	delete blockProps.style.backgroundColor;

	const { insertBlock, updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	useEffect( () => {
		const testimonialBlocksCount = innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/testimonial' ), 0 );

		if ( testimonialBlocksCount < columns ) {
			insertBlock(
				createBlock( 'coblocks/testimonial', {
					backgroundColor,
					color,
					showImage: attributes.showImages,
					showRole: attributes.showRoles,
					styleName: getActiveStyle( blockStyles, blockProps.className ),
				} ),
				innerBlocks.length,
				clientId,
				false
			);
		}
	}, [ columns, innerBlocks ] );

	useEffect( () => {
		updateInnerAttributes( 'coblocks/testimonial', { color } );
	}, [ color ] );

	useEffect( () => {
		updateInnerAttributes( 'coblocks/testimonial', { backgroundColor } );
	}, [ backgroundColor ] );

	useEffect( () => {
		updateInnerAttributes( 'coblocks/testimonial', { styleName: getActiveStyle( blockStyles, blockProps.className ) } );
	}, [ blockProps.className ] );

	// Remove classes related to colors as we don't want to apply them on the main block.
	const sanitizedClasses = ( receivedClasses ) => {
		const classesArray = receivedClasses.split( ' ' );
		return classesArray.filter( ( classe ) => ! classe.match( new RegExp( 'has-', 'g' ) ) || classe.match( new RegExp( 'font-size', 'g' ) ) );
	};

	const classes = classnames( sanitizedClasses( blockProps.className ), {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
	} );

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		innerBlocks.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	const onChangeHeadingLevel = ( headingLevel ) => {
		setAttributes( { headingLevel } );
		updateInnerAttributes( 'coblocks/testimonial', { headingLevel } );
	};

	const toggleImages = () => {
		const showImages = ! attributes.showImages;
		setAttributes( { showImages } );
		updateInnerAttributes( 'coblocks/testimonial', { showImage: showImages } );
	};

	const toggleRoles = () => {
		const showRoles = ! attributes.showRoles;
		setAttributes( { showRoles } );
		updateInnerAttributes( 'coblocks/testimonial', { showRole: showRoles } );
	};

	const setColumns = ( value ) => {
		setAttributes( { columns: parseInt( value ) } );
	};

	return (
		<>
			{ isSelected && (
				<>
					<Controls
						{ ...props }
						onChangeHeadingLevel={ onChangeHeadingLevel }
					/>
					<Inspector
						{ ...props }
						attributes={ attributes }
						onSetColumns={ setColumns }
						onToggleImages={ toggleImages }
						onToggleRoles={ toggleRoles }
					/>
				</>
			) }
			<GutterWrapper { ...attributes }>
				<div { ...blockProps } className={ classes } >
					<InnerBlocks
						__experimentalCaptureToolbars={ true }
						allowedBlocks={ [ 'coblocks/testimonial' ] }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</GutterWrapper>
		</>
	);
};

export default Edit;
