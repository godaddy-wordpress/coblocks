/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import { blockStylesToDescend } from '../../utils/helper.js';
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore, RichText, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, withSelect } from '@wordpress/data';

/**
 * Block constants
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getPermalink } = select( 'core/editor' );

	return {
		postLink: getPermalink(),
	};
} );

const Edit = ( props ) => {
	const {
		attributes,
		buttonColor,
		className,
		clientId,
		isSelected,
		setAttributes,
		textColor,
		onReplace,
	} = props;

	const {
		buttonText,
		content,
		textAlign,
	} = attributes;

	const blockquoteClasses = classnames( className, { [ `has-text-align-${ textAlign }` ]: textAlign } );

	const blockProps = useBlockProps( { className: blockquoteClasses } );
	const descendingBlockStyles = blockStylesToDescend( blockProps );

	const { replaceBlocks } = useDispatch( blockEditorStore );

	useEffect( () => {
		/**
		 * This logic should only fire in the case of block deprecations.
		 * Deprecated markup come in with old attributes and the block
		 * must be replaced for proper instantiation.
		 */
		// if ( !! attributes?.images?.length && ! images?.length ) {
		// const newBlocks = attributes?.images.map( ( image ) => {
		// 	return createBlock( 'coblocks/click-to-tweet', {
		// 		alt: image.alt,
		// 		caption: image.caption?.toString(),
		// 		id: parseInt( image.id ),
		// 		url: image.url,
		// 	} );
		// } );

		const migratedAttributes = { ...attributes };
		// delete migratedAttributes.images;
		// delete migratedAttributes.gutter;
		// delete migratedAttributes.gutterCustom;

		const transformedBlock = createBlock( 'coblocks/click-to-tweet', { ...migratedAttributes }, [] );
		console.log( migratedAttributes );
		console.log( transformedBlock );
		// replaceBlocks(
		// 	[ clientId ],
		// 	transformedBlock,
		// );
		// }
	}, [] );

	return (
		<>
			{ isSelected && (
				<>
					<Controls { ...props } />
					<Inspector { ...props } />
				</>
			) }
			<blockquote { ...blockProps }>
				<RichText
					allowedFormats={ [] } // Disable controls.
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__text', {
							'has-text-color': textColor.color,
							[ textColor.class ]: textColor.class,
						}
					) }
					/* translators: the text of the click to tweet element */
					multiline="false"
					onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
					onRemove={ ( forward ) => {
						const hasEmptyTweet = content.length === 0 || content.length === 1;

						if ( ! forward && hasEmptyTweet ) {
							onReplace( [] );
						}
					} }
					/* translators: the text of the click to tweet element */
					placeholder={ __( 'Add a quote to tweet…', 'coblocks' ) }
					style={ {
						color: textColor.color,
						...descendingBlockStyles,
					} }
					tagName="p"
					value={ content }
				/>
				<RichText
					allowedFormats={ [] } // Disable controls.
					className={ classnames(
						'wp-block-coblocks-click-to-tweet__twitter-btn', {
							'has-button-color': buttonColor.color,
							[ buttonColor.class ]: buttonColor.class,
						}
					) }
					multiline="false"
					onChange={ ( nextButtonText ) => setAttributes( { buttonText: nextButtonText } ) }
					placeholder={ __( 'Add button…', 'coblocks' ) }
					style={ {
						backgroundColor: buttonColor.color,
					} }
					tagName="span"
					value={ buttonText }
				/>
			</blockquote>
		</>
	);
};

export default compose( [
	applyWithSelect,
	applyWithColors,
] )( Edit );
