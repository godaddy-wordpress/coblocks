/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import BackgroundPanel, { BackgroundAttributes, BackgroundClasses, BackgroundVideo } from '../../../components/background';
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
			focalPoint,
			hasParallax,
			backgroundType,
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
			backgroundImage: backgroundImg && backgroundType == 'image' ? `url(${ backgroundImg })` : undefined,
			backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes }>
				<div className={ innerClasses } style={ innerStyles }>
					{ BackgroundVideo( attributes ) }
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
