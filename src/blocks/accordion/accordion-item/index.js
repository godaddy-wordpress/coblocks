/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './components/edit';
import icons from './../../../utils/icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText, InnerBlocks, getColorClassName } = wp.blockEditor;

/**
 * Block constants
 */
const { name } = metadata;

const icon = icons.accordionItem;

const settings = {
	title: __( 'Accordion Item' ),
	description: __( 'Add collapsable accordion items to accordions.' ),
	keywords: [ __( 'tabs' ), __( 'faq' ), __( 'coblocks' ) ],
	parent: [ 'coblocks/accordion' ],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes: metadata.attributes,
	edit,
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
		};

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

export { name, icon, settings };
