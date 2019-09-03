/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundClasses, BackgroundVideo, BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import CSSGridAttributes from '../../components/grid-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { getColorClassName, InnerBlocks } = wp.blockEditor;

const blockAttributes = {
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	...ResponsiveBaseControlAttributes,
	...metadata.attributes,
};

const deprecated = [
	{
		attributes: {
			...blockAttributes,
		},
		save( { attributes } ) {
			const {
				coblocks,
				layout,
				fullscreen,
				maxWidth,
				backgroundImg,
				backgroundType,
				paddingSize,
				backgroundColor,
				customBackgroundColor,
				customTextColor,
				textColor,
				contentAlign,
				focalPoint,
				hasParallax,
				height,
			} = attributes;

			const textClass = getColorClassName( 'color', textColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );

			let classlist = {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
			};

			if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
				classlist = Object.assign( classlist, [ `coblocks-hero-${ coblocks.id }` ] );
			}

			const classes = classnames( classlist );

			const styles = {
				color: textClass ? undefined : customTextColor,
			};

			const innerClasses = classnames(
				'wp-block-coblocks-hero__inner',
				...BackgroundClasses( attributes ), {
					[ `hero-${ layout }-align` ]: layout,
					'has-text-color': textColor && textColor.color,
					'has-padding': paddingSize && paddingSize !== 'no',
					[ `has-${ paddingSize }-padding` ]: paddingSize && paddingSize !== 'advanced',
					[ backgroundClass ]: backgroundClass,
					[ `has-${ contentAlign }-content` ]: contentAlign,
					'is-fullscreen': fullscreen,
				} );

			const innerStyles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
				color: textColor ? textColor.color : undefined,
				backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
				minHeight: fullscreen ? undefined : height,
			};

			return (
				<div className={ classes } style={ styles } >
					<div className={ innerClasses } style={ innerStyles }>
						{ BackgroundVideo( attributes ) }
						<div className="wp-block-coblocks-hero__box" style={ { maxWidth: maxWidth ? maxWidth + 'px' : undefined } }>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
