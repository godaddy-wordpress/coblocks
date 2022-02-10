/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import Controls from './controls';
import Inspector from './inspector';

const ALLOWED_BLOCKS = [ 'coblocks/testimonial' ];
const AVAILABLE_STYLES = [ 'tall', 'conversation', 'horizontal' ];

const Edit = ( props ) => {
	const {
		attributes,
		clientId,
		isSelected,
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const {
		backgroundColor,
		color,
		fontSize,
	} = blockProps.style;

	const {
		className,
		columns,
		gutter,
	} = attributes;

	const { insertBlock, updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	useEffect( () => {
		const testimonialBlocksCount = innerBlocks.reduce( ( acc, cur ) => acc + ( cur.name === 'coblocks/testimonial' ), 0 );

		if ( testimonialBlocksCount < columns ) {
			insertBlock(
				createBlock( 'coblocks/testimonial', {
					showImage: attributes.showImages,
					showRole: attributes.showRoles,
					styleName: getStyleNameFromClassName(),
				} ),
				innerBlocks.length,
				clientId,
				false
			);
		}
	}, [ columns, innerBlocks ] );

	useEffect( () => {
		updateInnerAttributes( 'coblocks/testimonial', {
			backgroundColor,
			color,
			styleName: getStyleNameFromClassName(),
		} );
	}, [ backgroundColor, color, className ] );

	const getStyleNameFromClassName = () => {
		const styleName = className?.substring( className?.lastIndexOf( '-' ) + 1 );

		return AVAILABLE_STYLES.includes( styleName )
			? styleName
			: AVAILABLE_STYLES[ 0 ];
	};

	// Remove classes related to colors as we don't want to apply them on the main block.
	const sanitizedClasses = ( receivedClasses ) => {
		const classesArray = receivedClasses.split( ' ' );
		return classesArray.filter( ( classe ) => ! classe.match( new RegExp( 'has-', 'g' ) ) || classe.match( new RegExp( 'font-size', 'g' ) ) );
	};

	const classes = classnames( sanitizedClasses( blockProps.className ), {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
		[ `has-${ gutter }-gutter` ]: gutter,
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

	const setGutter = ( value ) => {
		setAttributes( { gutter: value } );
	};

	const styles = {
		fontSize,
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
						onSetGutter={ setGutter }
						onToggleImages={ toggleImages }
						onToggleRoles={ toggleRoles }
					/>
				</>
			) }
			<div
				{ ...blockProps }
				className={ classes }
				style={ styles }>
				<InnerBlocks
					__experimentalCaptureToolbars={ true }
					allowedBlocks={ ALLOWED_BLOCKS }
					templateInsertUpdatesSelection={ false }
				/>
			</div>
		</>
	);
};

export default Edit;
