/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TextareaControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.updateAlt = this.updateAlt.bind( this );
	}

	updateAlt( newAlt ) {
		this.props.setAttributes( { alt: newAlt } );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			alt,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Gif Settings' ) }>
						<TextareaControl
							label={ __( 'Textual Alternative' ) }
							value={ alt }
							onChange={ this.updateAlt }
							help={ __( 'Describe the purpose of the image. Leave empty if the image is not a key part of the content.' ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}
