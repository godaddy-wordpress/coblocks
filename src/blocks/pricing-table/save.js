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
		gutter,
	} = attributes;

	const classes = classnames(
		{
			[ `has-text-align-${ contentAlign }` ]: contentAlign,
		}
	);

	const innerClasses = classnames( 'wp-block-coblocks-pricing-table__inner',
		{
			'has-columns': count > 1,
			[ `has-${ count }-columns` ]: count,
			'has-responsive-columns': count > 1,
			[ `has-${ gutter }-gutter` ]: gutter,
		}
	);

	return (

		<div className={ classes }>
			<div className={ innerClasses }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
