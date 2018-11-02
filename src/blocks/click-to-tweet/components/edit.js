/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import ClickToTweet from './click-to-tweet';
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, withFontSizes } = wp.editor;
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
		} = this.props;

		const {
			buttonText,
			content,
			url,
			via,
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
				<ClickToTweet { ...this.props }>
					<RichText
						tagName="p"
						multiline="false"
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
				</ClickToTweet>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithSelect,
	applyWithColors,
	withFontSizes( 'fontSize' ),
] )( Edit );