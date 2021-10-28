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
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

const TEMPLATE = [
	[ 'core/paragraph', { placeholder: __( 'Enter the answer to the question', 'coblocks' ) } ],
];

const FaqItemEdit = ( props ) => {
	const {
		className,
		attributes,
		setAttributes,
		setTextColor,
		textColor,
	} = props;

	const {
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
				<div className="wp-block-coblocks-faq-item__question">
					<RichText
						className="wp-block-coblocks-faq-item__question__content"
						onChange={ ( newQuestion ) => setAttributes( { question: newQuestion } ) }
						placeholder={ __( 'Write a question', 'coblocks' ) }
						tagName="div"
						value={ question }
					/>
					<svg className="wp-block-coblocks-faq-item__question__icon" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.39 14.99l-1.41 1.41L12 10.43 6.02 16.4l-1.41-1.41L12 7.6l7.39 7.39z" /></svg>
				</div>
				<div className="wp-block-coblocks-faq-item__answer">
					<InnerBlocks
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
						__experimentalCaptureToolbars={ true }
					/>
				</div>
			</div>
		</>
	);
};

export default compose( [ applyWithColors ] )( FaqItemEdit );
