/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, withFallbackStyles, ToggleControl } from '@wordpress/components';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, textColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	getDisplayOpenHelp( checked ) {
		return checked ? __( 'Accordion item is open by default.' ) : __( 'Toggle to set this accordion item to be open by default.' );
	}

	setBorderColor() {
		this.props.setAttributes( {
			borderColor: this.props.backgroundColor.color,
		} );

		return this.props.setBackgroundColor;
	}

	render() {
		const {
			attributes,
			setAttributes,
			backgroundColor,
			textColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			setTextColor,
		} = this.props;

		const {
			open,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Item Settings' ) }>
						<ToggleControl
							label={ _x( 'Display Open', 'Visually display open as opposed to closed.' ) }
							checked={ !! open }
							help={ this.getDisplayOpenHelp }
							onChange={ () => setAttributes( { open: ! open } ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: this.setBorderColor(),
								label: __( 'Background Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Title Text Color' ),
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
								fallbackTextColor,
								fallbackBackgroundColor,
							} }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
