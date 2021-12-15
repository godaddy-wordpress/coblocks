/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ExternalLink, FocalPointPicker, PanelBody, TextareaControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		alt,
		focalPoint,
		showImage,
		showRole,
		url,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Item settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					checked={ showImage }
					help={
						showImage
							? __( 'Showing an image for this item.', 'coblocks' )
							: __( 'Toggle to show an image for this item.', 'coblocks' )
					}
					label={ __( 'Customer Image', 'coblocks' ) }
					onChange={ () => setAttributes( { showImage: ! showImage } ) }
				/>
				<ToggleControl
					checked={ showRole }
					help={
						showRole
							? __( 'Showing the role of each reviewer.', 'coblocks' )
							: __( 'Toggle to show the role for this item.', 'coblocks' )
					}
					label={ __( 'Customer Role', 'coblocks' ) }
					onChange={ () => setAttributes( { showRole: ! showRole } ) }
				/>
			</PanelBody>
			{ url &&
				<PanelBody
					initialOpen={ false }
					title={ __( 'Image settings', 'coblocks' ) }>
					<TextareaControl
						help={
							<Fragment>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image', 'coblocks' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
							</Fragment>
						}
						label={ __( 'Alt text (alternative text)', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { alt: value } ) }
						value={ alt }
					/>
					<FocalPointPicker
						label={ __( 'Focal point', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
						url={ url }
						value={ focalPoint }
					/>
				</PanelBody>
			}
		</InspectorControls>
	);
};

export default Inspector;
