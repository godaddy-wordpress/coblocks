/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

const deprecated =
[ {
	attributes: {
		...DimensionsAttributes,
		...BackgroundAttributes,
		...metadata.attributes,
		gutter: {
			type: 'string',
			default: 'large',
		},
	},
	save( { attributes, className } ) {
		const {
			coblocks,
			columns,
			contentAlign,
			customTextColor,
			textColor,
			gutter,
			marginSize,
			paddingSize,
		} = attributes;

		// Body color class and styles.
		const textClass = getColorClassName( 'color', textColor );

		let classes = className;

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-features-${ coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-features__inner',
			...BackgroundClasses( attributes ), {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
				[ `has-${ gutter }-gutter` ]: gutter,
				[ `has-${ contentAlign }-content` ]: contentAlign,
			} );

		const innerStyles = {
			...BackgroundStyles( attributes ),
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes } data-columns={ columns }>
				<div className={ innerClasses } style={ innerStyles }>
					{ BackgroundVideo( attributes ) }
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} ];

export default deprecated;
