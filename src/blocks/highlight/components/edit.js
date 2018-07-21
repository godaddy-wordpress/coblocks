/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Highlighter from './highlight';
import Inspector from './inspector';

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
export default compose( applyWithColors ) ( class HighlighterBlock extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			content,
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
			<Highlighter { ...this.props }>

				<RichText
					tagName="mark"
					placeholder={ __( 'Add highlighted text...' ) }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					className={ classnames(
						`${ className }__content`, {
							'has-background': backgroundColor.value,
							[ backgroundColor.class ]: backgroundColor.class,
							'has-text-color': textColor.value,
							[ textColor.class ]: textColor.class,
						}
					) }
					style={ {
							backgroundColor: backgroundColor.class ? undefined : backgroundColor.value,
							color: textColor.class ? undefined : textColor.value,
						} }
					keepPlaceholderOnFocus
				/>

			</Highlighter>
		];
	}
} );
