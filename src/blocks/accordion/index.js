/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Accordion from './components/accordion';
import AccordionBlock from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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

	attributes: {
		title: {
			type: 'string',
			selector: '.wp-block-coblocks-accordion__title',
		},
		content: {
			type: 'array',
			selector: '.wp-block-coblocks-accordion__text',
			source: 'children',
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
	},

	edit: AccordionBlock,

	save: function( props ) {

		const { title, content, open, titleBackgroundColor, titleColor, textAlign } = props.attributes;

		return (
			<Accordion { ...props }>

				{ title && title.length > 0 && (
					<details open={ open }>
						<summary
							className={ 'wp-block-coblocks-accordion__title' }
							style={ {
								backgroundColor: titleBackgroundColor,
								color: titleColor
							} }
						>
							<p>{ title }</p>
						</summary>
						{ content && content.length > 0 && (
							<div
								className={ 'wp-block-coblocks-accordion__content' }
								style={ {
									borderColor: titleBackgroundColor
								} }
							>
								<p className={ 'wp-block-coblocks-accordion__text' }>{ content }</p>
							</div>
						) }
					</details>
				) }
			</Accordion>
		);
	},
} );
