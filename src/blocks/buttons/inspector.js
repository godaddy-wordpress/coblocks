/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
	} = props;

	const {
		items,
		isStackedOnMobile,
	} = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					/* translators: block settings */
					title={ __( 'Buttons settings', 'coblocks' ) }>
					<RangeControl
						label={ __( 'Buttons', 'coblocks' ) }
						value={ items }
						onChange={ ( nextCount ) => {
							setAttributes( {
								items: parseInt( nextCount ),
							} );

							wp.data.dispatch( 'core/block-editor' ).selectBlock( clientId );
						} }
						min={ 1 }
						max={ 4 }
					/>
					<ToggleControl
						/* translators: visually stack buttons one on top of another */
						label={ __( 'Stack on mobile', 'coblocks' ) }
						checked={ isStackedOnMobile }
						onChange={ () => setAttributes( {
							isStackedOnMobile: ! isStackedOnMobile,
						} ) }
						help={ !! isStackedOnMobile ? __( 'Stacking buttons on mobile.', 'coblocks' ) : __( 'Toggle to stack buttons on mobile.', 'coblocks' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
