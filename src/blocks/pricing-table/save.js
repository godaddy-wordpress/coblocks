/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		contentAlign,
		count,
	} = attributes;

	const classes = classnames(
		`has-${ count }-columns`,
		{ [ `has-text-align-${ contentAlign }` ]: contentAlign }
	);

	return (

		<div className={ classes }>
			<div className="wp-block-coblocks-pricing-table__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
