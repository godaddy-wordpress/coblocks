/**
 * Extension and components.
 */
import { deprecateAll as deprecateAllFeatures } from './force-deprecate';
import { applyAttributes as formLabelColorsApplyAttributes } from '../components/form-label-colors';
import { applyAttributes as gutterControlApplyAttributes } from '../components/gutter-control';
import {
	useAdvancedControls as advancedControls,
	applyAttributes as advancedControlsApplyAttributes,
	useEditorProps as advancedControlsEditorProps,
	applySaveProps as advancedControlsSaveProps,
} from './advanced-controls';
import {
	applyAttributes as animationApplyAttributes,
	useAnimationControls as animationControls,
	useEditorProps as animationEditorProps,
	applySaveProps as animationSaveProps,
} from './animation';
import {
	useButtonControls as buttonControls,
	applyAttributes as buttonControlsApplyAttributes,
	useEditorProps as buttonControlsEditorProps,
	applySaveProps as buttonControlsSaveProps,
} from './button-controls';
import {
	applyAttributes as coblocksApplyAttributes,
	useAttributes as coblocksAttributes,
} from './attributes';
import {
	useColorControls as colorControls,
	applyAttributes as colorControlsApplyAttributes,
} from './colors/inspector';
import {
	useImageFilter as imageFilter,
	applyAttributes as imageFilterApplyAttributes,
	useEditorProps as imageFilterEditorProps,
	applySaveProps as imageFilterSaveProps,
} from './image-filter';
import {
	useLightbox as lightbox,
	applyAttributes as lightboxApplyAttributes,
	useEditorProps as lightboxEditorProps,
	applySaveProps as lightboxSaveProps,
} from './lightbox-controls';
import {
	usePaddingControls as paddingControls,
	applyAttributes as paddingControlsApplyAttributes,
	useEditorProps as paddingControlsEditorProps,
	applySaveProps as paddingControlsSaveProps,
} from './padding-controls';
import {
	usePositioningControl as positioningControl,
	applyAttributes as positioningControlApplyAttributes,
} from './image-crop';
import {
	useTypography as typography,
	applyAttributes as typographyApplyAttributes,
	useEditorProps as typographyEditorProps,
	applySaveProps as typographySaveProps,
} from './typography';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Utilities
 */
const enhance = compose(
	/**
	 * @param {Function} WrappedBlockEdit A filtered BlockEdit instance.
	 * @return {Function} Enhanced component with merged state data props.
	 */
	withSelect( ( select ) => {
		return {
			getBlocks: select( 'core/block-editor' ).getBlocks,
			select,
		};
	} ),
);

/**
 * React hook function to override the default block element to add wrapper props.
 *
 * @function addEditorBlockAttributes
 * @param {Object} BlockListBlock Block and its wrapper in the editor.
 * @return {Object} BlockListBlock extended
 */
