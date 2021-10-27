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
import { InnerBlocks } from '@wordpress/block-editor';
import { getColorClassName, RichText } from '@wordpress/block-editor';

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
				<svg className="wp-block-coblocks-faq-item__question__icon" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.39 14.99l-1.41 1.41L12 10.43 6.02 16.4l-1.41-1.41L12 7.6l7.39 7.39z" fill="#111"/></svg>
			</summary>
			<div className="wp-block-coblocks-faq-item__answer" tabIndex="0">
				<InnerBlocks.Content />
			</div>
		</details>
	);
}
