/**
 * External dependencies
 */
 import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { ALLOWED_BG_MEDIA_TYPES, BLOCKS_WITH_AUTOPADDING } from './';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { mediaUpload } from '@wordpress/editor';
import { DropZone } from '@wordpress/components';

class BackgroundDropZone extends Component {
	constructor() {
		super( ...arguments );
		this.addFile = this.addFile.bind( this );
		this.onSelectFile = this.onSelectFile.bind( this );
	}

	addFile( files ) {
		mediaUpload( {
			allowedTypes: ALLOWED_BG_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectFile( media ),
		} );
	}

	onSelectFile( media ) {
		if ( media && media.url ) {
			let mediaType = 'image';

			if ( media.mime_type && media.mime_type.includes( 'video' ) ) {
				mediaType = 'video';
			}

			this.props.setAttributes( { backgroundImg: media.url, backgroundType: mediaType } );
			// Set padding when background image is added.
			if ( BLOCKS_WITH_AUTOPADDING.includes( this.props.name ) ) {
				if ( ! this.props.attributes.paddingSize || this.props.attributes.paddingSize === 'no' ) {
					this.props.setAttributes( { paddingSize: 'medium' } );
				}
			}
		}
	}

	render() {
		return (
			<Fragment>
				<DropZone
					onFilesDrop={ this.addFile }
					label={ this.props.label }
				/>
			</Fragment>
		);
	}
}

BackgroundDropZone.propTypes = {
	attributes: PropTypes.object,
	label: PropTypes.string,
	name: PropTypes.string,
	setAttributes: PropTypes.func
};

export default BackgroundDropZone;
