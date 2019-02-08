/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
// import './styles/style.scss';
// import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass, InnerBlocks } = wp.editor;


/**
 * Block constants
 */
const name = 'buttons';

const title = __( 'Buttons' );

const icon = icons.features;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	gutter: {
		type: 'string',
	},
};

const settings = {

	title: title,

	description: __( 'Add a stylized graphic symbol to communicate something more.' ),

	keywords: keywords,

	attributes: blockAttributes,

	edit: Edit,

	styles: [
		{ name: 'outlined', label: __( 'Outlined' ), isDefault: true },
		{ name: 'filled', label: __( 'Filled' ) },
	],

	save( { attributes, className } ) {

		const {
			coblocks,
			gutter,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames(
			className, {
			[ `coblocks-buttons-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
		} );

		const innerClasses = classnames(
			'wp-block-coblocks-buttons__inner',{
		} );

		const innerStyles = {
			// color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes }>
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
		
	},
};

export { name, title, icon, settings };
