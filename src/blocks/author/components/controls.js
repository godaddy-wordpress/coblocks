/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls, MediaUpload } = wp.editor;
const { Toolbar, IconButton } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

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
				<BlockControls key="controls">
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextTextAlign ) => setAttributes( { textAlign: nextTextAlign } ) }
					/>
					{ imgUrl &&
						<Toolbar>
							<MediaUpload
								onSelect={ onSelectImage }
								type="image"
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
					}
				</BlockControls>
			</Fragment>
		);
	}
}
