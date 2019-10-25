/**
 * Internal dependencies
 */
import CoBlocksFieldLabel from '../field-label';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { TextControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

function CoBlocksFieldHidden( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { label, value } = attributes;

	return (
		<Fragment>
			<CoBlocksFieldLabel
				label={ label }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				showRequiredToggle={ false }
			/>
			<TextControl
				value={ value }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Hidden Field Settings', 'coblocks' ) }>
					<TextControl
						value={ value }
						label={ __( 'Field Value', 'coblocks' ) }
						onChange={ value => setAttributes( { value } ) }
						className="components-block-coblocks-map-api-key__custom-input"
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}

export default CoBlocksFieldHidden;
