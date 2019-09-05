/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;

const save = ( { attributes } ) => {
	const {
		contentAlign,
		count,
	} = attributes;

	const classes = classnames(
		`has-${ count }-columns`,
		`has-${ contentAlign }-content`,
	);

	return (

		<div
			className={ classes }
			style={ { textAlign: contentAlign ? contentAlign : null } }
		>
			<div className="wp-block-coblocks-pricing-table__inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
