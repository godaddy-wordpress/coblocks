/**
 * Internal dependencies
 */
import * as helper from '../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { Button, Toolbar } from '@wordpress/components';
import {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';

class Controls extends Component {
	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
		} );
	}

	render() {
		const { attributes } = this.props;

		const hasRestaurantID = false;

		return (
			<BlockControls>
				{ hasRestaurantID && (
					<Fragment>
						<Toolbar>
							{ /* <MediaUploadCheck>
								<MediaUpload
									onSelect={ this.onSelectImages }
									allowedTypes={ [ 'image' ] }
									multiple
									gallery
									value={ attributes.images.map( ( img ) => img.id ) }
									render={ ( { open } ) => (
										<Button
											className="components-toolbar__control"
											label={ __( 'Edit logos', 'coblocks' ) }
											icon={ edit }
											onClick={ open }
										/>
									) }
								/>
							</MediaUploadCheck> */ }
						</Toolbar>
					</Fragment>
				) }
			</BlockControls>
		);
	}
}

export default Controls;
