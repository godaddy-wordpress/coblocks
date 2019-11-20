/**
 * Internal dependencies
 */
import CoBlocksFieldMultiple from './multi-field';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';

export const editMultiField = type => props => {
	const { attributes, setAttributes, isSelected } = props;
	const { required, label, isInline, options } = attributes;

	return (
		<Fragment>
			<CoBlocksFieldMultiple
				label={ label }
				required={ required }
				options={ options }
				setAttributes={ setAttributes }
				type={ type }
				isSelected={ isSelected }
				isInline={ isInline }
			/>
			{ 'select' !== type && (
				<InspectorControls>
					<PanelBody title={ __( 'Display Settings', 'coblocks' ) }>
						<ToggleControl
							label={ sprintf(
								/* translators: field type eg: checkbox */
								__( 'Inline %s', 'coblocks' ),
								type
							) }
							className="coblocks-field-label__required"
							checked={ isInline }
							onChange={ value => setAttributes( { isInline: value } ) }
							help={ !! isInline ? sprintf(
								/* translators: field type eg: checkbox */
								__( 'Displaying the %s inline.', 'coblocks' ),
								type
							) : sprintf(
								/* translators: field type eg: checkbox */
								__( 'Toggle to display the %s inline.', 'coblocks' ),
								type
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
		</Fragment>
	);
};
