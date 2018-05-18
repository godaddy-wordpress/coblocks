/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RichText, UrlInput } = wp.blocks;
const { Dashicon, IconButton, withState } = wp.components;

/**
 * Block edit function
 */
export default withState( { editable: 'title' } ) ( class PricingTableBlock extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			editable,
			setState,
			setAttributes,
			toggleSelection,
		} = this.props;

		const {
			align,
			amount,
			amount_2,
			button,
			button_2,
			buttonBackground,
			buttonColor,
			columns,
			currency,
			currency_2,
			features,
			features_2,
			layout,
			tableBackground,
			tableColor,
			title,
			title_2,
			url,
			url_2,
		} = attributes;

		const onSetActiveEditable = ( newEditable ) => () => {
			setState( { editable: newEditable } );
		};

		const formattingControls = [ 'bold', 'italic', 'strikethrough' ];

		return [
			isSelected && (
				<Controls
					{ ...this.props }
				/>
			),
			isSelected && (
				<Inspector
					{ ...this.props }
				/>
			),

			<div className={ className + ' pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

				<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: tableBackground } }>

					<RichText
						tagName="h4"
						className={ 'pricing-table__title' }
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						style={ { color: tableColor } }
						value={ title }
						placeholder={ __( 'Plan A' ) }
						isSelected={ isSelected && editable === 'title' }
						onFocus={ onSetActiveEditable( 'title' ) }
						formattingControls={ formattingControls }
						keepPlaceholderOnFocus
					/>

					<div className={ 'pricing-table__price' }>

						<RichText
							tagName='span'
							className={ 'pricing-table__currency' }
							onChange={ ( nextCurrency ) => setAttributes( { currency: nextCurrency } ) }
							style={ { color: tableColor } }
							value={ currency }
							placeholder={ __( '$' ) }
							isSelected={ isSelected && editable === 'currency' }
							onFocus={ onSetActiveEditable( 'currency' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

						<RichText
							tagName='h5'
							className={ 'pricing-table__amount' }
							onChange={ ( nextAmount ) => setAttributes( { amount: nextAmount } ) }
							style={ { color: tableColor } }
							value={ amount }
							placeholder={ __( '99' ) }
							isSelected={ isSelected && editable === 'amount' }
							onFocus={ onSetActiveEditable( 'amount' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

					</div>

					<RichText
						tagName='ul'
						multiline='li'
						className={ 'pricing-table__features' }
						onChange={ ( nextFeatures ) => setAttributes( { features: nextFeatures } ) }
						value={ features }
						style={ { color: tableColor } }
						placeholder={ __( 'Add features' ) }
						isSelected={ isSelected && editable === 'features' }
						onFocus={ onSetActiveEditable( 'features' ) }
						keepPlaceholderOnFocus
					/>

					{ ( ( button && button.length > 0 ) || isSelected ) && (
						<span className={ 'wp-block-button' } title={ button }>
							<RichText
								tagName='span'
								className="pricing-table__button wp-block-button__link"
								onChange={ ( nextButton ) => setAttributes( { button: nextButton } ) }
								value={ button }
								placeholder={ __( 'Buy Now' ) }
								isSelected={ isSelected && editable === 'button' }
								onFocus={ onSetActiveEditable( 'button' ) }
								style={ {
									backgroundColor: buttonBackground,
									color: buttonColor,
								} }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>
						</span>
					) }

				</div>

				{ ( columns >= 2 ) && (

					<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: tableBackground } }>

						<RichText
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ ( nextTitle ) => setAttributes( { title_2: nextTitle } ) }
							style={ { color: tableColor } }
							value={ title_2 }
							placeholder={ __( 'Plan B' ) }
							isSelected={ isSelected && editable === 'title_2' }
							onFocus={ onSetActiveEditable( 'title_2' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<RichText
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ ( nextCurrency ) => setAttributes( { currency_2: nextCurrency } ) }
								style={ { color: tableColor } }
								value={ currency_2 }
								placeholder={ __( '$' ) }
								isSelected={ isSelected && editable === 'currency_2' }
								onFocus={ onSetActiveEditable( 'currency_2' ) }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>

							<RichText
								tagName='h5'
								className={ 'pricing-table__amount' }
								onChange={ ( nextAmount ) => setAttributes( { amount_2: nextAmount } ) }
								style={ { color: tableColor } }
								value={ amount_2 }
								placeholder={ __( '99' ) }
								isSelected={ isSelected && editable === 'amount_2' }
								onFocus={ onSetActiveEditable( 'amount_2' ) }
								formattingControls={ formattingControls }
								keepPlaceholderOnFocus
							/>

						</div>

						<RichText
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ ( nextFeatures ) => setAttributes( { features_2: nextFeatures } ) }
							value={ features_2 }
							style={ { color: tableColor } }
							placeholder={ __( 'Add features' ) }
							isSelected={ isSelected && editable === 'features_2' }
							onFocus={ onSetActiveEditable( 'features_2' ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button_2 && button_2.length > 0 ) || isSelected ) && (
							<span className={ 'wp-block-button' } title={ button_2 }>
								<RichText
									tagName='span'
									className="pricing-table__button wp-block-button__link"
									onChange={ ( nextButton ) => setAttributes( { button_2: nextButton } ) }
									value={ button_2 }
									placeholder={ __( 'Buy Now' ) }
									isSelected={ isSelected && editable === 'button_2' }
									onFocus={ onSetActiveEditable( 'button_2' ) }
									style={ {
										backgroundColor: buttonBackground,
										color: buttonColor,
									} }
									formattingControls={ formattingControls }
									keepPlaceholderOnFocus
								/>
							</span>
						) }

					</div>
				) }

			</div>,
			isSelected && ( editable === 'button' || editable === 'button_2' ) && (
				<form
					className="core-blocks-button__inline-link"
					onSubmit={ ( event ) => event.preventDefault() }>
					<Dashicon icon="admin-links" />

					{ ( isSelected && editable === 'button' ) && (
						<UrlInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
					) }

					{ editable === 'button_2' && (
						<UrlInput
							value={ url_2 }
							onChange={ ( value ) => setAttributes( { url_2: value } ) }
						/>
					) }
					<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
				</form>
			)
		];
	}
} );