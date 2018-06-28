/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText, getColorClass } = wp.editor;

export default class PricingTable extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
		} = this.props;

		const {
			amount,
			amount_2,
			button,
			button_2,
			buttonBackground,
			buttonColor,
			columns,
			currency,
			currency_2,
			customButtonBackground,
			customButtonColor,
			customTableBackground,
			customTableColor,
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

		// Heading color class and styles.
		const tableColorClass = getColorClass( 'color', tableColor );
		const tableBackgroundClass = getColorClass( 'background-color', tableBackground );

		// Background color class and styles.
		const tableClasses = classnames(
			this.props.className, {
				'has-background': tableBackground || customTableBackground,
				[ tableBackgroundClass ]: tableBackgroundClass,
			}
		);

		const tableStyles = {
			backgroundColor: tableBackgroundClass ? undefined : customTableBackground,
		};

		// Text color class and styles.
		const textClasses = classnames( {
				'has-text-color': tableColor || customTableColor,
				[ tableColorClass ]: tableColorClass,
			}
		);

		const textStyles = {
			color: tableColorClass ? undefined : customTableColor,
		};

		// Button color class and styles.
		const buttonStyle = {
			backgroundColor: buttonBackground,
			color: buttonColor,
		};

		return (
			<div
				className={ tableClasses }
				style={ tableStyles }
			>
				{ this.props.title && this.props.title.length > 0 && (
					<RichText.Content
						tagName="h4"
						className={ classnames( 'pricing-table__title', textClasses ) }
						value={ this.props.title }
						style={ textStyles }
					/>
				) }

				{ this.props.amount && this.props.amount.length > 0 && (
					<div className={ 'pricing-table__price' }>
						{ this.props.currency && this.props.currency.length > 0 && (
							<RichText.Content
								tagName="span"
								className={ classnames( 'pricing-table__currency', textClasses ) }
								value={ this.props.currency }
								style={ textStyles }
							/>
						) }
						<RichText.Content
							tagName="h5"
							className={ classnames( 'pricing-table__amount', textClasses ) }
							value={ this.props.amount }
							style={ textStyles }
						/>
					</div>
				) }

				{ this.props.features && this.props.features.length > 0 && (
					<RichText.Content
						tagName="ul"
						className={ classnames( 'pricing-table__features', textClasses ) }
						value={ this.props.features }
						style={ textStyles }
					/>
				) }

				{ this.props.button && this.props.button.length > 0 && (
					<div className={ 'wp-block-button' }>
						<a className={ 'pricing-table__button wp-block-button__link' } href={ this.props.url } title={ this.props.button } style={ buttonStyle } >
							{ this.props.button }
						</a>
					</div>
				) }

			</div>
		);
	}
}
