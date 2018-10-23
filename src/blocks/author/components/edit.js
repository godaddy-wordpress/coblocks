/**
 * Internal dependencies
 */
import Author from './author';
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, MediaUpload, URLInput, mediaUpload } = wp.editor;
const { Button, Dashicon, IconButton, DropZone } = wp.components;

/**
 * Block edit function
 */
export default class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
		this.addImage = this.addImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
		this.onFocusButton = this.onFocusButton.bind( this );
		this.offFocusButton = this.offFocusButton.bind( this );

		this.state = {
			buttonFocused: false,
		};
	}

	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: false,
			} );
		}
	}

	onFocusButton() {
		if ( ! this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: true,
			} );
		}
	}

	offFocusButton() {
		if ( this.state.buttonFocused ) {
			this.setState( {
				buttonFocused: false,
			} );
		}
	}

	onSelectImage( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { imgUrl: media.url } );
		}
	}

	addImage( files ) {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImage( media ),
		} );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			mergeBlocks,
			onReplace,
			setAttributes,
			setState,
		} = this.props;

		const {
			biography,
			buttonText,
			buttonUrl,
			heading,
			imgId,
			imgUrl,
			name,
		} = attributes;

		const dropZone = (
			<DropZone
				onFilesDrop={ this.addImage }
				label={ __( 'Drop to add as avatar' ) }
			/>
		);

		const onUploadImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

		return [
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				<Author { ...this.props }>
					{ dropZone }
					<div className={ `${ className }__avatar` }>
						<MediaUpload
							onSelect={ onUploadImage }
							allowedTypes={ [ 'image' ] }
							value={ imgUrl }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! imgUrl ? <Dashicon icon="format-image" /> :
										<img
											className={ `${ className }__avatar-img` }
											src={ imgUrl }
											alt="avatar"
										/>
									}
								</Button>
							) }
						>
						</MediaUpload>
					</div>

					<div className={ `${ className }__content` }>

						{ ( ! RichText.isEmpty( heading ) || isSelected ) && (
							<RichText
								multiline="false"
								tagName="p"
								placeholder={ __( 'Heading...' ) }
								value={ heading }
								className={ `${ className }__content-heading` }
								onChange={ ( value ) => setAttributes( { heading: value } ) }
								unstableOnFocus={ this.offFocusButton }
								keepPlaceholderOnFocus
							/>
						) }

						<div className={ `${ className }__content-name` }>
							<RichText
								multiline="false"
								tagName="h3"
								placeholder={ __( 'Author Name' ) }
								value={ name }
								onMerge={ mergeBlocks }
								onChange={ ( value ) => setAttributes( { name: value } ) }
								unstableOnFocus={ this.offFocusButton }
								keepPlaceholderOnFocus
							/>
						</div>

						<div className={ `${ className }__content-biography` }>
							<RichText
								multiline="false"
								tagName="p"
								placeholder={ __( 'Write biography...' ) }
								className={ `${ className }__content-biography-text` }
								value={ biography }
								onChange={ ( value ) => setAttributes( { biography: value } ) }
								unstableOnFocus={ this.offFocusButton }
							/>
						</div>

						{ ( ! RichText.isEmpty( buttonText ) || isSelected ) && (
							<span className={ `${ className }__content-button` }>
								<RichText
									tagName="span"
									placeholder={ __( 'Add button...' ) }
									value={ buttonText }
									onMerge={ mergeBlocks }
									className={ `${ className }__content-button-link` }
									formattingControls={ [] }
									onChange={ ( value ) => setAttributes( { buttonText: value } ) }
									unstableOnFocus={ this.onFocusButton }
									keepPlaceholderOnFocus
								/>
							</span>
						) }

						{ this.state.buttonFocused && isSelected && (
							<form
								className="block-library-button__inline-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ buttonUrl }
									onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
								/>
								<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
							</form>
						) }
					</div>
				</Author>
			</Fragment>
		];
	}
};
