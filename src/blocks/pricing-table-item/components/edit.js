/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Colors from './colors';
import Inspector from './inspector';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, URLInput } = wp.editor;
const { IconButton } = wp.components;

/**
 * Block edit function
 */
export default compose( Colors ) ( class Edit extends Component {

	constructor() {
		super( ...arguments );

		this.onFocusButton = this.onFocusButton.bind( this );
		this.offFocusButton = this.offFocusButton.bind( this );

		this.state = {
			buttonFocused: false,
		};
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: false,
			} );
		}
	}

	onFocusButton() {
		if ( ! this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: true,
			} );
		}
	}

	offFocusButton() {
		if ( this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: false,
			} );
		}
	}

	render() {

		const {
			attributes,
			buttonBackground,
			buttonColor,
			className,
			isSelected,
			setAttributes,
			setButtonBackground,
			setButtonColor,
			setState,
			setTableBackground,
			setTableColor,
			tableBackground,
			tableColor,
		} = this.props;

		const {
			amount,
			button,
			currency,
			features,
			title,
			url,
		} = attributes;

		const formattingControls = [ 'bold', 'italic', 'strikethrough' ];

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className, {
							'has-background': tableBackground.color,
							'has-text-color': tableColor.color,
							[ tableBackground.class ]: tableBackground.class,
							[ tableColor.class ]: tableColor.class,
						}
					) }
					style={ {
						backgroundColor: tableBackground.color,
						color: tableColor.color,
					} }
				>
					<RichText
						tagName="h4"
						className={ 'pricing-table__title' }
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						unstableOnFocus={ this.offFocusButton }
						style={ { color: tableColor.color } }
						value={ title }
						placeholder={ __( 'Plan A' ) }
						formattingControls={ formattingControls }
						keepPlaceholderOnFocus
					/>
					<div className={ 'pricing-table__price' }>
						<RichText
							tagName='span'
							className={ 'pricing-table__currency' }
							onChange={ ( nextCurrency ) => setAttributes( { currency: nextCurrency } ) }
							unstableOnFocus={ this.offFocusButton }
							style={ { color: tableColor.color } }
							value={ currency }
							placeholder={ __( '$' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>
						<RichText
							tagName='h5'
							className={ 'pricing-table__amount' }
							onChange={ ( nextAmount ) => setAttributes( { amount: nextAmount } ) }
							unstableOnFocus={ this.offFocusButton }
							style={ { color: tableColor.color } }
							value={ amount }
							placeholder={ __( '99' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

					</div>
					<RichText
						tagName='ul'
						multiline='li'
						className={ 'pricing-table__features' }
						onChange={ ( nextFeatures ) => setAttributes( { features: nextFeatures } ) }
						unstableOnFocus={ this.offFocusButton }
						value={ features }
						style={ { color: tableColor.color } }
						placeholder={ __( 'Add features' ) }
						keepPlaceholderOnFocus
					/>
						<span className={ 'wp-block-button' } title={ button }>
							<RichText
								tagName='span'
								className={ classnames(
									`pricing-table__button wp-block-button__link`, {
										'has-background': buttonBackground.color,
										[ buttonBackground.class ]: buttonBackground.class,
										'has-text-color': buttonColor.color,
										[ buttonColor.class ]: buttonColor.class,
									}
								) }
								style={ {
									backgroundColor: buttonBackground.color,
									color: buttonColor.color,
								} }
								onChange={ ( nextButton ) => setAttributes( { button: nextButton } ) }
								unstableOnFocus={ this.onFocusButton }
								value={ button }
								placeholder={ __( 'Buy Now' ) }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>
						</span>
				</div>
				{ this.state.buttonFocused && isSelected && (
					<form
						className="block-library-button__inline-link"
						onSubmit={ ( event ) => event.preventDefault() }
					>
						{ icons.link }
						<div>
							<URLInput
								value={ url }
								onChange={ ( value ) => setAttributes( { url: value } ) }
							/>
						</div>
						<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
					</form>
				) }
			</Fragment>
		];
	}
} );