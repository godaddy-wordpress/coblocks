/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import CropSettings from './';
import { originalImage } from './original-image';

/**
 * WordPress dependencies
 */
import { Component, createRef } from '@wordpress/element';

class CropControl extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			id: null,
			imageUrl: '',
		};

		this.cropControl = createRef();
	}

	componentDidMount() {
		const { attachmentId } = this.props;
		const self = this;

		if ( ! attachmentId ) {
			return;
		}

		originalImage.get( attachmentId ).then( function( data ) {
			const url = data.url;

			self.setState( {
				id: attachmentId,
				imageUrl: url,
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

		originalImage.get( attachmentId ).then( function( data ) {
			const url = data.url;
			const lastUrl = self.state.imageUrl;

			self.setState( {
				id: attachmentId,
				imageUrl: url,
			} );

			if ( lastUrl !== self.state.imageUrl ) {
				self.cropControl.current.resetControl();
			}
		} );
	}

	render() {
		const { offsetX, offsetY, cropWidth, cropHeight, rotation, onChange } = this.props;
		const { imageUrl } = this.state;

		return (
			<CropSettings
				cropHeight={ cropHeight }
				cropWidth={ cropWidth }
				imageUrl={ imageUrl }
				offsetX={ offsetX }
				offsetY={ offsetY }
				onChange={ onChange }
				ref={ this.cropControl }
				rotation={ rotation }
			/>
		);
	}
}

CropControl.propTypes = {
	attachmentId: PropTypes.number,
	cropHeight: PropTypes.number,
	cropWidth: PropTypes.number,
	offsetX: PropTypes.number,
	offsetY: PropTypes.number,
	onChange: PropTypes.func,
	rotation: PropTypes.number,
};

export default CropControl;
