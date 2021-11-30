/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText, withFontSizes } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

const Edit = ( props ) => {
	/**
	 * Split handler for RichText value, namely when content is pasted or the
	 * user presses the Enter key.
	 *
	 * @param {?Array}     before Optional before value, to be used as content
	 *                            in place of what exists currently for the
	 *                            block. If undefined, the block is deleted.
	 * @param {?Array}     after  Optional after value, to be appended in a new
	 *                            paragraph block to the set of blocks passed
	 *                            as spread.
	 * @param {...WPBlock} blocks Optional blocks inserted between the before
	 *                            and after value blocks.
	 */
	const splitBlock = ( before, after, ...blocks ) => {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = props;

		if ( after ) {
			// Append "After" content as a new paragraph block to the end of
			// any other blocks being inserted after the current paragraph.
			blocks.push( createBlock( 'core/paragraph', { content: after } ) );
		}

		if ( blocks.length && insertBlocksAfter ) {
			insertBlocksAfter( blocks );
		}

		const { content } = attributes;

		if ( ! before ) {
			// If before content is omitted, treat as intent to delete block.
			onReplace( [] );
		} else if ( content !== before ) {
			// Only update content if it has in-fact changed. In case that user
			// has created a new paragraph at end of an existing one, the value
			// of before will be strictly equal to the current content.
			setAttributes( { content: before } );
		}
	};

	const {
		attributes,
		backgroundColor,
		className,
		mergeBlocks,
		onReplace,
		setAttributes,
		textColor,
		fontSize,
	} = props;

	const {
		content,
		align,
	} = attributes;

	const classes = classnames( 'wp-block-coblocks-highlight__content',
		backgroundColor && {
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
		},
		textColor && {
			'has-text-color': textColor.color,
			[ textColor.class ]: textColor.class,
		},
		fontSize?.class && {
			[ fontSize?.class ]: fontSize?.class,
		}
	);

	return (
		<>
			<Controls { ...props } />
			<Inspector { ...props } />
			<p className={ className } style={ { textAlign: align, fontSize: fontSize.size ?? undefined, } }>
				<RichText
					tagName="mark"
					placeholder={ __( 'Add highlighted text…', 'coblocks' ) }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					onMerge={ mergeBlocks }
					onSplit={ splitBlock }
					onRemove={ () => onReplace( [] ) }
					className={ classes }
					style={ {
						backgroundColor: backgroundColor?.color,
						color: textColor?.color,
						fontSize: fontSize.size ?? undefined,
					} }
				/>
			</p>
		</>
	);
};

export default compose( [
	applyWithColors,
	withFontSizes( 'fontSize' ),
] )( Edit );
