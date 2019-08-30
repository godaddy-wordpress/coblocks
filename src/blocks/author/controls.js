/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Toolbar, IconButton } = wp.components;

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
										<IconButton
											className="components-toolbar__control"
											label={ __( 'Edit avatar' ) }
											icon="edit"
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
