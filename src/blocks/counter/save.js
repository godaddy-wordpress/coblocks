/**
 * External dependencies
 */
import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		align,
		counterSpeed,
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
					data-counter-speed={ counterSpeed }
					tagName="div"
					value={ counterText }
				/>
			) }
		</>
	);
};

export default save;
