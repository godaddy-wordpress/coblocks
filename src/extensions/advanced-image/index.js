import AttachmentCropControl from '../../components/image-crop-control/attachment-crop-control';

const { assign } = lodash;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const supportedBlocks = [
	'core/image',
	'core/cover',
];

const addPositioningControl = ( settings, name ) => {
	if ( ! supportedBlocks.includes( name ) ) {
		return settings;
	}

	settings.attributes = assign( settings.attributes, {
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
		},
	} );

	return settings;
};

const updateDebounce = _.debounce( function( callback ) {
	callback();
}, 1500 );

const positioningControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! supportedBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const {
			attributes,
			setAttributes,
		} = props;

		const { cropX, cropY, cropWidth, cropHeight, cropRotation } = attributes;
		let currentAttributes = _.extend( {}, attributes );

		// Only Gallery images supported at this time
		if ( ! currentAttributes.id ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const updateImage = function() {
			jQuery.post( ajaxurl, {
				action: 'coblocks_system_crop',
				id: currentAttributes.id,
				cropX: currentAttributes.cropX,
				cropY: currentAttributes.cropY,
				cropWidth: currentAttributes.cropWidth,
				cropHeight: currentAttributes.cropHeight,
				cropRotation: currentAttributes.cropRotation,
			}, function( response ) {
				if ( ! response ) {
					return;
				}

				const data = JSON.parse( response );

				if ( ! data || ! data.success ) {
					return;
				}

				setAttributes( {
					id: data.id,
					url: data.url,
				} );
			} );
		};

		const applyAttributes = function( changeAttributes ) {
			setAttributes( changeAttributes );
			currentAttributes = _.extend( {}, currentAttributes, changeAttributes );
			updateDebounce( updateImage );
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody title={ __( 'Crop Settings' ) } initialOpen={ false }>
						<AttachmentCropControl
							attachmentId={ currentAttributes.id }
							offsetX={ cropX }
							offsetY={ cropY }
							cropWidth={ cropWidth }
							cropHeight={ cropHeight }
							rotation={ cropRotation }
							onChange={ ( val ) => applyAttributes( {
								cropX: val.x,
								cropY: val.y,
								cropWidth: val.w,
								cropHeight: val.h,
								cropRotation: val.r,
							} ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
},
'positioningControl'
);

addFilter( 'blocks.registerBlockType', 'coblocks/imagePositioning/attributes', addPositioningControl );
addFilter( 'editor.BlockEdit', 'coblocks/positioning', positioningControl );
