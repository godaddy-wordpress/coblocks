const el = wp.element.createElement;
const {assign} = lodash;
const {createHigherOrderComponent} = wp.compose;
const {Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody} = wp.components;
const {PanelRow} = wp.components;
const {PanelColumn} = wp.components;
const {TextControl} = wp.components;
const {addFilter} = wp.hooks;
const {__} = wp.i18n;

const supportedBlocks = [
    'core/image',
];

const addPositioningControl = (settings, name) => {
    if (!supportedBlocks.includes(name)) {
        return settings;
    }

    console.log(settings);

    settings.attributes = assign(settings.attributes, {
        offsetX: {
            type: 'number',
            default: 0,
        },
        offsetY: {
            type: 'number',
            default: 0,
        },
        cropWidth: {
            type: 'number',
            default: 100,
        },
        cropHeight: {
            type: 'number',
            default: 100,
        }
    });

    return settings;
};

const positioningControl = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            // Do nothing if it's another block than our defined ones.
            if (!supportedBlocks.includes(props.name)) {
                return (
                    <BlockEdit {...props} />
                );
            }

            const {offsetX, offsetY, cropWidth, cropHeight} = props.attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title={__('Crop Settings')} initialOpen={false}>
                            <TextControl
                                label={__('Offset X')}
                                value={offsetX}
                                type={'number'}
                                min={0}
                                max={100}
                            />
                            <TextControl
                                label={__('Offset Y')}
                                value={offsetY}
                                type={'number'}
                                min={0}
                                max={100}
                            />
                            <TextControl
                                label={__('Width')}
                                value={cropWidth}
                                type={'number'}
                                min={0}
                                max={100}
                            />
                            <TextControl
                                label={__('Height')}
                                value={cropHeight}
                                type={'number'}
                                min={0}
                                max={100}
                            />
                        </PanelBody>
                    </InspectorControls>
                </Fragment>
            );
        };
    },
    'positioningControl'
);

addFilter('blocks.registerBlockType', 'coblocks/imagePositioning/attributes', addPositioningControl);
addFilter('editor.BlockEdit', 'coblocks/positioning', positioningControl);
