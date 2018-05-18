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
const { RichText } = wp.editor;

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
			onReplace,
			setAttributes,
			mergeBlocks,
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
				{ title || isSelected ? (
					<RichText
						tagName="p"
						placeholder={ __( 'Add title...' ) }
						value={ title }
						className={ `${ className }__title` }
						style={ {
							color: titleColor,
						} }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						keepPlaceholderOnFocus
					/>
				) : null }

				<div className={ `${ className }__text` }>
					<RichText
						multiline="p"
						tagName="p"
						placeholder={ __( 'Write alert...' ) }
						value={ value }
						onMerge={ mergeBlocks }
						style={ {
							color: textColor,
						} }
						onChange={ ( value ) => setAttributes( { value: value } ) }
						onRemove={ ( forward ) => {
							const hasEmptyTitle = ! title || title.length === 0;
							if ( ! forward && hasEmptyTitle ) {
								onReplace( [] );
							}
						} }
						keepPlaceholderOnFocus
					/>
				</div>
			</Alert>
		];
	}
};
