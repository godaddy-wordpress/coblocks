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
		counterDescription,
		counterText,
		setAttributes,
		counterSpeed,
	} = props;
	const counterClasses = classnames( blockProps.className );

	return (
		<div { ...blockProps }>
			<RichText
				className={ counterClasses }
				data-counter-speed={ counterSpeed }
				onChange={ ( nextValue ) => setAttributes( { counterText: nextValue } ) }
				placeholder={ __( '10,000', 'coblocks' ) }
				value={ counterText }
			/>
			<RichText
				className={ counterClasses }
				data-counter-speed={ counterSpeed }
				onChange={ ( nextValue ) => setAttributes( { counterDescription: nextValue } ) }
				placeholder={ __( 'Problems solved', 'coblocks' ) }
				value={ counterDescription }
			/>
		</div>
	);
};

export default Counter;
