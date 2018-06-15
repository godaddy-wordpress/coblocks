/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment, compose } = wp.element;
const { InspectorControls, PanelColor, ContrastChecker } = wp.editor;
const { withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;

const ContrastCheckerWithFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor } = ownProps;
	//avoid the use of querySelector if textColor color is known and verify if node is available.
	const textNode = ! textColor && node ? node.querySelector( '[contenteditable="true"]' ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! node ? undefined : getComputedStyle( node ).backgroundColor,
		fallbackTextColor: textColor || ! textNode ? undefined : getComputedStyle( textNode ).color,
	};
} )( ContrastChecker );

/**
 * Inspector controls
 */
export default compose( applyWithColors ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.nodeRef = null;
		this.bindRef = this.bindRef.bind( this );
	}

	bindRef( node ) {
		if ( ! node ) {
			return;
		}
		this.nodeRef = node;
	}

	render() {

		const {
			attributes,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			setAttributes,
		} = this.props;

		return (
			<Fragment>
				<InspectorControls>
					<PanelColor
						colorValue={ backgroundColor.value }
						title={ __( 'Background Color' ) }
						onChange={ setBackgroundColor }
						initialOpen={ false }
					/>
					<PanelColor
						colorValue={ textColor.value }
						title={ __( 'Text Color' ) }
						onChange={ setTextColor }
						initialOpen={ false }
					/>
					{ <ContrastCheckerWithFallbackStyles
						node={ this.nodeRef }
						textColor={ textColor.value }
						backgroundColor={ backgroundColor.value }
					/> }
				</InspectorControls>
			</Fragment>
		);
	}
} );
