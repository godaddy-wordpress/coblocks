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
import { BlockControls } from '@wordpress/block-editor';

const allowedBlocks = [
	'core/image',
	'core/gallery',
];

/**
 * Add the MediaFilterControl component and classnames to the core/image and core/gallery block
 *
 * @param {Object} props Object containing selected block props.
 */
const useImageFilter = ( props ) => {
	const { name } = props;
	if ( ! allowedBlocks.includes( name ) ) {
		return;
	}

	return (
		<>
			<BlockControls>
				<MediaFilterControl { ...props } />
			</BlockControls>
		</>
	);
};

/**
 * Add custom `has-filter-${ filter }` class to the core/image block
 *
 * @param {Object} props        Object containing selected block props.
 * @param {Object} wrapperProps Object containing existing wrapper props.
 */
const useEditorProps = ( props, wrapperProps ) => {
	const { attributes, name } = props;
	if ( ! allowedBlocks.includes( name ) ) {
		return;
	}

	const {
		filter,
	} = attributes;

	wrapperProps = {
		...wrapperProps,
		className: classnames( {
			[ `has-filter-${ filter }` ]: filter !== 'none',
		} ),
	};

	return wrapperProps;
};

/**
 * Add custom attribute to the core/image block
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
const applyAttributes = ( settings ) => {
	if ( allowedBlocks.includes( settings.name ) && typeof settings.attributes !== 'undefined' ) {
		settings.attributes = Object.assign( settings.attributes, {
			filter: {
				default: 'none',
				type: 'string',
			},
		} );
	}

	return settings;
};

/**
 * Add custom class in save element.
 *
 * @param {Object} extraProps Block element.
 * @param {Object} blockType  Blocks object.
 * @param {Object} attributes Blocks attributes.
 * @return {Object} extraProps Modified block element.
 */
const applySaveProps = ( extraProps, blockType, attributes ) => {
	if ( allowedBlocks.includes( blockType.name ) && typeof attributes.filter !== 'undefined' ) {
		extraProps.className = classnames(
			extraProps.className,
			{
				[ `has-filter-${ attributes.filter }` ]: attributes.filter !== 'none',
			}
		);
	}
	return extraProps;
};

export { applyAttributes, applySaveProps, useEditorProps, useImageFilter };
