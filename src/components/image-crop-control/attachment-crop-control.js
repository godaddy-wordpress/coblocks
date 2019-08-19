import ImageCropControl from './image-crop-control';

const { Component } = wp.element;

const originalImageCache = {};
const urlsInProgress = {};

const getOriginalImageUrl = function( id ) {
	if ( urlsInProgress[ id ] ) {
		return urlsInProgress[ id ];
	}

	urlsInProgress[ id ] = new Promise( ( resolve, reject ) => {
		if ( originalImageCache[ id ] ) {
			resolve( originalImageCache[ id ] );
			return;
		}

		jQuery.post( ajaxurl, {
			action: 'coblocks_system_original_image',
			id: id,
		}, function( response ) {
			if ( ! response ) {
				reject();
				return;
			}

			const data = JSON.parse( response );

			if ( ! data || ! data.url ) {
				reject();
				return;
			}

			originalImageCache[ id ] = data.url;
			resolve( data.url );
		} );
	} );

	return urlsInProgress[ id ];
};

class AttachmentCropControl extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			imageUrl: '',
		};
	}

	componentDidMount() {
		const { attachmentId } = this.props;
		const self = this;

		if ( ! attachmentId ) {
			return;
		}

		getOriginalImageUrl( attachmentId ).then( function( url ) {
			self.setState( {
				imageUrl: url,
			} );
		} );
	}

	render() {
		const { offsetX, offsetY, cropWidth, cropHeight, rotation, onChange } = this.props;

		return (
			<ImageCropControl
				offsetX={ offsetX }
				offsetY={ offsetY }
				cropWidth={ cropWidth }
				cropHeight={ cropHeight }
				rotation={ rotation }
				imageUrl={ this.state.imageUrl }
				onChange={ onChange }
			/>
		);
	}
}

export default AttachmentCropControl;
