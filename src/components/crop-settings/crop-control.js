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
			imageUrl: '',
			id: null,
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

		originalImage.get( attachmentId ).then( function( data ) {
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
			<CropSettings
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

CropControl.propTypes = {
	attachmentId: PropTypes.number,
	cropHeight: PropTypes.number,
	cropWidth: PropTypes.number,
	offsetX: PropTypes.number,
	offsetY: PropTypes.number,
	onChange: PropTypes.func,
	rotation: PropTypes.number,
}

export default CropControl;
