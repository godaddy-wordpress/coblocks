/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

const Counter = ( props ) => {
	const {
		blockProps,
		// startingCount,
		// endingCount,
		counterText,
		setAttributes,
	} = props;
	const counterClasses = classnames( blockProps.className, 'count' );

	return (
		<RichText
			{ ...blockProps }
			className={ counterClasses }
			onChange={ ( nextValue ) => setAttributes( { counterText: nextValue } ) }
			placeholder={ `${ __( '10,000', 'coblocks' ) }\n${ __( 'Hours Worked', 'coblocks' ) }` }
			value={ counterText }
		/>
	);
};

export default Counter;
