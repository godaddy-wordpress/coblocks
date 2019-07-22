/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, ToggleControl, TextareaControl, ExternalLink, FocalPointPicker } = wp.components;
const { InspectorControls } = wp.blockEditor;

const Inspector = props => {
	const {
		attributes,
		setAttributes,
		onToggleCta,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Service Settings' ) }>
				<ToggleControl
					label={ __( 'Action Button' ) }
					help={
						attributes.showCta ?
							__( 'Showing the call to action button.' ) :
							__( 'Toggle to show a call to action button.' )
					}
					checked={ attributes.showCta }
					onChange={ onToggleCta }
				/>
			</PanelBody>
			{ attributes.imageUrl &&
				<PanelBody title={ __( 'Image Settings' ) } initialOpen={ false }>
					<TextareaControl
						label={ __( 'Alt Text (Alternative Text)' ) }
						value={ attributes.imageAlt }
						onChange={ ( value ) => setAttributes( { imageAlt: value } ) }
						help={
							<Fragment>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.' ) }
							</Fragment>
						}
					/>
					<FocalPointPicker
						label={ __( 'Focal Point' ) }
						url={ attributes.imageUrl }
						value={ attributes.focalPoint }
						onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
					/>
				</PanelBody>
			}
		</InspectorControls>
	);
};

export default Inspector;
