/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls, MediaUploadCheck } = wp.blockEditor;
const { MediaUpload } = wp.editor;
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
			textAlign,
		} = attributes;

		const onSelectImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
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
											label={ __( 'Edit image' ) }
											icon="edit"
											onClick={ open }
										/>
									) }
								/>
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Remove image' ) }
									icon="trash"
									onClick={ () => setAttributes( { imgUrl: '', imgId: '' } ) }
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
