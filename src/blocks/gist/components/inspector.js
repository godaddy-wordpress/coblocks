/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.updateURL = this.updateURL.bind( this );
		this.updateFile = this.updateFile.bind( this );
	}

	updateURL( newURL ) {
		this.props.setAttributes( { url: newURL } );
	}

	updateFile( newFile ) {
		this.props.setAttributes( { file: newFile } );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			url,
			file,
			meta
		} = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Gist Settings' ) }>
					<TextControl
						label={ __( 'Gist URL' ) }
						value={ url }
						onChange={ this.updateURL }
					/>
					<TextControl
						label={ __( 'Gist File' ) }
						value={ file }
						onChange={ this.updateFile }
					/>
					<ToggleControl
						label={ __( 'Gist Meta' ) }
						checked={ !! meta }
						onChange={ () => setAttributes( {  meta: ! meta } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
