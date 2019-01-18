/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { mediaUpload } = wp.editor;
const { DropZone } = wp.components;

/**
 * Allowed media
 */
const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Gallery Drop Zone Component
 */
class BackgroundImageDropZone extends Component {

	constructor() {
		super( ...arguments );
		this.addFile = this.addFile.bind( this );
		this.onSelectFile = this.onSelectFile.bind( this );
	}

	addFile( files ) {
		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectFile( media ),
		} );
	}

	onSelectFile( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { backgroundImg: media.url } );

			//set padding when image selected
			if( [ 'coblocks/image-card' ].includes( this.props.name ) ){
				if( !this.props.attributes.paddingSize || this.props.attributes.paddingSize == 'no' ){
					this.props.setAttributes( { paddingSize: 'medium' } );
				}
			}
		}
	}

	render() {

		const {
			attributes,
			className,
			noticeOperations,
			noticeUI,
			label,
		} = this.props;

		return (
			<Fragment>
				<DropZone
					onFilesDrop={ this.addFile }
					label={ this.props.label }
				/>
			</Fragment>
		);
	}
}

export default BackgroundImageDropZone;