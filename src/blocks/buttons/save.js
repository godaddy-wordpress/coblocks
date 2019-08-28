/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { attributes, className } ) {
	const {
		contentAlign,
		isStackedOnMobile,
	} = attributes;

	const innerClasses = classnames(
		'wp-block-coblocks-buttons__inner', {
			[ `flex-align-${ contentAlign }` ]: contentAlign,
			'is-stacked-on-mobile': isStackedOnMobile,
		}
	);

	return (
		<div className={ className }>
			<div className={ innerClasses }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
