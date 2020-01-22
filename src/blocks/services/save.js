/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { className, attributes } ) {
	const classes = classnames( 'has-columns', {
		[ `has-${ attributes.columns }-columns` ]: attributes.columns,
		'has-responsive-columns': attributes.columns > 1,
		[ `has-${ attributes.gutter }-gutter` ]: attributes.gutter,
	} );

	return (
		<div className={ className }>
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
