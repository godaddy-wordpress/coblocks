/**
 * Internal dependencies
 */
import MediaFilterControl from '../../components/media-filter-control';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';

class Controls extends Component {
	render() {
		const { attributes } = this.props;
		const { images } = attributes;
		const hasImages = !! images.filter( ( image ) => typeof image.id !== 'undefined' ).length;

		return (
			<BlockControls>
				{ hasImages && <MediaFilterControl { ...this.props } /> }
			</BlockControls>
		);
	}
}

export default Controls;
