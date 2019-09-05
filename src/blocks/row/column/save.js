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

const save = ( { attributes } ) => {
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
		...BackgroundClasses( attributes ), {
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-padding': paddingSize && paddingSize !== 'no',
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' ),
		} );

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
};

export default save;
