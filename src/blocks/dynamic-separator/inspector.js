/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, BaseControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		attributes: {
			height,
		},
		setAttributes,
		setColor,
		color,
		clientId,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody
					/* translators: hr is html markup (horizonal rule) */
					title={ __( 'Dynamic Separator settings', 'coblocks' ) }>
					<BaseControl id={ `height-control-${ clientId }` } label={ __( 'Height in pixels', 'coblocks' ) }>
						<input
							type="number"
							onChange={ ( event ) => {
								setAttributes( {
									height: parseInt( event.target.value, 10 ),
								} );
							} }
							aria-label={ __( 'Height for the dynamic separator element in pixels.', 'coblocks' ) }
							value={ height }
							min="20"
							step="10"
						/>
					</BaseControl>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: color.color,
							onChange: setColor,
							label: __( 'Background color', 'coblocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );
