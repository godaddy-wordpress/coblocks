/**
 * Internal dependencies
 */
import GutterControl from '../../components/gutter-control/gutter-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		attributes,
	} = props;

	const {
		count,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Pricing Table settings', 'coblocks' ) }>
				{ count > 1 && <GutterControl { ...props } /> }
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
