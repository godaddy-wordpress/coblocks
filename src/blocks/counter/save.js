/**
 * External dependencies
 */
import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		align,
		counterDescription,
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
			{ ! RichText.isEmpty( counterDescription ) && (
				<RichText.Content
					{ ...useBlockProps.save( { className } ) }
					data-counter-speed={ counterSpeed }
					tagName="div"
					value={ counterDescription }
				/>
			) }
		</>
	);
};

export default save;
