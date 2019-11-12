/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, TextareaControl, ExternalLink, FocalPointPicker } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		attributes,
		setAttributes,
		onToggleCta,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Service Settings', 'coblocks' ) }>
				<ToggleControl
					label={ __( 'Action Button', 'coblocks' ) }
					help={
						attributes.showCta ?
							__( 'Showing the call to action button.', 'coblocks' ) :
							__( 'Toggle to show a call to action button.', 'coblocks' )
					}
					checked={ attributes.showCta }
					onChange={ onToggleCta }
				/>
			</PanelBody>
			{ attributes.imageUrl &&
				<PanelBody title={ __( 'Image Settings', 'coblocks' ) } initialOpen={ false }>
					<TextareaControl
						label={ __( 'Alt Text (Alternative Text)', 'coblocks' ) }
						value={ attributes.imageAlt }
						onChange={ ( value ) => setAttributes( { imageAlt: value } ) }
						help={
							<Fragment>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image', 'coblocks' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
							</Fragment>
						}
					/>
					<FocalPointPicker
						label={ __( 'Focal Point', 'coblocks' ) }
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
