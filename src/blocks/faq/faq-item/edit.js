/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import applyWithColors from './colors';
import InspectorControls from './inspector';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';

const FaqItemEdit = ( props ) => {
	const {
		className,
		attributes,
		setAttributes,
		setTextColor,
		textColor,
	} = props;

	const {
		answer,
		question,
	} = attributes;

	const textStyles = {
		color: textColor.color,
	};

	useEffect( () => {
		if ( ( attributes.externalChange ) ) {
			setAttributes( { textColor: attributes.textColor } );
			setTextColor( attributes.textColor );
		}
	}, [ attributes ] );

	return (
		<>
			<InspectorControls { ...props }
			/>
			<div
				className={ classnames( className,
					{
						'has-text-color': textColor.color,
						[ textColor.class ]: textColor.class,
					}
				) }
				style={ textStyles }
			>
				<RichText
					className="wp-block-coblocks-faq-item__question"
					onChange={ ( newQuestion ) => setAttributes( { question: newQuestion } ) }
					placeholder={ __( 'Write a question', 'coblocks' ) }
					tagName="dt"
					value={ question }
				/>
				<RichText
					className="wp-block-coblocks-faq-item__answer"
					onChange={ ( newAnswer ) => setAttributes( { answer: newAnswer } ) }
					placeholder={ __( 'Enter the answer to the question', 'coblocks' ) }
					tagName="dd"
					value={ answer }
				/>
			</div>
		</>
	);
};

const applyWithSelect = withSelect( ( select, props ) => {
	const {
		getBlockRootClientId,
		getBlockSelectionStart,
		getBlocksByClientId,
	} = select( 'core/block-editor' );

	const selectedClientId = getBlockSelectionStart();
	const parentClientId = getBlockRootClientId( selectedClientId );
	const innerItems = getBlocksByClientId( props.clientId )[ 0 ].innerBlocks;

	return {
		getBlockRootClientId,
		getBlockSelectionStart,
		getBlocksByClientId,
		innerItems,
		selectedParentClientId: parentClientId,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const {
		insertBlocks,
		removeBlocks,
		updateBlockAttributes,
	} = dispatch( 'core/block-editor' );

	return {
		insertBlocks,
		removeBlocks,
		updateBlockAttributes,
	};
} );

export default compose( [ applyWithColors, applyWithDispatch, applyWithSelect ] )( FaqItemEdit );
