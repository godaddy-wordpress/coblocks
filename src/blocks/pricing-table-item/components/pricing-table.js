/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText, getColorClassName, InnerBlocks } = wp.editor;

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
			customTableBackground,
			customTableColor,
			tableBackground,
			tableColor,
		} = attributes;

		// Color class and styles.
		const tableBackgroundClass = getColorClassName( 'background-color', tableBackground );
		const tableColorClass = getColorClassName( 'color', tableColor );

		const textClasses = classnames( {
				'has-text-color': this.props.attributes.tableColor || this.props.attributes.customTableColor,
				[ tableColorClass ]: tableColorClass,
			}
		);

		return (
			<div
				className={ classnames( className, {
					'has-background': this.props.attributes.tableBackground || this.props.attributes.customTableBackground,
					[ tableBackgroundClass ]: tableBackgroundClass,
				} ) }
				style={ { backgroundColor: tableBackgroundClass ? undefined : this.props.attributes.customTableBackground } }
			>
				{ ! RichText.isEmpty( this.props.title ) && (
					<RichText.Content
						tagName="h4"
						className={ classnames( 'pricing-table__title', textClasses ) }
						value={ this.props.title }
						style={ { color: tableColorClass ? undefined : this.props.attributes.customTableColor } }
					/>
				) }
				{ ! RichText.isEmpty( this.props.amount ) && (
					<div className={ 'pricing-table__price' }>
						{ ! RichText.isEmpty( this.props.currency ) && (
							<RichText.Content
								tagName="span"
								className={ classnames( 'pricing-table__currency', textClasses ) }
								value={ this.props.currency }
								style={ { color: tableColorClass ? undefined : this.props.attributes.customTableColor } }
							/>
						) }
						<RichText.Content
							tagName="h5"
							className={ classnames( 'pricing-table__amount', textClasses ) }
							value={ this.props.amount }
							style={ { color: tableColorClass ? undefined : this.props.attributes.customTableColor } }
						/>
					</div>
				) }
				{ ! RichText.isEmpty( this.props.features ) && (
					<RichText.Content
						tagName="ul"
						className={ classnames( 'pricing-table__features', textClasses ) }
						value={ this.props.features }
						style={ { color: tableColorClass ? undefined : this.props.attributes.customTableColor } }
					/>
				) }
				<InnerBlocks.Content />
			</div>
		);
	}
}
