/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, TextareaControl, ExternalLink, FocalPointPicker } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			{ attributes.imageUrl &&
				<PanelBody title={ __( 'Image settings', 'coblocks' ) } initialOpen={ false }>
					<TextareaControl
						label={ __( 'Alt text (alternative text)', 'coblocks' ) }
						value={ attributes.imageAlt }
						onChange={ ( value ) => setAttributes( { imageAlt: value } ) }
						help={
							<>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image', 'coblocks' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
							</>
						}
					/>
					<FocalPointPicker
						label={ __( 'Focal point', 'coblocks' ) }
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
