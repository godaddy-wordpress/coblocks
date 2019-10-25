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
	const textClasses = classnames(
		{
			'has-text-color': attributes.textColor,
			[ attributes.textColor ]: attributes.textColor,
		}
	);

	const textStyles = {
		color: attributes.textColor,
	};

	return (
		<div className={ className }>
			<InnerBlocks.Content />
			{ attributes.childrenLength > attributes.eventsToShow &&
				<div className={ classnames( textClasses, 'wp-block-coblocks-events__more-events-wrapper', 'flex' ) } style={ textStyles }>
					<p>{ __( 'More Events', 'coblocks' ) }</p>
				</div>
			}
		</div>
	);
}
