/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, MediaUpload, mediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { Button, Dashicon, IconButton, DropZone } = wp.components;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'core/button' ];
const TEMPLATE = [ [ 'core/button', { text: 'Follow' }, ] ];

/**
 * Block edit function
 */
class Edit extends Component {

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
			heading,
			imgId,
			imgUrl,
			name,
			textAlign,
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
				<div className={ className } style={ { textAlign: textAlign } }>
					{ dropZone }
					<div className={ `${ className }__avatar` }>
						<MediaUploadCheck>
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
						</MediaUploadCheck>
					</div>
					<div className={ `${ className }__content` }>
						{ ( ! RichText.isEmpty( heading ) || isSelected ) && (
							<RichText
								multiline="false"
								tagName="p"
								placeholder={ __( 'Heading...' ) }
								value={ heading }
								className={ `${ className }__heading` }
								onChange={ ( value ) => setAttributes( { heading: value } ) }
								unstableOnFocus={ this.offFocusButton }
								keepPlaceholderOnFocus
							/>
						) }
						<RichText
							multiline="false"
							tagName="span"
							placeholder={ __( 'Author Name' ) }
							value={ name }
							className={ `${ className }__name` }
							onMerge={ mergeBlocks }
							onChange={ ( value ) => setAttributes( { name: value } ) }
							unstableOnFocus={ this.offFocusButton }
							keepPlaceholderOnFocus
						/>
						<RichText
							multiline="false"
							tagName="p"
							placeholder={ __( 'Write biography...' ) }
							className={ `${ className }__biography` }
							value={ biography }
							onChange={ ( value ) => setAttributes( { biography: value } ) }
							unstableOnFocus={ this.offFocusButton }
							keepPlaceholderOnFocus
						/>
						<InnerBlocks
							template={ TEMPLATE }
							templateLock="all"
							allowedBlocks={ ALLOWED_BLOCKS }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		];
	}
};

export default Edit;
