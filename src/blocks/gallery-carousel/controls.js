/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';
import MediaFilterControl from '../../components/media-filter-control';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';

class Controls extends Component {
	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image, this.props.attributes.images ) ),
		} );
	}

	render() {
		const { attributes } = this.props;
		const { images } = attributes;

		const hasImages = !! images.length;

		return (
			<BlockControls>
				{ hasImages && (
					<MediaFilterControl
						{ ...this.props }
					/>
				) }
			</BlockControls>
		);
	}
}

export default Controls;
