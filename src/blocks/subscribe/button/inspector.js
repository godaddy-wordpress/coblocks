/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.blockEditor;
const { withFallbackStyles } = wp.components;
const { PanelBody, TextControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {

        const {
            attributes,
            backgroundColor,
            setBackgroundColor,
            setTextColor,
            fallbackBackgroundColor,
            fallbackTextColor,
            textColor,
            isSelected,
            setAttributes,
        } = this.props;

        const { buttonLabel } = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Button Settings')} initialOpen={false}>
                        <TextControl
                            label="Button Label"
                            value={buttonLabel}
                            onChange={value => setAttributes({buttonLabel: value})}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        title={ __( 'Color Settings' ) }
                        colorSettings={ [
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __( 'Background Color' ),
                            },
                            {
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __( 'Text Color' ),
                            },
                        ] }
                    >
                        <ContrastChecker
                            { ...{
                                isLargeText: false,
                                textColor: textColor.color,
                                backgroundColor: backgroundColor.color,
                            } }
                        />
                    </PanelColorSettings>
                </InspectorControls>
            </Fragment>
        );
    }
};

export default compose( [
    applyWithColors,
    applyFallbackStyles
] )( Inspector );