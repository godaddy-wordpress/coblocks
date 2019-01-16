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
	gutter: {
		type: 'string',
		default: 'medium',
	},
	columns: {
		type: 'number',
		default: 4,
	},
	contentAlign: {
		type: 'string',
		default: 'center',
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
			coblocks,
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
			headingColor,
			headingFontSize,
			headingLineHeight,
			headingFontFamily,
			customHeadingFontSize,
			customHeadingColor,
			gutter,
			marginBottom,
			marginLeft,
			marginRight,
			marginSize,
			marginSyncUnits,
			marginTop,
			marginUnit,
			paddingBottom,
			paddingLeft,
			paddingRight,
			paddingSize,
			paddingSyncUnits,
			paddingTop,
			paddingUnit,
		} = attributes;

		// Body color class and styles.
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( 
			className, {
				[ `coblocks-features-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
			}
		);

		const innerClasses = classnames(
			'wp-block-coblocks-features__inner',
			`has-${ columns }-columns`,
			...BackgroundClasses( attributes ), {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
			'has-margin': marginSize && marginSize != 'no',
			[ `has-${ marginSize }-margin` ] : marginSize && ( marginSize != 'advanced' ),
			[ `has-${ gutter }-gutter` ] : gutter,
		} );

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			textAlign: contentAlign ? contentAlign : null,
		};

		return (
			<div className={ classes } data-columns={ columns } >
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
