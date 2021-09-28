/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, ExternalLink } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		setAttributes,
		attributes,
	} = props;

	const { alt } = attributes;

	const updateAlt = ( newAlt ) => {
		setAttributes( { alt: newAlt } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Gif settings', 'coblocks' ) }>
					<TextareaControl
						label={ __( 'Alt text (alternative text)', 'coblocks' ) }
						value={ alt }
						onChange={ updateAlt }
						help={
							<>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image', 'coblocks' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
							</>
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
