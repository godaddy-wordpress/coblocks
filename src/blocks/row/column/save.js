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
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		coblocks,
		textColor,
		customTextColor,
		marginSize,
		paddingSize,
		contentAlign,
		verticalAlignment,
	} = attributes;
	const textClass = getColorClassName( 'color', textColor );

	let classes = classnames( {
		[ `has-text-align-${ contentAlign }` ]: contentAlign,
		[ `is-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
	} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-column-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-column__inner',
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-padding': paddingSize && paddingSize !== 'no',
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
		} );

	const innerStyles = {
		...BackgroundStyles( attributes ),
		color: textClass ? undefined : customTextColor,
	};

	return (
		<div className={ classes } >
			<div className={ innerClasses } style={ innerStyles }>
				{ BackgroundVideo( attributes ) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
