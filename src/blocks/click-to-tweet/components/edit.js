/**
 * External dependencies
 */
import classnames from 'classnames';
import pickBy from 'lodash/pickBy';
import isUndefined from 'lodash/isUndefined';

/**
 * Internal dependencies
 */
import ClickToTweet from './click-to-tweet';
import FONT_SIZES from './font-sizes';
import Inspector from './inspector';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, compose } = wp.element;
const { RichText } = wp.editor;
const { withAPIData } = wp.components;
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
export default compose( applyWithSelect ) ( class ClicktoTweetBlock extends Component {

	constructor() {
		super( ...arguments );
		this.getFontSize = this.getFontSize.bind( this );
	}

	componentWillReceiveProps( { postLink } ) {
		if ( postLink ) {
			this.props.setAttributes( {
				url: postLink
			} );
		}
	}

	getFontSize() {
		const { customFontSize, fontSize } = this.props.attributes;

		if ( fontSize ) {
			const fontSizeObj = find( FONT_SIZES, { name: fontSize } );
			if ( fontSizeObj ) {
				return fontSizeObj.size;
			}
		}

		if ( customFontSize ) {
			return customFontSize;
		}
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			buttonText,
			content,
			buttonColor,
			textAlign,
			textColor,
			url,
			via,
		} = attributes;

		const fontSize = this.getFontSize();

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
			<ClickToTweet { ...this.props }>
				<RichText
					tagName="p"
					key="editable"
					multiline="false"
					placeholder={ __( 'Add a quote to tweet...' ) }
					value={ content }
					className={ `${ className }__text` }
					formattingControls={ [] }
					style={ {
						color: textColor,
						fontSize: fontSize ? fontSize + 'px' : undefined,
					} }
					onChange={ ( nextContent ) => {
						setAttributes( {
							content: nextContent,
						} );
					} }
					keepPlaceholderOnFocus
				/>

				<RichText
					tagName="span"
					key="editable-via"
					placeholder={ __( 'Add button...' ) }
					value={ buttonText }
					className={ `${ className }__twitter-btn` }
					formattingControls={ [] }
					style={ {
						backgroundColor: buttonColor
					} }
					onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					keepPlaceholderOnFocus
				/>
			</ClickToTweet>
		];
	}
} );