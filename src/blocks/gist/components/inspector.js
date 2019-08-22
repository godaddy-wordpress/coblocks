/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.updateURL = this.updateURL.bind( this );
		this.updateFile = this.updateFile.bind( this );
	}

	updateURL( newURL ) {
		if ( 'undefined' === typeof newURL || ! newURL.trim() ) {
			this.props.setState( { preview: false } );
		}
		this.props.setAttributes( { url: newURL } );
	}

	updateFile( newFile ) {
		this.props.setAttributes( { file: newFile } );
	}

	getGistMetaHelp( checked ) {
		return checked ? __( 'Showing gist meta data.' ) : __( 'Toggle to show the gist meta data.' );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			url,
			file,
			meta,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
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
							onChange={ () => setAttributes( { meta: ! meta } ) }
							help={ this.getGistMetaHelp }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
