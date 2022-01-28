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
import { DropZone } from '@wordpress/components';
import { mediaUpload } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';

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
		const { setAttributes, attributes, name } = this.props;

		if ( media && media.url ) {
			let mediaType = 'image';

			if ( media.mime_type && media.mime_type.includes( 'video' ) ) {
				mediaType = 'video';
			}

			setAttributes( { backgroundImg: media.url, backgroundType: mediaType } );
			// Set padding when background image is added.
			if ( BLOCKS_WITH_AUTOPADDING.includes( name ) ) {
				if ( ! attributes.paddingSize || attributes.paddingSize === 'no' ) {
					setAttributes( { paddingSize: 'medium' } );
				}
			}
		}
	}

	render() {
		const { label } = this.props;
		return (
			<Fragment>
				<DropZone
					label={ label }
					onFilesDrop={ this.addFile }
				/>
			</Fragment>
		);
	}
}

BackgroundDropZone.propTypes = {
	attributes: PropTypes.object,
	label: PropTypes.string,
	name: PropTypes.string,
	setAttributes: PropTypes.func,
};

export default BackgroundDropZone;
