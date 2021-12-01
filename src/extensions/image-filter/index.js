/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import MediaFilterControl from '../../components/media-filter-control';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

const allowedBlocks = [
	'core/image',
	'core/gallery',
];

/**
 * Add the MediaFilterControl component and classnames to the core/image and core/gallery block
 * Add custom `has-filter-${ filter }` class to the extended blocks.
 */
const coreImageFilter = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name } = props;
		if ( ! allowedBlocks.includes( name ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />
				<BlockControls>
					<MediaFilterControl
						{ ...props }
					/>
				</BlockControls>
			</>
		);
	};
}, 'withGalleryExtension' );

addFilter( 'editor.BlockEdit', 'coblocks/coreImageFilter', coreImageFilter );

/**
 * Add custom `has-filter-${ filter }` class to the core/image block
 */
const coreImageEditorStyles = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { attributes, name } = props;
		if ( ! allowedBlocks.includes( name ) ) {
			return <BlockListBlock { ...props } />;
		}

		const {
			filter,
		} = attributes;

		const blockProps = {
			...props,
			attributes: {
				...attributes,
				className: classnames( {
					[ `has-filter-${ filter }` ]: filter !== 'none',
				} ),
			},
		};

		return <BlockListBlock { ...blockProps } />;
	};
}, 'withStyleClasses' );

addFilter( 'editor.BlockListBlock', 'coblocks/with-style-classes', coreImageEditorStyles );

/**
 * Add custom attribute to the core/image block
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
function imageFilterAttributes( settings ) {
	if ( allowedBlocks.includes( settings.name ) && typeof settings.attributes !== 'undefined' ) {
		settings.attributes = Object.assign( settings.attributes, {
			filter: {
				default: 'none',
				type: 'string',
			},
		} );
	}

	return settings;
}

addFilter( 'blocks.registerBlockType', 'coblocks/imageFilterAttributes', imageFilterAttributes );

/**
 * Add custom class in save element.
 *
 * @param {Object} extraProps Block element.
 * @param {Object} blockType  Blocks object.
 * @param {Object} attributes Blocks attributes.
 * @return {Object} extraProps Modified block element.
 */
function imageBlockClass( extraProps, blockType, attributes ) {
	if ( allowedBlocks.includes( blockType.name ) && typeof attributes.filter !== 'undefined' ) {
		extraProps.className = classnames(
			extraProps.className,
			{
				[ `has-filter-${ attributes.filter }` ]: attributes.filter !== 'none',
			}
		);
	}
	return extraProps;
}

addFilter( 'blocks.getSaveContent.extraProps', 'coblocks/imageApplyExtraClass', imageBlockClass );
