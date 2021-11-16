/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

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
		{
			[ `has-text-align-${ contentAlign }` ]: contentAlign,
		}
	);

	const innerClasses = classnames( 'wp-block-coblocks-pricing-table__inner',
		{
			'has-columns': count > 1,
			[ `has-${ count }-columns` ]: count,
			'has-responsive-columns': count > 1,
		}
	);

	return (
		<div className={ classes }>
			<GutterWrapper { ...attributes } >
				<div className={ innerClasses } role="list">
					<InnerBlocks.Content />
				</div>
			</GutterWrapper>
		</div>
	);
};

export default save;
