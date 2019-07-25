/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './../../utils/icons';
import edit from './components/edit';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.highlight;

const settings = {
	title: __( 'Highlight' ),
	description: __( 'Highlight text.' ),
	keywords: [ __( 'text' ), __( 'paragraph' ), __( 'coblocks' ) ],
	attributes: metadata.attributes,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
			{
				type: 'raw',
				selector: 'div.wp-block-coblocks-highlight',
				schema: {
					div: {
						classes: [ 'wp-block-coblocks-highlight' ],
					},
				},
			},
			{
				type: 'prefix',
				prefix: ':highlight',
				transform: function( content ) {
					return createBlock( `coblocks/${ name }`, {
						content,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					// transforming an empty block
					if ( ! content || ! content.length ) {
						return createBlock( 'core/paragraph' );
					}
					// transforming a block with content
					return createBlock( 'core/paragraph', {
						content: content,
					} );
				},
			},
		],
	},
	edit,
	save( { attributes } ) {
		const {
			backgroundColor,
			content,
			customBackgroundColor,
			customFontSize,
			customTextColor,
			fontSize,
			align,
			textColor,
		} = attributes;

		const textClass = getColorClassName( 'color', textColor );

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const fontSizeClass = getFontSizeClass( fontSize );

		const classes = classnames( 'wp-block-coblocks-highlight__content', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
			[ fontSizeClass ]: fontSizeClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<p style={ { textAlign: align } }>
				{ ! RichText.isEmpty( content ) && (
					<RichText.Content
						tagName="mark"
						className={ classes }
						style={ styles }
						value={ content }
					/>
				) }
			</p>
		);
	},
};

export { name, icon, settings };
