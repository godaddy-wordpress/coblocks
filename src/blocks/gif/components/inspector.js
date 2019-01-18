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
class Inspector extends Component {

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
							label={ __( 'Alt Text (Alternative Text)' ) }
							value={ alt }
							onChange={ this.updateAlt }
							help={ __( 'Alternative text describes your image to people who can’t see it. Add a short description with its key details.' ) }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
};

export default Inspector;
