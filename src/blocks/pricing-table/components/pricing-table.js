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

		this.tableClasses = this.tableClasses.bind( this );
		this.tableStyles = this.tableStyles.bind( this );
		this.textClasses = this.textClasses.bind( this );
		this.textStyles = this.textStyles.bind( this );
	}

	tableClasses( column ) {

		const tableBackgroundClass = getColorClassName( 'background-color', this.props.attributes.tableBackground );
		const featuredTableBackgroundClass = getColorClassName( 'background-color', this.props.attributes.featuredTableBackground );

		if ( this.props.attributes.featured == column ) {
			return [
				classnames( {
					'is-featured': this.props.attributes.featured == column,
					'has-background': featuredTableBackgroundClass ? this.props.attributes.featuredTableBackground || this.props.attributes.customFeaturedTableBackground : undefined,
					[ featuredTableBackgroundClass ]: featuredTableBackgroundClass,
				} )
			]
		} else {
			return [
				classnames( {
					'has-background': this.props.attributes.tableBackground || this.props.attributes.customTableBackground,
					[ tableBackgroundClass ]: tableBackgroundClass,
				} )
			]
		}
	}

	tableStyles( column ) {

		const tableBackgroundClass = getColorClassName( 'background-color', this.props.attributes.tableBackground );
		const featuredTableBackgroundClass = getColorClassName( 'background-color', this.props.attributes.featuredTableBackground );

		if ( this.props.attributes.featured == column ) {
			return {
				backgroundColor: featuredTableBackgroundClass ? undefined : this.props.attributes.customFeaturedTableBackground,
			}
		} else {
			return {
				backgroundColor: tableBackgroundClass ? undefined : this.props.attributes.customTableBackground,
			}
		}
	}

	textClasses( column ) {

		const tableColorClass = getColorClassName( 'color', this.props.attributes.tableColor );
		const featuredTableColorClass = getColorClassName( 'color', this.props.attributes.featuredTableColor );

		if ( this.props.attributes.featured == column ) {
			return [
				classnames( {
					'has-text-color': this.props.attributes.tableColor || this.props.attributes.customTableColor,
					'has-text-color': this.props.attributes.featuredTableColor || this.props.attributes.customFeaturedTableColor,
					[ tableColorClass ]: tableColorClass,
					[ featuredTableColorClass ]: featuredTableColorClass,
				} )
			]
		} else {
			return [
				classnames( {
					'has-text-color': this.props.attributes.tableColor || this.props.attributes.customTableColor,
					[ tableColorClass ]: tableColorClass,
				} )
			]
		}
	}

	textStyles( column ) {

		const tableColorClass = getColorClassName( 'color', this.props.attributes.tableColor );
		const featuredTableColorClass = getColorClassName( 'color', this.props.attributes.featuredTableColor );

		if ( this.props.attributes.featured == column ) {
			return {
				color: tableColorClass ? undefined : this.props.attributes.customTableColor,
				color: featuredTableColorClass ? undefined : this.props.attributes.customFeaturedTableColor,
			}
		} else {
			return {
				color: tableColorClass ? undefined : this.props.attributes.customTableColor,
			}
		}
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
			customFeaturedTableBackground,
			customFeaturedTableColor,
			tableBackground,
			tableColor,
			featuredTableBackground,
			featuredTableColor,
			featured,
		} = attributes;

		// Heading color class and styles.
		const buttonColorClass = getColorClassName( 'color', buttonColor );
		const buttonBackgroundClass = getColorClassName( 'background-color', buttonBackground );

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
				className={ classnames(
						this.props.className,
						this.tableClasses( this.props.featured ),
					)
				}
				style={ this.tableStyles( this.props.featured ) }
			>
				{ this.props.title && this.props.title.length > 0 && (
					<RichText.Content
						tagName="h4"
						className={ classnames( 'pricing-table__title', this.textClasses( this.props.featured ) ) }
						value={ this.props.title }
						style={ this.textStyles( this.props.featured ) }
					/>
				) }

				{ this.props.amount && this.props.amount.length > 0 && (
					<div className={ 'pricing-table__price' }>
						{ this.props.currency && this.props.currency.length > 0 && (
							<RichText.Content
								tagName="span"
								className={ classnames( 'pricing-table__currency', this.textClasses( this.props.featured ) ) }
								value={ this.props.currency }
								style={ this.textStyles( this.props.featured ) }
							/>
						) }
						<RichText.Content
							tagName="h5"
							className={ classnames( 'pricing-table__amount', this.textClasses( this.props.featured ) ) }
							value={ this.props.amount }
							style={ this.textStyles( this.props.featured ) }
						/>
					</div>
				) }

				{ this.props.features && this.props.features.length > 0 && (
					<RichText.Content
						tagName="ul"
						className={ classnames( 'pricing-table__features', this.textClasses( this.props.featured ) ) }
						value={ this.props.features }
						style={ this.textStyles( this.props.featured ) }
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
