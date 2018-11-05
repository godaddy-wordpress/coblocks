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
	titleBackgroundColor: {
		type: 'string',
	},
	titleColor: {
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
	customTitleBackgroundColor: {
		type: 'string',
	},
	customTitleColor: {
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

	save: function( props ) {

		const {
			backgroundColor,
			content,
			customBackgroundColor,
			customTextColor,
			customTitleBackgroundColor,
			customTitleColor,
			open,
			title,
			titleBackgroundColor,
			titleColor,
			textColor,
		} = props.attributes;

		// Background and text color class and styles.
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		const textClass = getColorClassName( 'color', textColor );

		const backgroundClasses = classnames(
			'wp-block-coblocks-accordion-item',
			open ? 'wp-block-coblocks-accordion-item--open' : null, {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
		} );

		const backgroundStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customTextColor,
		};

		// Title color class and styles.
		const titleBackgroundColorClass = getColorClassName( 'background-color', titleBackgroundColor );
		const titleBackgroundBorderColorClass = getColorClassName( 'color', titleBackgroundColor );
		const titleColorClass = getColorClassName( 'color', titleColor );

		const titleClasses = classnames(
			'wp-block-coblocks-accordion-item__title', {
			'has-background': titleBackgroundColor || customTitleBackgroundColor,
			[ titleBackgroundColorClass ]: titleBackgroundColorClass,
			'has-text-color': titleColor || customTitleColor,
			[ titleColorClass ]: titleColorClass,
		} );

		const titleStyles = {
			backgroundColor: titleBackgroundColorClass ? undefined : customTitleBackgroundColor,
			color: titleColorClass ? undefined : customTitleColor,
		};

		// Content color class and styles.
		const contentClass = getColorClassName( 'color', textColor );

		const contentClasses = classnames(
			'wp-block-coblocks-accordion-item__text', {
				'has-text-color': textColor || customTextColor,
				[ contentClass ]: contentClass,
			}
		);

		const contentStyles = {
			color: contentClass ? undefined : customTextColor,
		};

		return (
			<div
				className={ backgroundClasses }
				style={ backgroundStyles }
			>
				{ ! RichText.isEmpty( title ) && (
					<details open={ open }>
						<RichText.Content
							tagName="summary"
							className={ titleClasses }
							value={ title }
							style={ titleStyles }
						/>
						{ ! RichText.isEmpty( content ) && (
							<div
								className={ 'wp-block-coblocks-accordion-item__content' }
							>
								<RichText.Content
									tagName="p"
									className={ contentClasses }
									value={ content }
									style={ contentStyles }
								/>
							</div>
						) }
					</details>
				) }
			</div>
		);
	},
};

export { name, title, icon, settings };
