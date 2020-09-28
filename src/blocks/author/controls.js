/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Toolbar, Button } from '@wordpress/components';
import { edit } from '@wordpress/icons';

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			imgUrl,
			imgId,
		} = attributes;

		const onSelectImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

		return (
			<Fragment>
				<BlockControls>
					{ imgUrl &&
						<MediaUploadCheck>
							<Toolbar>
								<MediaUpload
									onSelect={ onSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ imgId }
									render={ ( { open } ) => (
										<Button
											className="components-toolbar__control"
											label={ __( 'Edit avatar', 'coblocks' ) }
											icon={ edit }
											onClick={ open }
										/>
									) }
								/>
							</Toolbar>
						</MediaUploadCheck>
					}
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
