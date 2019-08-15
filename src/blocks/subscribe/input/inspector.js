/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import {escape} from "lodash";

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {Component, Fragment} = wp.element;
const {compose} = wp.compose;
const {InspectorControls, ContrastChecker, PanelColorSettings} = wp.blockEditor;
const {withFallbackStyles, PanelBody, TextControl} = wp.components;

const {getComputedStyle} = window;

const applyFallbackStyles = withFallbackStyles((node, ownProps) => {
    const {textColor, backgroundColor} = ownProps;
    const backgroundColorValue = backgroundColor && backgroundColor.color;
    const textColorValue = textColor && textColor.color;
    //avoid the use of querySelector if textColor color is known and verify if node is available.
    const textNode = !textColorValue && node ? node.querySelector('[contenteditable="true"]') : null;
    return {
        fallbackBackgroundColor: backgroundColorValue || !node ? undefined : getComputedStyle(node).backgroundColor,
        fallbackTextColor: textColorValue || !textNode ? undefined : getComputedStyle(textNode).color,
    };
});

/**
 * Inspector controls
 */
class Inspector extends Component {

    constructor(props) {
        super(...arguments);
    }

    render() {

        const {
            backgroundColor,
            setBackgroundColor,
            setTextColor,
            fallbackBackgroundColor,
            fallbackTextColor,
            textColor,
            isSelected,
            setAttributes,
            attributes,
        } = this.props;

        const {label} = attributes;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Input Settings')} initialOpen={false}>
                        <TextControl
                            label="Placeholder"
                            value={label}
                            onChange={value => setAttributes({label: value})}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        title={__('Color Settings')}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __('Background Color'),
                            },
                            {
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __('Text Color'),
                            },
                        ]}
                    >
                        <ContrastChecker
                            {...{
                                isLargeText: false,
                                textColor: textColor.color,
                                backgroundColor: backgroundColor.color,
                                fallbackBackgroundColor,
                                fallbackTextColor,
                            }}
                        />
                    </PanelColorSettings>
                </InspectorControls>
            </Fragment>
        );
    }
};

export default compose([
    applyWithColors,
    applyFallbackStyles
])(Inspector);