import lightboxStyleOptions from './options';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, SelectControl, ToggleControl } = wp.components;

/**
 * Gutter Controls Component
 */
class LightboxControl extends Component {

	constructor() {
		super( ...arguments );
		this.setLightboxTo = this.setLightboxTo.bind( this );
		this.setLightboxStyleTo = this.setLightboxStyleTo.bind( this );
	}

	setLightboxTo() {
		this.props.setAttributes( { lightbox: ! this.props.attributes.lightbox } );
	}

	setLightboxStyleTo( value ) {
		this.props.setAttributes( { lightboxStyle: value } );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			lightbox,
			lightboxStyle,
		} = attributes;

		return (
			<Fragment>
			<div className="components-blockgallery-inspector__lightbox">
				<ToggleControl
					label={ __( 'Enable Lightbox' ) }
					checked={ !! lightbox }
					onChange={ this.setLightboxTo }
				/>
				{ lightbox && <SelectControl
					label={ __( 'Lightbox style' ) }
					value={ lightboxStyle }
					onChange={ this.setLightboxStyleTo }
					options={ lightboxStyleOptions }
					className="components-blockgallery-inspector__lightbox-style"
				/> }
				</div>
			</Fragment>
		);
	}
}

export default LightboxControl;