/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { className, attributes } ) {
	return (
		<div className={ className }>
			<InnerBlocks.Content />
			{ attributes.childrenLength > attributes.eventsToShow &&
				<div className={ classnames( 'wp-block-coblocks-events__more-events-wrapper', 'flex' ) }>
					<p>{ __( 'More Events', 'coblocks' ) }</p>
				</div>
			}
		</div>
	);
}
