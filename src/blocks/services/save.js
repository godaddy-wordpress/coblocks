/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { className, attributes } ) {
	const classes = classnames( 'has-columns', {
		[ `has-${ attributes.columns }-columns` ]: attributes.columns,
		'has-responsive-columns': attributes.columns > 1,
	} );

	return (
		<div className={ className }>
			<GutterWrapper { ...attributes }>
				<div className={ classes }>
					<InnerBlocks.Content />
				</div>
			</GutterWrapper>
		</div>
	);
}
