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
import { Icon } from '@wordpress/icons';
import { getColorClassName, InnerBlocks, RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'answer', 'question' ];
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
			open={ open }
			style={ { color: colorClass ? undefined : customTextColor } }
		>
			<summary className="wp-block-coblocks-faq-item__question">
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
			<div className="wp-block-coblocks-faq-item__answer">
				<InnerBlocks.Content />
			</div>
		</details>
	);
}
