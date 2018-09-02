/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText, getColorClassName } = wp.editor;

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
			buttonBackground,
			buttonColor,
			customButtonBackground,
			customButtonColor,
			customTableBackground,
			customTableColor,
			tableBackground,
			tableColor,
		} = attributes;

		// Heading color class and styles.
		const tableColorClass = getColorClassName( 'color', tableColor );
		const tableBackgroundClass = getColorClassName( 'background-color', tableBackground );
		const buttonColorClass = getColorClassName( 'color', buttonColor );
		const buttonBackgroundClass = getColorClassName( 'background-color', buttonBackground );

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
		const buttonClasses = classnames( {
				'has-background': buttonBackground || customButtonBackground,
				[ buttonBackgroundClass ]: buttonBackgroundClass,
				'has-text-color': buttonColor || customButtonColor,
				[ buttonColorClass ]: buttonColorClass,
			}
		);

		const buttonStyles = {
			backgroundColor: buttonBackgroundClass ? undefined : customButtonBackground,
			color: buttonColorClass ? undefined : customButtonColor,
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
						<RichText.Content
							tagName="a"
							className={ classnames( 'pricing-table__button', 'wp-block-button__link', buttonClasses ) }
							value={ this.props.button }
							title={ this.props.button }
							href={ this.props.url }
							style={ buttonStyles }
						/>
					</div>
				) }

			</div>
		);
	}
}
