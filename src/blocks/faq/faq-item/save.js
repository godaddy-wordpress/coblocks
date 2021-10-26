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
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventYear', 'eventTime', 'eventLocation' ];
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
			<RichText.Content
				className="wp-block-coblocks-faq__question"
				tagName="dt"
				value={ question }
			/>
			<RichText.Content
				className="wp-block-coblocks-faq__answer"
				tagName="dd"
				value={ answer }
			/>
		</dl>
	);
}
