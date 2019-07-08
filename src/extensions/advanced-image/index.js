const el = wp.element.createElement;
const {assign} = lodash;
const {createHigherOrderComponent} = wp.compose;
const {Fragment} = wp.element;
const {InspectorControls} = wp.editor;
const {PanelBody} = wp.components;
const {PanelRow} = wp.components;
const {PanelColumn} = wp.components;
const {TextControl} = wp.components;
const {ButtonGroup} = wp.components;
const {Button} = wp.components;
const {addFilter} = wp.hooks;
const {__} = wp.i18n;

const supportedBlocks = [
    'core/image',
];

const addPositioningControl = (settings, name) => {
    if (!supportedBlocks.includes(name)) {
        return settings;
    }

    settings.attributes = assign(settings.attributes, {
        cropX: {
            type: 'number',
            default: 0,
        },
        cropY: {
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
        },
        cropRotation: {
            type: 'number',
            default: 0,
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

            const {
                attributes,
                setAttributes
            } = props;

            const {cropX, cropY, cropWidth, cropHeight, cropRotation} = attributes;

            const applyAttributes = function (changeAttributes) {
                setAttributes(changeAttributes);

                const finalAttributes = _.extend({}, attributes, changeAttributes);

                jQuery.post(ajaxurl, {
                    'action': 'coblocks_system_crop',
                    'id': finalAttributes.id,
                    'cropX': finalAttributes.cropX,
                    'cropY': finalAttributes.cropY,
                    'cropWidth': finalAttributes.cropWidth,
                    'cropHeight': finalAttributes.cropHeight,
                    'cropRotation': finalAttributes.cropRotation
                }, function (response) {
                    if (!response) {
                        return;
                    }

                    const data = JSON.parse(response);

                    if (!data || !data.success) {
                        return;
                    }

                    setAttributes({
                        id: data.id,
                        url: data.url
                    });
                });
            };

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    <InspectorControls>
                        <PanelBody title={__('Crop Settings')} initialOpen={false}>
                            <TextControl
                                label={__('Offset X (%)')}
                                value={cropX}
                                type={'number'}
                                min={0}
                                max={100}
                                onChange={(val) => applyAttributes({cropX: parseInt(val)})}
                            />
                            <TextControl
                                label={__('Offset Y (%)')}
                                value={cropY}
                                type={'number'}
                                min={0}
                                max={100}
                                onChange={(val) => applyAttributes({cropY: parseInt(val)})}
                            />
                            <TextControl
                                label={__('Width (%)')}
                                value={cropWidth}
                                type={'number'}
                                min={0}
                                max={100}
                                onChange={(val) => applyAttributes({cropWidth: parseInt(val)})}
                            />
                            <TextControl
                                label={__('Height (%)')}
                                value={cropHeight}
                                type={'number'}
                                min={0}
                                max={100}
                                onChange={(val) => applyAttributes({cropHeight: parseInt(val)})}
                            />
                            <ButtonGroup>
                                <Button
                                    isDefault
                                    isPrimary={cropRotation === 0}
                                    onClick={() => applyAttributes({cropRotation: 0})}
                                >
                                    0°
                                </Button>
                                <Button
                                    isDefault
                                    isPrimary={cropRotation === 90}
                                    onClick={() => applyAttributes({cropRotation: 90})}
                                >
                                    90°
                                </Button>
                                <Button
                                    isDefault
                                    isPrimary={cropRotation === 180}
                                    onClick={() => applyAttributes({cropRotation: 180})}
                                >
                                    180°
                                </Button>
                                <Button
                                    isDefault
                                    isPrimary={cropRotation === 270}
                                    onClick={() => applyAttributes({cropRotation: 270})}
                                >
                                    270°
                                </Button>
                            </ButtonGroup>
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
