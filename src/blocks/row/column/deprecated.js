/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundAttributes } from '../../../components/background';
import { default as currentBlock } from './block.json';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

const deprecated = [ {
	attributes: currentBlock.attributes,
	save( { attributes } ) {
		const {
			id,
			coblocks,
			backgroundType,
			backgroundColor,
			backgroundImg,
			customBackgroundColor,
			textColor,
			customTextColor,
			marginSize,
			paddingSize,
			contentAlign,
		} = attributes;

		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		let classlist = {
			[ `coblocks-row--${ id }` ]: id,
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
		};

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classlist = Object.assign( classlist, [ `coblocks-row-${ coblocks.id }` ] );
		}

		const classes = classnames( classlist );

		const innerClasses = classnames(
			'wp-block-coblocks-column__inner',
			...BackgroundClasses( attributes ), {
				'has-padding': paddingSize && paddingSize !== 'no',
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
				[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
			} );

		const styles = {
			color: textClass ? undefined : customTextColor,
			textAlign: contentAlign ? contentAlign : null,
		};

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		};

		return (
			<div className={ classes } style={ styles } >
				{ BackgroundVideo( attributes ) }
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
},
{
	attributes: {
		...BackgroundAttributes,
		...DimensionsAttributes,
		...currentBlock.attributes,
	},
	save( { attributes } ) {
		const {
			coblocks,
			textColor,
			customTextColor,
			marginSize,
			paddingSize,
			contentAlign,
		} = attributes;
		const textClass = getColorClassName( 'color', textColor );

		let classes = '';

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-column-${ coblocks.id }` );
		}

		const innerClasses = classnames(
			'wp-block-coblocks-column__inner',
			...BackgroundClasses( attributes ),
			{
				'has-padding': paddingSize && paddingSize !== 'no',
				'has-margin': marginSize && marginSize !== 'no',
				[ `has-${ paddingSize }-padding` ]:
					paddingSize && paddingSize !== 'advanced',
				[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
			}
		);

		const styles = {
			textAlign: contentAlign ? contentAlign : null,
		};

		const innerStyles = {
			...BackgroundStyles( attributes ),
			color: textClass ? undefined : customTextColor,
		};

		return (
			<div className={ classes } style={ styles } >
				<div className={ innerClasses } style={ innerStyles }>
					{ BackgroundVideo( attributes ) }
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
},
];

export default deprecated;
