/**
 * Internal dependencies
 */
import Alert from './alert';
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RichText } = wp.blocks;

/**
 * Block edit function
 */
export default class AlertBlock extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			align,
			backgroundColor,
			borderColor,
			textAlign,
			textColor,
			title,
			titleColor,
			value,
		} = attributes;

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
			<Alert { ...this.props }>
				{ ( ( title && title.length > 0 ) || isSelected ) && (
					<RichText
						tagName="p"
						placeholder={ __( 'Add optional title...' ) }
						value={ title }
						className={ `${ className }__title` }
						style={ {
							color: titleColor,
						} }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						keepPlaceholderOnFocus
					/>
				) }
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __( 'Write alert...' ) }
					value={ value }
					isSelected={ isSelected }
					className={ `${ className }__text` }
					style={ {
						backgroundColor: backgroundColor,
						borderColor: borderColor,
					} }
					onChange={ ( value ) => setAttributes( { value: value } ) }
					keepPlaceholderOnFocus
				/>
			</Alert>
		];
	}
}
