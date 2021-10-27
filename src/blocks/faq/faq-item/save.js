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
		answer,
		customTextColor,
		question,
		textColor,
	} = attributes;

	console.log('Saving item', attributes);

	const colorClass = getColorClassName( 'color', textColor );

	const classes = classnames( className, {
		[ colorClass ]: colorClass,
		'has-text-color': textColor || customTextColor,
	} );

	return isEmpty( attributes ) ? null : (
		<dl
			className={ classes }
			style={ { color: colorClass ? undefined : customTextColor } }
		>
			<dt className="wp-block-coblocks-faq-item__question">
				<RichText.Content
					aria-controls="faq1_desc"
					aria-expanded="false" 
					className="wp-block-coblocks-faq-item__question__button"
					tagName="button"
					value={ question }
				/>
			</dt>
			<RichText.Content
				className="wp-block-coblocks-faq-item__answer"
				id="faq1_desc"
				tagName="dd"
				value={ answer }
			/>
		</dl>
	);
}
