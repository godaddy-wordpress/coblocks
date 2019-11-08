/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, BaseControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.updateHeight = this.updateHeight.bind( this );
	}

	updateHeight( newHeight ) {
		this.props.setAttributes( { height: newHeight } );
	}

	render() {
		const {
			attributes,
			setAttributes,
			setColor,
			color,
		} = this.props;

		const {
			height,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						/* translators: hr is html markup (horizonal rule) */
						title={ __( 'Dynamic HR Settings', 'coblocks' ) }>
						<BaseControl label={ __( 'Height in pixels', 'coblocks' ) }>
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
						title={ __( 'Color Settings', 'coblocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: color.color,
								onChange: setColor,
								label: __( 'Color', 'coblocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Inspector );
