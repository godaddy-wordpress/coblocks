/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const {
		columns,
		gutter,
		styleName,
	} = attributes;

	const classes = classnames( className, {
		'has-columns': columns > 1,
		'has-responsive-columns': columns > 1,
		[ `has-${ columns }-columns` ]: columns > 1,
		[ `has-${ gutter }-gutter` ]: gutter,
		[ `is-style-${ styleName }` ]: styleName,
	} );

	return (
		<div className={ classes } data-columns={ attributes.columns }>
			<InnerBlocks.Content />
		</div>
	);
}
