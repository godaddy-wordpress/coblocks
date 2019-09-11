/* global React */
import ImageCropControl from './image-crop-control';
import { attachmentOriginalImage } from './attachment-original-image';

const { Component } = wp.element;

class AttachmentCropControl extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			imageUrl: '',
			id: null,
		};

		this.cropControl = React.createRef();
	}

	componentDidMount() {
		const { attachmentId } = this.props;
		const self = this;

		if ( ! attachmentId ) {
			return;
		}

		attachmentOriginalImage.get( attachmentId ).then( function( data ) {
			const url = data.url;

			self.setState( {
				imageUrl: url,
				id: attachmentId,
			} );

			if ( ! data.crop ) {
				self.cropControl.current.resetControl();
			}
		} );
	}

	componentDidUpdate( prevProps ) {
		const { attachmentId } = this.props;
		const self = this;

		if ( ! prevProps.attachmentId || self.state.id === attachmentId ) {
			return;
		}

		attachmentOriginalImage.get( attachmentId ).then( function( data ) {
			const url = data.url;
			const lastUrl = self.state.imageUrl;

			self.setState( {
				imageUrl: url,
				id: attachmentId,
			} );

			if ( lastUrl !== self.state.imageUrl ) {
				self.cropControl.current.resetControl();
			}
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
				ref={ this.cropControl }
			/>
		);
	}
}

export default AttachmentCropControl;
