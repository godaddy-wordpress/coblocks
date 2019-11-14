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
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { RichText, withFontSizes } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

/**
 * Block edit function
 */
export class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.splitBlock = this.splitBlock.bind( this );
	}

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
	splitBlock( before, after, ...blocks ) {
		const {
			attributes,
			insertBlocksAfter,
			setAttributes,
			onReplace,
		} = this.props;

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
	}

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			mergeBlocks,
			onReplace,
			setAttributes,
			textColor,
			fontSize,
		} = this.props;

		const {
			content,
			align,
		} = attributes;

		const classes = classnames( `${ className }__content`,
			backgroundColor && {
				'has-background': backgroundColor.color,
				[ backgroundColor.class ]: backgroundColor.class,
			},
			textColor && {
				'has-text-color': textColor.color,
				[ textColor.class ]: textColor.class,
			},
			fontSize && {
				[ fontSize.class ]: fontSize.class,
			}
		);

		return (
			<Fragment>
				<Controls { ...this.props } />
				<Inspector { ...this.props } />
				<p className={ className } style={ { textAlign: align } }>
					<RichText
						tagName="mark"
						placeholder={ __( 'Add highlighted text…', 'coblocks' ) }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						onMerge={ mergeBlocks }
						onSplit={ this.splitBlock }
						onRemove={ () => onReplace( [] ) }
						className={ classes }
						style={ {
							backgroundColor: backgroundColor && backgroundColor.color,
							color: textColor && textColor.color,
							fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
						} }
						keepPlaceholderOnFocus
					/>
				</p>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	withFontSizes( 'fontSize' ),
] )( Edit );
