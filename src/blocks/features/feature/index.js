/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import Edit from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { RichText, InnerBlocks, getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'feature';

const title = __( 'Feature' );

const icon = icons.feature;

const blockAttributes = {
	contentAlign: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'A singular child column within a parent features block.' ),

	attributes: blockAttributes,

	parent: [ 'coblocks/features' ],

	supports: {
		inserter: false,
	},

	edit: Edit,

	save( { attributes, className } ) {

		const {
			coblocks,
			backgroundColor,
			backgroundImg,
			contentAlign,
			customBackgroundColor,
			customTextColor,
			textColor,
			paddingSize,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames(
			className, {
			[ `has-${ contentAlign }-content` ]: contentAlign,
			[ `coblocks-feature-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
		} );

		const innerClasses = classnames(
			'wp-block-coblocks-feature__inner',
			...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			color: textClass ? undefined : customTextColor,
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
