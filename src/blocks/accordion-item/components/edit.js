/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText } = wp.editor;

/**
 * Block edit function
 */
class Edit extends Component {

	render() {

		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			onReplace,
			setAttributes,
			textColor,
		} = this.props;

		const {
			content,
			open,
			title,
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
					open ? `${ className }--open` : null, {
						'is-selected': isSelected,
					}
				) }
			>
				<RichText
					tagName="p"
					placeholder={ __( 'Write accordion title...' ) }
					value={ title }
					className={ classnames(
						`${ className }__title`, {
							'has-text-color': textColor.color,
							'has-background': backgroundColor.color,
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					} }
					onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
					keepPlaceholderOnFocus
				/>
				{ open || isSelected ? (
					<div
						className={ classnames(
							`${ className }__content`, {
								'has-text-color': textColor.color,
							}
						) }
						style={ { borderColor: backgroundColor.color } }
					>
						<RichText
							tagName="p"
							placeholder={ __( 'Write text...' ) }
							value={ content }
							onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
							className={ `${ className }__text` }
							keepPlaceholderOnFocus
						/>
					</div>
				) : null }
			</div>
		];
	}
}

export default compose( [
	applyWithColors,
] )( Edit );
