import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

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
			<div className={ classnames( textClasses, 'wp-block-coblocks-events__more-events-wrapper' ) } style={ textStyles }><p>More Events</p></div>
			}
		</div>
	);
}
