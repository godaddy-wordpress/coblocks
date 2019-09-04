/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundStyles, BackgroundClasses, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
const { InnerBlocks, getColorClassName } = wp.blockEditor;

const save = ( { attributes, className } ) => {
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
};

export default save;
