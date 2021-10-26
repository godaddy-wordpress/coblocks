/**
 * External dependencies
 */
import { isEqual, get } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withFallbackStyles } from '@wordpress/components';
import { InspectorControls,
	PanelColorSettings,
	ContrastChecker,
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
		setAttributes,
		customTextButtonColor,
		customBackgroundButtonColor,
		className,
		attributes,
		fallbackBackgroundColor,
		fallbackTextColor,
		setBackgroundButtonColor,
		setTextButtonColor,
	} = props;

	const prevCustomTextButtonColor = usePrevious( customTextButtonColor );
	const prevCustomerBackgroundButtonColor = usePrevious( customBackgroundButtonColor );

	const backgroundColor = attributes.customBackgroundButtonColor || fallbackBackgroundColor;

	const color = attributes.customTextButtonColor || fallbackTextColor;

	const buttonStyle = { border: 'none', backgroundColor, color };

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
			'has-background': customBackgroundButtonColor,
			[ backgroundClass ]: backgroundClass,
			'has-text-color': customTextButtonColor,
			[ className ]: className,
		} );
	};

	return (
		<>
			<div className="coblocks-form__submit wp-block-button">
				<RichText
					placeholder={ __( 'Add text…', 'coblocks' ) }
					value={ attributes.submitButtonText }
					onChange={ ( nextValue ) => setAttributes( { submitButtonText: nextValue } ) }
					className={ getButtonClasses() }
					style={ buttonStyle }
					allowedFormats={ [ 'bold', 'italic', 'strikethrough' ] }
				/>
			</div>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: ( nextColor ) => {
								setBackgroundButtonColor( nextColor );
								setAttributes( { customBackgroundButtonColor: nextColor } );
							},
							label: __( 'Button color', 'coblocks' ),
						},
						{
							value: color,
							onChange: ( nextColor ) => {
								setTextButtonColor( nextColor );
								setAttributes( { customTextButtonColor: nextColor } );
							},
							label: __( 'Button text color', 'coblocks' ),
						},
					] }
				/>
				<ContrastChecker textColor={ color } backgroundColor={ backgroundColor } />
			</InspectorControls>
		</>
	);
};

export default compose( [
	withColors( 'backgroundButtonColor', { textButtonColor: 'color' } ),
	applyFallbackStyles,
] )( CoBlocksSubmitButton );
