/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundStyles, BackgroundClasses, BackgroundVideo } from '../../../components/background';

/**
 * WordPress dependencies
 */
const { InnerBlocks, getColorClassName } = wp.blockEditor;

const save = ( { attributes, className } ) => {
	const {
		coblocks,
		contentAlign,
		customTextColor,
		textColor,
		paddingSize,
	} = attributes;

	// Body color class and styles.
	const textClass = getColorClassName( 'color', textColor );

	let classes = classnames(
		className, {
			[ `has-${ contentAlign }-content` ]: contentAlign,
		} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-feature-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-feature__inner',
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
		} );

	const innerStyles = {
		...BackgroundStyles( attributes ),
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
};

export default save;
