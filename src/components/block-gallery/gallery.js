/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { View } from '@wordpress/primitives';
import { VisuallyHidden } from '@wordpress/components';
import {
	// Disable reason: We choose to use an experimental API here.
	// eslint-disable-next-line import/named, @wordpress/no-unsafe-wp-apis
	__experimentalUseInnerBlocksProps,
	useInnerBlocksProps as promotedUseInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

const useInnerBlocksProps = typeof __experimentalUseInnerBlocksProps === 'function'
	? __experimentalUseInnerBlocksProps
	: promotedUseInnerBlocksProps;

const allowedBlocks = [ 'core/image' ];

export const Gallery = ( props ) => {
	const {
		attributes,
		isSelected,
		setAttributes,
		mediaPlaceholder,
		insertBlocksAfter,
		blockProps,
		wrapperClass = '',
	} = props;

	const { align, caption, imageCrop, lightbox } = attributes;

	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		__experimentalLayout: { alignments: [], type: 'default' },
		allowedBlocks,
		orientation: 'vertical',
		renderAppender: false,
	} );

	const [ captionFocused, setCaptionFocused ] = useState( false );

	function onFocusCaption() {
		if ( ! captionFocused ) {
			setCaptionFocused( true );
		}
	}

	function removeCaptionFocus() {
		if ( captionFocused ) {
			setCaptionFocused( false );
		}
	}

	useEffect( () => {
		if ( ! isSelected ) {
			setCaptionFocused( false );
		}
	}, [ isSelected ] );

	return (
		<figure
			{ ...innerBlocksProps }
			className={ classnames(
				blockProps.className,
				{
					[ `align${ align }` ]: align,
					'has-lightbox': lightbox,
					'is-cropped': imageCrop,
				}
			) }
		>
			{ ( () => {
				/**
				 * Conditionally wrap the children image blocks
				 */
				if ( ! wrapperClass ) {
					return ( { children } );
				}
				return ( <View className={ classnames( wrapperClass ) } >
					{ children }
				</View> );
			} )() }
			<View
				className="gallery-media-placeholder-wrapper"
				onClick={ removeCaptionFocus }
			>
				{ mediaPlaceholder }
			</View>
			<RichTextVisibilityHelper
				__unstableOnSplitAtEnd={ () =>
					insertBlocksAfter( createBlock( 'core/paragraph' ) )
				}
				aria-label={ __( 'Gallery caption text', 'coblocks' ) }
				captionFocused={ captionFocused }
				className="blocks-gallery-caption"
				inlineToolbar
				isHidden={ ! isSelected && RichText.isEmpty( caption ) }
				onChange={ ( value ) => setAttributes( { caption: value } ) }
				onFocusCaption={ onFocusCaption }
				placeholder={ __( 'Write gallery caption…', 'coblocks' ) }
				tagName="figcaption"
				value={ caption }
			/>
		</figure>
	);
};

function RichTextVisibilityHelper( {
	isHidden,
	captionFocused,
	onFocusCaption,
	className,
	value,
	placeholder,
	tagName,
	captionRef,
	...richTextProps
} ) {
	if ( isHidden ) {
		return <VisuallyHidden as={ RichText } { ...richTextProps } />;
	}

	return (
		<RichText
			className={ className }
			isSelected={ captionFocused }
			onClick={ onFocusCaption }
			placeholder={ placeholder }
			ref={ captionRef }
			tagName={ tagName }
			value={ value }
			{ ...richTextProps }
		/>
	);
}

export default Gallery;
