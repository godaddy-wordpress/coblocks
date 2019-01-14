/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses, BackgroundImageTransforms } from '../../components/background';
import ResizableSpacer, { ResizableSpacerTransforms } from '../../components/resizable-spacer/';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { InnerBlocks, getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'features';

const title = __( 'Features' );

const icon = icons.feature;

const keywords = [
	__( 'columns' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	maxWidth: {
		type: 'number',
	},
	containerWidth: {
		type: 'number',
	},
	gutter: {
		type: 'number',
		default: 15,
	},
	columns: {
		type: 'number',
		default: 4,
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
	stacked: {
		type: 'boolean',
		default: true,
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'Add up to four columns of features.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit: Edit,

	save( { attributes, className } ) {

		const {
			backgroundColor,
			backgroundImg,
			columns,
			content,
			content_2,
			content_3,
			content_4,
			contentAlign,
			customBackgroundColor,
			customTextColor,
			heading,
			heading_2,
			heading_3,
			heading_4,
			textColor,
			containerWidth,
			headingColor,
			headingFontSize,
			headingLineHeight,
			headingFontFamily,
			customHeadingFontSize,
			customHeadingColor,
		} = attributes;

		// Body color class and styles.
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );


		const backgroundClasses = classnames(
			className,
			`has-${ columns }-columns`,
			...BackgroundClasses( attributes ), {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const backgroundStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			textAlign: contentAlign ? contentAlign : null,
		};

		return (
			<div className={ backgroundClasses } style={ backgroundStyles }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export { name, title, icon, settings };
