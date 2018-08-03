/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Alert from './alert';
import Controls from './controls';
import Inspector from './inspector';
import Colors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { RichText } = wp.editor;

/**
 * Block edit function
 */
export default compose( Colors ) ( class AlertBlock extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			backgroundColor,
			borderColor,
			className,
			isSelected,
			mergeBlocks,
			onReplace,
			setAttributes,
			setBackgroundColor,
			setBorderColor,
			setTextColor,
			setTitleColor,
			textColor,
			titleColor,
		} = this.props;

		const {
			align,
			textAlign,
			title,
			value,
			type,
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

			<div
				className={ classnames(
					className,
					`is-${ type }-alert`,
					`align${ align }`, {
						'has-background': backgroundColor.value,
						[ backgroundColor.class ]: backgroundColor.class,
					}
				) }
				style={ {
					backgroundColor: backgroundColor.value,
					borderColor: borderColor.value,
					textAlign: textAlign,
				} }
			>
				{ ( ( title && title.length > 0 ) || isSelected ) && (
					<RichText
						tagName="p"
						placeholder={ __( 'Add title...' ) }
						value={ title }
						className={ classnames(
							`${ className }__title`, {
								'has-text-color': titleColor.value,
								[ titleColor.class ]: titleColor.class,
							}
						) }
						style={ {
							color: titleColor.value,
						} }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						keepPlaceholderOnFocus
					/>
				) }
				<RichText
					multiline="p"
					tagName="p"
					placeholder={ __( 'Write alert...' ) }
					value={ value }
					onMerge={ mergeBlocks }
					className={ classnames(
						`${ className }__text`, {
							'has-text-color': textColor.value,
							[ textColor.class ]: textColor.class,
						}
					) }
					style={ {
						color: textColor.value,
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
		];
	}
} );
