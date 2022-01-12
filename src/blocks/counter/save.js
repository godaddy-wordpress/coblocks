/**
 * External dependencies
 */
import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		align,
		// startingCount,
		// endingCount,
		counterText,
	} = attributes;

	const className = classnames( 'wp-block-coblocks-counter', {
		[ `has-text-align-${ align }` ]: align,
	} );

	return (
		<>
			{ ! RichText.isEmpty( counterText ) && (
				<RichText.Content
					{ ...useBlockProps.save( { className } ) }
					tagName="div"
					value={ counterText }
				/>
			) }
		</>
	);
};

export default save;
