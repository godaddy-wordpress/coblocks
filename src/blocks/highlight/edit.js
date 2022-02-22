/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import Controls from './controls';
import { createBlock } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

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
		mergeBlocks,
		onReplace,
		setAttributes,
	} = props;

	const { content, align } = attributes;

	const blockProps = useBlockProps();
	blockProps.style.textAlign = align;

	return (
		<>
			<Controls { ...props } />
			<p { ...blockProps } >
				<RichText
					className="wp-block-coblocks-highlight__content"
					onChange={ ( value ) => setAttributes( { content: value } ) }
					onMerge={ mergeBlocks }
					onRemove={ () => onReplace( [] ) }
					onSplit={ splitBlock }
					placeholder={ __( 'Add highlighted text…', 'coblocks' ) }
					tagName="mark"
					value={ content }
				/>
			</p>
		</>
	);
};

export default Edit;
