/**
 * External dependencies
 */
import classnames from 'classnames';
import { get, isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { withFallbackStyles } from '@wordpress/components';
import { compose, usePrevious } from '@wordpress/compose';
import { ContrastChecker,
	InspectorControls,
	PanelColorSettings,
	RichText,
	withColors,
} from '@wordpress/block-editor';

const { getComputedStyle } = window;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textButtonColor, backgroundButtonColor } = ownProps;
	const backgroundColorValue = backgroundButtonColor && backgroundButtonColor.color;
	const textColorValue = textButtonColor && textButtonColor.color;
	//avoid the use of querySelector if textColor color is known and verify if node is available.

	let textNode;
	let button;

	if ( ! textColorValue && node ) {
		textNode = node.querySelector( '[contenteditable="true"]' );
	}

	if ( node.querySelector( '.wp-block-button__link' ) ) {
		button = node.querySelector( '.wp-block-button__link' );
	} else {
		button = node;
	}

	let fallbackBackgroundColor;
	let fallbackTextColor;

	if ( node ) {
		fallbackBackgroundColor = getComputedStyle( button ).backgroundColor;
	}

	if ( textNode ) {
		fallbackTextColor = getComputedStyle( textNode ).color;
	}

	return {
		fallbackBackgroundColor: fallbackBackgroundColor || backgroundColorValue || false,
		fallbackTextColor: fallbackTextColor || textColorValue || false,
	};
} );

const CoBlocksSubmitButton = ( props ) => {
	const {
		attributes,
		customTextButtonColor,
		customBackgroundButtonColor,
		className,
		setAttributes,
		setBackgroundButtonColor,
		setTextButtonColor,
	} = props;

	const prevCustomTextButtonColor = usePrevious( customTextButtonColor );
	const prevCustomerBackgroundButtonColor = usePrevious( customBackgroundButtonColor );

	const backgroundColor = attributes.customBackgroundButtonColor;
	const color = attributes.customTextButtonColor;

	const buttonStyle = { backgroundColor, border: 'none', color };

	useEffect( () => {
		if (
			! isEqual( customTextButtonColor, prevCustomTextButtonColor ) ||
			! isEqual( customBackgroundButtonColor, prevCustomerBackgroundButtonColor )
		) {
			setAttributes( { submitButtonClasses: getButtonClasses() } );
		}
	}, [ customTextButtonColor, prevCustomTextButtonColor, customBackgroundButtonColor, prevCustomerBackgroundButtonColor ] );

	const getButtonClasses = () => {
		const backgroundClass = get( customBackgroundButtonColor, 'class' );

		return classnames( 'wp-block-button__link', {
			[ backgroundClass ]: backgroundClass,
			[ className ]: className,
			'has-background': customBackgroundButtonColor,
			'has-text-color': customTextButtonColor,
		} );
	};

	return (
		<>
			<div className="coblocks-form__submit wp-block-button">
				<RichText
					allowedFormats={ [ 'bold', 'italic', 'strikethrough' ] }
					className={ getButtonClasses() }
					onChange={ ( nextValue ) => setAttributes( { submitButtonText: nextValue } ) }
					placeholder={ __( 'Add text…', 'coblocks' ) }
					style={ buttonStyle }
					value={ attributes.submitButtonText }
				/>
			</div>
			<InspectorControls>
				<PanelColorSettings
					colorSettings={ [
						{
							label: __( 'Button color', 'coblocks' ),
							onChange: ( nextColor ) => {
								setBackgroundButtonColor( nextColor );
								setAttributes( { customBackgroundButtonColor: nextColor } );
							},
							value: backgroundColor,
						},
						{
							label: __( 'Button text color', 'coblocks' ),
							onChange: ( nextColor ) => {
								setTextButtonColor( nextColor );
								setAttributes( { customTextButtonColor: nextColor } );
							},
							value: color,
						},
					] }
					initialOpen={ false }
					title={ __( 'Color settings', 'coblocks' ) }
				/>
				<ContrastChecker backgroundColor={ backgroundColor } textColor={ color } />
			</InspectorControls>
		</>
	);
};

export default compose( [
	withColors( 'backgroundButtonColor', { textButtonColor: 'color' } ),
	applyFallbackStyles,
] )( CoBlocksSubmitButton );
