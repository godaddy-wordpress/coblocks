import ImageCropControl from './image-crop-control';
import { attachmentOriginalImage } from './attachment-original-image';

const { Component } = wp.element;

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

		attachmentOriginalImage.get( attachmentId ).then( function( url ) {
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
