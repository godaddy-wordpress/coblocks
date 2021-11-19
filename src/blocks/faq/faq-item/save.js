/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
import { CaretIcon } from '@godaddy-wordpress/coblocks-icons';
import { Icon } from '@wordpress/components';
import { getColorClassName, InnerBlocks, RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'question' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

export default function save( { className, attributes } ) {
	const {
		customTextColor,
		open,
		question,
		textColor,
	} = attributes;

	const colorClass = getColorClassName( 'color', textColor );

	const classes = classnames( className, {
		[ colorClass ]: colorClass,
		'has-text-color': textColor || customTextColor,
	} );

	return isEmpty( attributes ) ? null : (
		<details
			className={ classes }
			itemProp="mainEntity"
			itemScope
			itemType="https://schema.org/Question"
			open={ open }
			style={ { color: colorClass ? undefined : customTextColor } }
		>
			<summary
				className="wp-block-coblocks-faq-item__question"
				itemProp="name">
				<RichText.Content
					className="wp-block-coblocks-faq-item__question__content"
					tagName="div"
					value={ question }
				/>
				<Icon
					className="wp-block-coblocks-faq-item__question__icon"
					icon={ CaretIcon }
				/>
			</summary>
			<div
				className="wp-block-coblocks-faq-item__answer"
				itemProp="acceptedAnswer"
				itemScope
				itemType="https://schema.org/Answer">
				<div itemProp="text">
					<InnerBlocks.Content />
				</div>
			</div>
		</details>
	);
}
