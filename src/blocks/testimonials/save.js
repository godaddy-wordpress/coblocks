/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { getFontSizeClass, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const {
		columns,
		customFontSize,
		fontSize,
		gutter,
		styleName,
	} = attributes;

	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, {
		[ fontSizeClass ]: fontSizeClass,
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
		[ `has-${ gutter }-gutter` ]: gutter,
		[ `is-style-${ styleName }` ]: styleName,
	} );

	const styles = {
		fontSize: fontSizeClass ? undefined : customFontSize,
	};

	return (
		<div className={ classes } data-columns={ attributes.columns } style={ styles }>
			<InnerBlocks.Content />
		</div>
	);
}
