/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, ExternalLink } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.updateAlt = this.updateAlt.bind( this );
	}

	updateAlt( newAlt ) {
		this.props.setAttributes( { alt: newAlt } );
	}

	render() {
		const { attributes } = this.props;
		const { alt } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Gif settings', 'coblocks' ) }>
						<TextareaControl
							label={ __( 'Alt text (alternative text)', 'coblocks' ) }
							value={ alt }
							onChange={ this.updateAlt }
							help={
								<Fragment>
									<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
										{ __( 'Describe the purpose of the image', 'coblocks' ) }
									</ExternalLink>
									{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
								</Fragment>
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
