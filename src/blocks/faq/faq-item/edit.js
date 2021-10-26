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
					placeholder={ __( 'Write FAQ question…', 'coblocks' ) }
					tagName="dt"
					value={ question }
				/>
				<RichText
					className="wp-block-coblocks-faq-item__answer"
					onChange={ ( newAnswer ) => setAttributes( { answer: newAnswer } ) }
					placeholder={ __( 'Write FAQ answer…', 'coblocks' ) }
					tagName="dd"
					value={ answer }
				/>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( FaqItemEdit );
