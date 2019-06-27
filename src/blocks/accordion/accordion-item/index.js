/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText, InnerBlocks, getColorClassName } = wp.blockEditor;

/**
 * Block constants
 */
const name = 'accordion-item';

const title = __( 'Accordion Item' );

const icon = icons.accordionItem;

const keywords = [
	__( 'tabs' ),
	__( 'faq' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-accordion__title',
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
	borderColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Add collapsable accordion items to accordions.' ),

	keywords: keywords,

	parent: [ 'coblocks/accordion' ],

	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},

	attributes: blockAttributes,

	edit: Edit,

	save( { attributes } ) {

		const {
			backgroundColor,
			customBackgroundColor,
			customTextColor,
			open,
			textColor,
			borderColor,
			title,
		} = attributes;

		const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );
		const textColorClass = getColorClassName( 'color', textColor );

		const backgroundClasses = classnames(
			'wp-block-coblocks-accordion-item',
			open ? 'wp-block-coblocks-accordion-item--open' : null, {}
		);

		const titleClasses = classnames(
			'wp-block-coblocks-accordion-item__title', {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundColorClass ]: backgroundColorClass,
			'has-text-color': textColor || customTextColor,
			[ textColorClass ]: textColorClass,
		} );

		const titleStyles = {
			backgroundColor: backgroundColorClass ? undefined : customBackgroundColor,
			color: textColorClass ? undefined : customTextColor,
		};

		const borderStyle = {
			borderColor: borderColor ? borderColor : customBackgroundColor,
		}

		return (
			<div>
				{ ! RichText.isEmpty( title ) &&
					<details open={ open }>
						<RichText.Content
							tagName="summary"
							className={ titleClasses }
							value={ title }
							style={ titleStyles }
						/>
						<div className="wp-block-coblocks-accordion-item__content" style={ borderStyle }>
							<InnerBlocks.Content />
						</div>
					</details>
				}
			</div>
		);
	},
};

export { name, title, icon, settings };
