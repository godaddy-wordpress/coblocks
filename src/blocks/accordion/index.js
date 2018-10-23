/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Accordion from './components/accordion';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

/**
 * Block attributes
 */
const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-accordion__title',
	},
	content: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-accordion__text',
		default: [],
	},
	open: {
		type: 'boolean',
		default: false,
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	titleBackgroundColor: {
		type: 'string',
	},
	titleColor: {
		type: 'string',
	},
	textAlign: {
		type: 'string',
	},
};

/**
 * Block registration
 */
registerBlockType( 'coblocks/accordion', {

	title: __( 'Accordion' ),

	description: __( 'Add an accordion.' ),

	icon: {
		src: icons.accordion,
	},

	category: 'coblocks',

	keywords: [
		__( 'tabs' ),
		__( 'list' ),
		__( 'coblocks' ),
	],

	attributes: blockAttributes,

	transforms: {
		from: [
			{
				type: 'raw',
				selector: 'div.wp-block-coblocks-accordion',
				schema: {
					div: {
						classes: [ 'wp-block-coblocks-accordion' ],
					},
				},
			},
		],
	},

	edit: Edit,

	save: function( props ) {

		const { title, content, open, titleBackgroundColor, titleColor, textAlign } = props.attributes;

		return (
			<Accordion { ...props }>

				{ ! RichText.isEmpty( title ) && (
					<details open={ open }>
						<summary
							className={ 'wp-block-coblocks-accordion__title' }
							style={ {
								backgroundColor: titleBackgroundColor,
								color: titleColor
							} }
						>
							<RichText.Content
								tagName="p"
								value={ title }
							/>
						</summary>
						{ ! RichText.isEmpty( content ) && (
							<div
								className={ 'wp-block-coblocks-accordion__content' }
								style={ {
									borderColor: titleBackgroundColor
								} }
							>
								<RichText.Content
									tagName="p"
									className="wp-block-coblocks-accordion__text"
									value={ content }
								/>
							</div>
						) }
					</details>
				) }
			</Accordion>
		);
	},
} );
