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
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText, getColorClassName, getFontSizeClass} = wp.editor;

/**
 * Block constants
 */
const name = 'accordion-item';

const title = __( 'Accordion Item' );

const icon = icons.accordion;

const keywords = [
	__( 'tabs' ),
	__( 'list' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-accordion__title',
	},
	content: {
		type: 'array',
		selector: '.wp-block-coblocks-accordion-item__text',
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
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Add an accordion item.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

	parent: [ 'coblocks/accordion' ],

	attributes: blockAttributes,

	edit: Edit,

	save( { attributes } ) {

		const {
			backgroundColor,
			content,
			customBackgroundColor,
			customTextColor,
			open,
			textColor,
			title,
		} = attributes;

		const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );
		const textColorClass = getColorClassName( 'color', textColor );
		const borderColorClass = getColorClassName( 'color', backgroundColor );

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

		const contentClasses = classnames(
			'wp-block-coblocks-accordion-item__content', {
			'has-text-color': borderColorClass || customBackgroundColor,
			[ borderColorClass ]: borderColorClass,
		} );

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
						{ ! RichText.isEmpty( content ) && (
							<div
								className={ contentClasses }
								style={ { color: textColorClass ? undefined : customTextColor } }
							>
								<RichText.Content
									tagName="p"
									className="wp-block-coblocks-accordion-item__text"
									value={ content }
								/>
							</div>
						) }
					</details>
				}
			</div>
		);
	},
};

export { name, title, icon, settings };
