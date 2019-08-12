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

/**
 * Inspector controls
 */
class Inspector extends Component {

    constructor( props ) {
        super( ...arguments );
    }

    render() {

        const {
            backgroundColor,
            setBackgroundColor,
            setTextColor,
            textColor,
            isSelected,
        } = this.props;

        return (
            <Fragment>
                <InspectorControls>
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
] )( Inspector );