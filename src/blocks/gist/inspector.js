/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const updateFile = ( newFile ) => {
		// While editing Gist enter preview state.
		props.setPreview( false );
		props.setNewFile( newFile );
	};

	const getGistMetaHelp = ( checked ) => {
		return checked ? __( 'Showing gist meta data.', 'coblocks' ) : __( 'Toggle to show the gist meta data.', 'coblocks' );
	};

	const {
		attributes,
		setAttributes,
		updateURL,
		newFile,
	} = props;

	const {
		url,
		meta,
	} = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Gist settings', 'coblocks' ) }>
					<TextControl
						label={ __( 'Gist URL', 'coblocks' ) }
						value={ url }
						onChange={ updateURL }
					/>
					<TextControl
						label={ __( 'Gist File', 'coblocks' ) }
						// newFile is lowercase to match `props.attributes.file`.
						value={ newFile.toLowerCase() }
						onChange={ updateFile }
					/>
					<ToggleControl
						label={ __( 'Gist Meta', 'coblocks' ) }
						checked={ !! meta }
						onChange={ () => setAttributes( { meta: ! meta } ) }
						help={ getGistMetaHelp }
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
};

export default Inspector;
