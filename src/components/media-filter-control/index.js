/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	FilterDarkIcon,
	FilterGrayscaleIcon,
	FilterNoneIcon,
	FilterSaturationIcon,
	FilterSepiaIcon,
	FilterVintageIcon,
	FilterMainIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import {
	Toolbar,
	DropdownMenu,
	Icon,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';

const allowedBlocks = [
	'core/image',
	'core/gallery',
];

class MediaFilterControl extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			filter,
		} = attributes;

		const filterControls = [
			{
				icon: <Icon icon={ FilterNoneIcon } />,
				/* translators: image style */
				title: __( 'Original', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'none' } );
				},
				isActive: filter === 'none',
			},
			{
				icon: <Icon icon={ FilterGrayscaleIcon } />,
				/* translators: image style */
				title: __( 'Grayscale filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'grayscale' } );
				},
				isActive: filter === 'grayscale',
			},
			{
				icon: <Icon icon={ FilterSepiaIcon } />,
				/* translators: image style */
				title: __( 'Sepia filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'sepia' } );
				},
				isActive: filter === 'sepia',
			},
			{
				icon: <Icon icon={ FilterSaturationIcon } />,
				/* translators: image style */
				title: __( 'Saturation filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'saturation' } );
				},
				isActive: filter === 'saturation',
			},
			{
				icon: <Icon icon={ FilterDarkIcon } />,
				/* translators: image style */
				title: __( 'Dim filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'dim' } );
				},
				isActive: filter === 'dim',
			},
			{
				icon: <Icon icon={ FilterVintageIcon } />,
				/* translators: image style */
				title: __( 'Vintage filter', 'coblocks' ),
				onClick: () => {
					setAttributes( { filter: 'vintage' } );
				},
				isActive: filter === 'vintage',
			},
		];

		return (
			<Toolbar>
				<DropdownMenu
					hasArrowIndicator
					icon={ <Icon icon={ FilterMainIcon } /> }
					label={ __( 'Apply filter', 'coblocks' ) }
					controls={ filterControls }
					className="components-coblocks-media-filter"
				/>
			</Toolbar>
		);
	}
}

export default MediaFilterControl;

/**
 * Add the MediaFilterControl component to the core/image block
 */
const coreImageFilter = createHigherOrderComponent( BlockEdit => {
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
		console.log( props.name );
		if ( ! allowedBlocks.includes( props.name ) ) {
			return <BlockListBlock { ...props } />
		}

		const {
			filter,
		} = props.attributes;

		let className = classnames(
			{
				[ `has-filter-${ filter }` ]: filter !== 'none',
			}
		)

		return <BlockListBlock { ...props } className={ className } />;
	};
}, 'withStyleClasses' );

addFilter( 'editor.BlockListBlock', 'coblocks/with-style-classes', coreImageEditorStyles );

/**
 * Add custom attribute to the core/image block
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function imageFilterAttributes( settings ) {
	if ( allowedBlocks.includes( settings.name ) && typeof settings.attributes !== 'undefined' ) {
		settings.attributes = Object.assign( settings.attributes, {
			filter: {
				type: 'strig',
				default: 'none',
			}
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
 *
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
