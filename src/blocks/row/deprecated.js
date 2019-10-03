/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { BackgroundAttributes, BackgroundClasses, BackgroundVideo } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

/**
 * WordPress dependencies
 */
const { getColorClassName, InnerBlocks } = wp.blockEditor;

function InlineTextColor( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		gutter,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	let classlist = {
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
	};

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classlist = Object.assign( classlist, [ `coblocks-row-${ coblocks.id }` ] );
	}

	const classes = classnames( classlist );

	const styles = {
		color: textClass ? undefined : customTextColor,
	};

	const innerClasses = classnames(
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ), {
			[ `has-${ gutter }-gutter` ]: gutter,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
			'is-stacked-on-mobile': isStackedOnMobile,
		}
	);

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
	};

	return (
		<div className={ classes } data-columns={ columns } data-layout={ layout } style={ styles } >
			<div className={ innerClasses } style={ innerStyles }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

function DeprecationVideo( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		gutter,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
		focalPoint,
		hasParallax,
		backgroundType,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	let classes;
	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-row-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `has-${ gutter }-gutter` ]: gutter,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
			'is-stacked-on-mobile': isStackedOnMobile,
		}
	);

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		color: textClass ? undefined : customTextColor,
	};

	return (
		<div className={ classes } data-columns={ columns } data-layout={ layout } >
			{ BackgroundVideo( attributes ) }
			<div className={ innerClasses } style={ innerStyles }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

function InlinePaddingMargins( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		gutter,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
		focalPoint,
		hasParallax,
		backgroundType,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	let classes;
	if ( coblocks && typeof coblocks.id !== 'undefined' ) {
		classes = classnames( classes, `coblocks-row-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ),
		{
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `has-${ gutter }-gutter` ]: gutter,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]:
				paddingSize && paddingSize !== 'advanced',
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && marginSize !== 'advanced',
			'is-stacked-on-mobile': isStackedOnMobile,
		}
	);

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage:
			backgroundImg && backgroundType === 'image' ?
				`url(${ backgroundImg })` :
				undefined,
		backgroundPosition:
			focalPoint && ! hasParallax ?
				`${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` :
				undefined,
		color: textClass ? undefined : customTextColor,
	};
	return (
		<div className={ classes } data-columns={ columns } data-layout={ layout }>
			<div className={ innerClasses } style={ innerStyles }>
				{ BackgroundVideo( attributes ) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

const deprecated = [
	{
		attributes,
		save: DeprecationVideo,
	},
	{
		attributes: {
			isStackedOnMobile: {
				type: 'boolean',
				default: true,
			},
			...attributes,
		},
		save: InlineTextColor,
	},
	{
		attributes: {
			...DimensionsAttributes,
			...attributes,
		},
		save: InlinePaddingMargins,
	},
];

export default deprecated;
