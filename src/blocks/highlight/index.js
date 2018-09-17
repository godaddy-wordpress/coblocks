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
import Highlighter from './components/highlight';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { RichText, getColorClassName } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	content: {
		type: 'array',
		source: 'children',
		selector: 'mark',
	},
	align: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/highlight', {

	title: __( 'Highlight' ),

	description: __( 'Highlight text.' ),

	icon: {
		src: icons.highlight,
	},

	category: 'coblocks',

	keywords: [
		__( 'text' ),
		__( 'paragraph' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'coblocks/highlight', { content: content } );
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
					return ( content || [] ).map( item => createBlock( 'core/paragraph', {
						content: content,
					} ) );
				},
			},
		],
	},

	edit: Edit,

	save: function( props ) {

		const {
			backgroundColor,
			content,
			customBackgroundColor,
			customTextColor,
			textColor,
		} = props.attributes;

		const textClass = getColorClassName( 'color', textColor );

		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( 'wp-block-coblocks-highlight__content', {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
		};

		return (
			<Highlighter { ...props }>
				{ ! RichText.isEmpty( content ) && (
					<RichText.Content
						tagName="mark"
						className={ classes }
						style={ styles }
						value={ content }
					/>
				) }
			</Highlighter>
		);
	},
} );