const addAllEditorProps = createHigherOrderComponent( ( BlockListBlock ) => {
	return enhance( ( { select, ...props } ) => {
		/**
		 * Block deprecation logic belongs here.
		 *
		 * By keeping this logic as an extension it allows us to remove a great deal of superfluous code.
		 * These deprecations would otherwise need to be applied on each respective block in the edit.js function.
		 */
		useEffect( () => {
			/**
			 * Block deprecations should run in a useEffect so as to
			 * respect the react component lifecycle and avoid errors.
			 */
			deprecateAllFeatures( props );
		}, [] );

		/**
		 * Some controls must use the parent blocks like for
		 * galleries but others will use children like buttonControls
		 */
		const parentBlock = select( 'core/block-editor' ).getBlock( props.rootClientId || props.clientId );
		const parentBlockName = select( 'core/block-editor' ).getBlockName( props.rootClientId || props.clientId );
		const childBlock = select( 'core/block-editor' ).getBlock( props.clientId );
		const childBlockName = select( 'core/block-editor' ).getBlockName( props.clientId );

		/**
		 * Group extensions in an array to minimize code duplication and
		 * allow a source of truth for all applied extensions.
		 */
		const everyExtension = [
			advancedControlsEditorProps( parentBlock, parentBlockName, props, props.wrapperProps ),
			animationEditorProps( parentBlock, parentBlockName, props, props.wrapperProps ),
			buttonControlsEditorProps( childBlock, childBlockName, props, props.wrapperProps ),
			imageFilterEditorProps( props, props.wrapperProps ),
			lightboxEditorProps( props, props.wrapperProps ),
			paddingControlsEditorProps( props, props.wrapperProps ),
			typographyEditorProps( childBlock, childBlockName, props, props.wrapperProps ),
		];

		/**
		 * Merge classes from all extensions.
		 */
		const mergeClasses = classnames(
			...everyExtension.map( ( extendedProps ) => extendedProps?.className )
		);

		/**
		 * @function mergeProps Merge props from all extensions.
		 * @return {Object} The merged props from all extensions
		 */
		const mergeProps = () => {
			let mergedProps = {};

			/**
			 * Be aware of overriding existing props with matching properties names when adding new extensions.
			 * Classes are a known collision point and must be merged separately.
			 */
			everyExtension.forEach( ( extendedProps ) => {
				mergedProps = {
					...mergedProps,
					...extendedProps,
				};
			} );

			// Classnames collide due to matching property names. We delete them here and merge them separately.
			delete mergedProps.className;
			return mergedProps;
		};

		/**
		 * Extended wrapperProps applied to BlockListBlock.
		 * wrapperProps would be element attributes in the DOM
		 * such as `[data-coblocks-align-support: 1]` but should not contain the className.
		 */
		const wrapperProps = {
			...mergeProps(),
		};

		return <BlockListBlock { ...{ ...props, className: mergeClasses } } wrapperProps={ wrapperProps } />;
	} );
}, 'addEditorBlockAttributes' );

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function applyAllAttributes( settings ) {
	const extendedSettings = {
		...advancedControlsApplyAttributes( settings ),
		...animationApplyAttributes( settings ),
		...coblocksApplyAttributes( settings ),
		...buttonControlsApplyAttributes( settings ),
		...colorControlsApplyAttributes( settings ),
		...positioningControlApplyAttributes( settings ),
		...imageFilterApplyAttributes( settings ),
		...lightboxApplyAttributes( settings ),
		...paddingControlsApplyAttributes( settings ),
		...typographyApplyAttributes( settings ),
		...gutterControlApplyAttributes( settings ),
		...formLabelColorsApplyAttributes( settings ),
	};

	return extendedSettings;
}

/**
 * Override props assigned to save component to inject attributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applyAllSaveProps( extraProps, blockType, attributes ) {
	const extendedExtraProps = {
		...animationSaveProps( extraProps, blockType, attributes ),
		...advancedControlsSaveProps( extraProps, blockType, attributes ),
		...buttonControlsSaveProps( extraProps, blockType, attributes ),
		...imageFilterSaveProps( extraProps, blockType, attributes ),
		...lightboxSaveProps( extraProps, blockType, attributes ),
		...paddingControlsSaveProps( extraProps, blockType, attributes ),
		...typographySaveProps( extraProps, blockType, attributes ),
	};

	return extendedExtraProps;
}

/**
 * Add custom CoBlocks controls to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const applyAllControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( blockProps ) => {
		const props = { ...coblocksAttributes( blockProps ) };
		return (
			<>
				<BlockEdit { ...props } />
				{ advancedControls( props ) }
				{ animationControls( props ) }
				{ buttonControls( props ) }
				{ colorControls( props ) }
				{ positioningControl( props ) }
				{ imageFilter( props ) }
				{ lightbox( props ) }
				{ paddingControls( props ) }
				{ typography( props ) }
			</>
		);
	};
}, 'applyAllControls' );

/**
 * Filters
 */
addFilter(
	'editor.BlockListBlock',
	'coblocks/applyEditorProps',
	addAllEditorProps
);
addFilter(
	'blocks.registerBlockType',
	'coblocks/AdvancedControls/attributes',
	applyAllAttributes
);
addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applySaveProps',
	applyAllSaveProps
);
addFilter(
	'editor.BlockEdit',
	'coblocks/advanced',
	applyAllControls,
);
