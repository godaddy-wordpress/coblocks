/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

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
		return checked ? __( 'Showing gist meta data.', 'coblocks' ) : __( 'Toggle to show the gist meta data.', 'coblocks' );
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
					<PanelBody title={ __( 'Gist settings', 'coblocks' ) }>
						<TextControl
							label={ __( 'Gist URL', 'coblocks' ) }
							value={ url }
							onChange={ this.updateURL }
						/>
						<TextControl
							label={ __( 'Gist File', 'coblocks' ) }
							value={ file }
							onChange={ this.updateFile }
						/>
						<ToggleControl
							label={ __( 'Gist Meta', 'coblocks' ) }
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
