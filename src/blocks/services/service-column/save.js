/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { className, attributes } ) {
	return (
		<InnerBlocks.Content />
	);
}

