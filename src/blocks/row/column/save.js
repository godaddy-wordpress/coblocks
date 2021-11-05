/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../../components/background';

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks } from '@wordpress/block-editor';

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
			'has-margin': marginSize && marginSize !== 'no',
			'has-padding': paddingSize && paddingSize !== 'no',
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `has-${ paddingSize }-padding` ]:
				paddingSize && ! [ 'no', 'advanced' ].includes( paddingSize ),
			[ `has-${ marginSize }-margin` ]: marginSize && ! [ 'no', 'advanced' ].includes( marginSize ),
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
