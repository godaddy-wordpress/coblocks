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
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';

const allowedBlocks = [
	'core/image',
	'core/gallery',
];

/**
 * Add the MediaFilterControl component to the core/image and core/gallery block
 */
const coreImageFilter = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( ! allowedBlocks.includes( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<BlockControls>
					<MediaFilterControl
						{ ...props }
					/>
				</BlockControls>
			</Fragment>
		);
	};
}, 'withGalleryExtension' );

addFilter( 'editor.BlockEdit', 'coblocks/coreImageFilter', coreImageFilter );

/**
 * Add custom `has-filter-${ filter }` class to the core/image block
 */
const coreImageEditorStyles = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if ( ! allowedBlocks.includes( props.name ) ) {
			return <BlockListBlock { ...props } />;
		}

		const {
			filter,
		} = props.attributes;

		const className = classnames(
			{
				[ `has-filter-${ filter }` ]: filter !== 'none',
			}
		);

		return <BlockListBlock { ...props } className={ className } />;
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
				type: 'strig',
				default: 'none',
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
