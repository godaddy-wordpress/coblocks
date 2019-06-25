/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, withFontSizes } = wp.blockEditor;
const { withSelect } = wp.data;

/**
 * Block constants
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getPermalink } = select( 'core/editor' );

	return {
		postLink: getPermalink(),
	};
} );

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	componentWillReceiveProps( { postLink } ) {
		if ( postLink ) {
			this.props.setAttributes( {
				url: postLink
			} );
		}
	}

	render() {
		const {
			attributes,
			buttonColor,
			className,
			isSelected,
			setAttributes,
			setButtonColor,
			setTextColor,
			textColor,
			fallbackButtonColor,
			fallbackTextColor,
			fallbackFontSize,
			fontSize,
			onReplace,
		} = this.props;

		const {
			buttonText,
			content,
			url,
			via,
			textAlign,
		} = attributes;

		return [
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<blockquote className={ className } style={ { textAlign: textAlign } }>
					<RichText
						tagName="p"
						multiline="false"
						/* translators: the text of the click to tweet element */
						placeholder={ __( 'Add a quote to tweet...' ) }
						value={ content }
						formattingControls={ [] } // disable controls
						className={ classnames(
							`${ className }__text`, {
								'has-text-color': textColor.color,
								[ textColor.class ]: textColor.class,
								[ fontSize.class ]: fontSize.class,
							}
						) }
						style={ {
							color: textColor.color,
							fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
						} }
						onChange={ ( nextContent ) => setAttributes( { content: nextContent } ) }
						keepPlaceholderOnFocus
						onRemove={ ( forward ) => {
							const hasEmptyTweet = content.length === 0 || content.length === 1;

							if ( ! forward && hasEmptyTweet ) {
								onReplace( [] );
							}
						} }
					/>
					<RichText
						tagName="span"
						multiline="false"
						placeholder={ __( 'Add button...' ) }
						value={ buttonText }
						formattingControls={ [] } // disable controls
						className={ classnames(
							`${ className }__twitter-btn`, {
								'has-button-color': buttonColor.color,
								[ buttonColor.class ]: buttonColor.class,
							}
						) }
						style={ {
							backgroundColor: buttonColor.color,
						} }
						onChange={ ( nextButtonText ) => setAttributes( { buttonText: nextButtonText } ) }
						keepPlaceholderOnFocus
					/>
				</blockquote>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithSelect,
	applyWithColors,
	withFontSizes( 'fontSize' ),
] )( Edit );