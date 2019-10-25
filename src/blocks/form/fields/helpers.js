/**
 * Internal dependencies
 */
import CoBlocksFieldMultiple from './multi-field';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
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
							label={ sprintf( __( 'Inline %s', 'coblocks' ), type ) }
							className="coblocks-field-label__required"
							checked={ isInline }
							onChange={ value => setAttributes( { isInline: value } ) }
							help={ !! isInline ? sprintf( __( 'Displaying the %s inline.', 'coblocks' ), type ) : sprintf( __( 'Toggle to display the %s inline.', 'coblocks' ), type ) }
						/>
					</PanelBody>
				</InspectorControls>
			) }
		</Fragment>
	);
};
