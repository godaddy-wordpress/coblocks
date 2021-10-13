/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundClasses, BackgroundVideo } from '../../components/background';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';

function Save( { attributes } ) {
	const {
		coblocks,
		backgroundColor,
		backgroundImg,
		columns,
		customBackgroundColor,
		customTextColor,
		id,
		layout,
		isStackedOnMobile,
		marginSize,
		paddingSize,
		textColor,
		focalPoint,
		hasParallax,
		backgroundType,
		verticalAlignment,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	let classes = classnames( {
		[ `coblocks-row--${ id }` ]: id,
	} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-row-${ coblocks.id }` );
	}

	const innerClasses = [
		'wp-block-coblocks-row__inner',
		...BackgroundClasses( attributes ),
		{ 'has-text-color': textColor || customTextColor },
		{ [ textClass ]: textClass },
		{ 'has-padding': paddingSize && paddingSize !== 'no' },
		{ [ `has-${ paddingSize }-padding` ]: ! [ 'no', 'advanced' ].includes( paddingSize ) },
		{ 'has-margin': marginSize && marginSize !== 'no' },
		{ [ `has-${ marginSize }-margin` ]: ! [ 'no', 'advanced' ].includes( marginSize ) },
		{ 'is-stacked-on-mobile': isStackedOnMobile },
		{ [ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment },
	];

	const innerStyles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		backgroundImage: backgroundImg && backgroundType === 'image' ? `url(${ backgroundImg })` : undefined,
		backgroundPosition: focalPoint && ! hasParallax ? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%` : undefined,
		color: textClass ? undefined : customTextColor,
	};

	return (
		<div className={ classes } data-id={ id } data-columns={ columns } data-layout={ layout } >
			<GutterWrapper { ...attributes }>
				<div className={ classnames( innerClasses ) } style={ innerStyles }>
					{ BackgroundVideo( attributes ) }
					<InnerBlocks.Content />
				</div>
			</GutterWrapper>
		</div>
	);
}

export default Save;
