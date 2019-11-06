/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
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
		} = this.props;

		const {
			height,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ _x( 'Dynamic HR Settings', 'hr is html markup - horizonal rule', 'coblocks' ) }>
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
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
