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
const { InnerBlocks, RichText } = wp.editor;

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading', 'core/list', 'core/image', 'core/columns', 'core/column', 'coblocks/row', 'coblocks/column', 'coblocks/highlight', 'coblocks/alert',  'coblocks/social' ];

const TEMPLATE = [ [ 'core/paragraph', { placeholder: 'Add content...' } ] ];

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
			open,
			title,
		} = attributes;

		return [
			<Fragment>
				<Controls
					{ ...this.props }
				/>
				<Inspector
					{ ...this.props }
				/>
				<div
					className={ classnames(
						className,
						isSelected ? `${ className }--open` : null,
						open ? `${ className }--open` : null, {
							'is-selected': isSelected,
						}
					) }
				>
					<RichText
						tagName="p"
						placeholder={ __( 'Add accordion title...' ) }
						value={ title }
						className={ classnames(
							`${ className }__title`, {
								'has-background': backgroundColor.color,
								'has-text-color': textColor.color,
							}
						) }
						style={ {
							backgroundColor: backgroundColor.color,
							color: textColor.color,
						} }
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						keepPlaceholderOnFocus
					/>
					<div
						className={ `${ className }__content`  }
						style={ { borderColor: backgroundColor.color } }
						>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyWithColors,
] )( Edit );
