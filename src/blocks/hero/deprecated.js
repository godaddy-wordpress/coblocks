/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import CSSGridAttributes from '../../components/grid-control/attributes';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import { BackgroundClasses, BackgroundVideo, BackgroundAttributes } from '../../components/background';

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';

const attributes = {
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	...ResponsiveBaseControlAttributes,
	...metadata.attributes,
};

const deprecated = [
	{
		attributes,
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

			let classes = classnames( {
				'has-text-color': textColor || customTextColor,
				[ textClass ]: textClass,
			} );

			if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
				classes = classnames( classnames, `coblocks-hero-${ coblocks.id }` );
			}

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
