/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

const Inspector = () => {
	return (
		<InspectorControls>
			<PanelBody
				initialOpen={ true }
				title={ __( 'FAQ settings', 'coblocks' ) }>
				<div>Hello</div>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
