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
import { CaretIcon } from '@godaddy-wordpress/coblocks-icons';
import { compose } from '@wordpress/compose';
import { Icon } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
			<InspectorControls { ...props } />
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
					<Icon
						className="wp-block-coblocks-faq-item__question__icon"
						icon={ CaretIcon }
					/>
				</div>
				<div className="wp-block-coblocks-faq-item__answer">
					<InnerBlocks
						__experimentalCaptureToolbars={ true }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</div>
		</>
	);
};

export default compose( [ applyWithColors ] )( FaqItemEdit );
