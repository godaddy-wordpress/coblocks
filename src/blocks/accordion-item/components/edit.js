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
			borderColor,
			className,
			isSelected,
			onReplace,
			setAttributes,
			textColor,
			titleBackgroundBorderColor,
			titleBackgroundColor,
			titleColor,
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
						'has-text-color': textColor.color,
						[ textColor.class ]: textColor.class,
						'has-background': backgroundColor.color,
						[ backgroundColor.class ]: backgroundColor.class,
						'is-selected': isSelected,
					}
				) }

				style={ {
					backgroundColor: backgroundColor.color,
					color: textColor.color,
				} }
			>
				<RichText
					tagName="p"
					placeholder={ __( 'Add title...' ) }
					value={ title }
					className={ `${ className }__title` }
					className={ classnames(
						`${ className }__title`, {
							'has-text-color': titleColor.color,
							[ titleColor.class ]: titleColor.class,
							'has-background': titleBackgroundColor.color,
							[ titleBackgroundColor.class ]: titleBackgroundColor.class,
						}
					) }
					style={ {
							backgroundColor: titleBackgroundColor.color,
							color: titleColor.color,
						} }
					onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
					keepPlaceholderOnFocus
				/>
				{ open || isSelected ? (
					<div
						className={ classnames(
							`${ className }__content`
						) }
					>
						<RichText
							tagName="p"
							placeholder={ __( 'Write text...' ) }
							value={ content }
							onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
							onRemove={ ( forward ) => {
								const hasEmptyTitle = ! title || title.length === 0;
								if ( ! forward && hasEmptyTitle ) {
									onReplace( [] );
								}
							} }
							className={ classnames(
								'wp-block-coblocks-accordion__content', {
									'has-text-color': textColor.color,
									[ textColor.class ]: textColor.class,
								}
							) }
							style={ {
								color: textColor.color,
							} }
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
