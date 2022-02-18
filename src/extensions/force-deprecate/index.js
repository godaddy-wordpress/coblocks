/**
 * External dependencies
 */
import isEqual from 'lodash/isEqual';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import { store } from '@wordpress/block-editor';
// Backward compatibility.
const blockEditorStore = !! store ? store : 'core/block-editor';

/**
 * Deprecated source of truth
 *
 * @constant deprecated Acts as source of truth for this extension in tracking what is deprecated.
 */
const deprecated = {
	blocks: {
		colorControlBlocks: [ 'coblocks/author' ],
		fontSizeBlocks: [ 'coblocks/click-to-tweet', 'coblocks/author' ],
	},
	keys: [ 'customBackgroundColor', 'customTextColor', 'customFontSize' ],
};

/**
 * This logic should only apply to blocks within `deprecatedFontSizeBlocks` constant.
 * Deprecated CoBlocks fontSizeControls in favor of block supports.
 *
 * @param {Object} blockProps The blockProps to deprecate.
 * @return {Object} Block attributes object to be merged.
 */
const deprecateCoBlocksFontSizeControls = ( blockProps ) => {
	if ( ! deprecated.blocks.fontSizeBlocks.includes( blockProps?.name ) ) {
		return blockProps?.attributes;
	}
	let migratedAttributes = { ...blockProps?.attributes };
	if ( !! Number.isInteger( blockProps?.attributes?.customFontSize ) ) {
		const { attributes } = blockProps;
		// Ensure that we spread each nested object so as not to discard properties.
		migratedAttributes = {
			...migratedAttributes,
			style: {
				...migratedAttributes?.style,
				typography: {
					...migratedAttributes?.style?.typography,
					fontSize: `${ attributes?.customFontSize }px`,
				},
			},
		};
	}
	return migratedAttributes;
};

/**
 * This logic should only apply to blocks within `deprecatedColorControlBlocks` constant.
 * Deprecate CoBlocks colorControls in favor of blockSupports.
 *
 * @param {Object} blockProps The blockProps to deprecate.
 * @return {Object} Block attributes object to be merged.
 */
const deprecateCoBlocksColorControlsControls = ( blockProps ) => {
	if ( ! deprecated.blocks.colorControlBlocks.includes( blockProps?.name ) ) {
		return blockProps?.attributes;
	}
	let migratedAttributes = { ...blockProps?.attributes };
	if ( !! blockProps?.attributes?.customBackgroundColor || !! blockProps?.attributes?.customTextColor ) {
		const { attributes } = blockProps;
		// Ensure that we spread each nested object so as not to discard properties.
		migratedAttributes = {
			...migratedAttributes,
			style: {
				...migratedAttributes?.style,
				color: {
					...migratedAttributes?.style?.color,
					background: attributes?.customBackgroundColor,
					text: attributes?.customTextColor,
				},
			},
		};
	}
	return migratedAttributes;
};

/**
 * This logic tests against each block checking for deprecated controls on specified blocks.
 * When a block with deprecated attributes has been found this logic will migrate attributes
 * and then replace the block for proper instantiation.
 *
 * @param {Object} props The blockProps to deprecate.
 */
export const deprecateAll = ( props ) => {
	/**
	 * If this block is not included within the source of truth we should short circuit.
	 */
	const blockShouldDeprecate = !! Object.values( deprecated.blocks )
		.filter( ( blockArray ) => blockArray.includes( props.name ) )?.length;
	if ( ! blockShouldDeprecate ) {
		return;
	}

	/**
	 * We run a merger function on all attribute outputs to gracefully merge the objects
	 * and preserve properties.
	 *
	 * @constant {Object} attributesDeprecated The final object of deprecated attributes.
	 */
	const attributesDeprecated = mergeAttributeObjects(
		deprecateCoBlocksFontSizeControls( props ),
		deprecateCoBlocksColorControlsControls( props ),
	);

	// If the attributes and attributesDeprecated const are equal then
	// the attributes have not been modified and we should return early.
	if ( isEqual( props.attributes, attributesDeprecated ) ) {
		return;
	}

	/**
	 * Block attributes have been migrated into new form.
	 * Delete all deprecated keys from block attributes.
	 * Proceed with block replacement.
	 */
	deprecated.keys.forEach( ( key ) => {
		delete attributesDeprecated[ key ];
	} );

	const { clientId, name, getBlocks } = props;
	const { replaceBlocks } = dispatch( blockEditorStore );
	// Preserve innerBlocks with transformedBlock.
	const innerBlocks = getBlocks( clientId );
	const transformedBlock = createBlock( name, { ...attributesDeprecated }, innerBlocks );
	replaceBlocks( [ clientId ], transformedBlock );
};

/**
 * mergeAttributeObjects function will deep merge the objects passed as arguments and all iterable properties
 * to merge into final object.
 *
 * @constant {Object} mergeAttributeObjects The final object of deprecated attributes.
 * @param {...object} objectsArgs Any number of objects passed as argument that should be merged into return attributes.
 * @return {Object} The final deeply merged attributes object.
 */
const mergeAttributeObjects = ( ...objectsArgs ) => {
	const returnObject = {};

	// Deep merge the argument object into the target object.
	const merger = ( iterationObj ) => {
		for ( const prop in iterationObj ) {
			if ( iterationObj.hasOwnProperty( prop ) ) {
				if ( Object.prototype.toString.call( iterationObj[ prop ] ) === '[object Object]' ) {
					// if the property is a nested object.
					returnObject[ prop ] = mergeAttributeObjects( returnObject[ prop ], iterationObj[ prop ] );
				} else {
					// for regular property.
					returnObject[ prop ] = iterationObj[ prop ];
				}
			}
		}
	};

	// Iterate through all object arguments and deep merge them with `returnObject`.
	objectsArgs.forEach( ( iteratedObject ) => {
		merger( iteratedObject );
	} );

	return returnObject;
};
