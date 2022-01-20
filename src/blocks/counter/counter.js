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
		counterText,
		setAttributes,
		counterSpeed,
	} = props;
	const counterClasses = classnames( blockProps.className );

	return (
		<RichText
			{ ...blockProps }
			className={ counterClasses }
			data-counter-speed={ counterSpeed }
			onChange={ ( nextValue ) => setAttributes( { counterText: nextValue } ) }
			placeholder={ `${ __( '10,000', 'coblocks' ) }\n${ __( 'Problems solved', 'coblocks' ) }` }
			value={ counterText }
		/>
	);
};

export default Counter;
