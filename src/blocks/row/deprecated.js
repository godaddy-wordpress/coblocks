/**
 * Internal dependencies
 */
import { BackgroundClasses, BackgroundVideo } from '../../components/background';
import metadata from './block.json';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';

function Deprecation( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		gutter,
		id,
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

	const innerClasses = [
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ),
		{ [ `has-${ gutter }-gutter` ]: gutter },
		{ 'has-padding': paddingSize && paddingSize !== 'no' },
		{ [ `has-${ paddingSize }-padding` ]: ! [ 'advanced' ].includes( paddingSize ) },
		{ 'has-margin': marginSize && marginSize !== 'no' },
		{ [ `has-${ marginSize }-margin` ]: ! [ 'advanced' ].includes( marginSize ) },
		{ 'is-stacked-on-mobile': isStackedOnMobile },
	];

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
	};

	return (
		<div className={ classes } data-id={ id } data-columns={ columns } data-layout={ layout } style={ styles } >
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
		id,
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

	let classlist = {};

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classlist = Object.assign( classlist, [ `coblocks-row-${ coblocks.id }` ] );
		classlist = Object.assign( classlist, [ `coblocks-row--${ id }` ] );
	}

	const classes = classnames( classlist );

	const innerClasses = [
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ),
		{ 'has-text-color': textColor || customTextColor },
		{ [ textClass ]: textClass },
		{ [ `has-${ gutter }-gutter` ]: gutter },
		{ 'has-padding': paddingSize && paddingSize !== 'no' },
		{ [ `has-${ paddingSize }-padding` ]: ! [ 'advanced' ].includes( paddingSize ) },
		{ 'has-margin': marginSize && marginSize !== 'no' },
		{ [ `has-${ marginSize }-margin` ]: ! [ 'advanced' ].includes( marginSize ) },
		{ 'is-stacked-on-mobile': isStackedOnMobile },
	];

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		color: textClass ? undefined : customTextColor,
	};

	return (
		<div className={ classes } data-id={ id } data-columns={ columns } data-layout={ layout } >
			{ BackgroundVideo( attributes ) }
			<div className={ innerClasses } style={ innerStyles }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

const { attributes } = metadata;

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
		save: Deprecation,
	},
];

export default deprecated;
