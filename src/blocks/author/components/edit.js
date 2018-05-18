/**
 * Internal dependencies
 */
import Author from './author';
import Controls from './controls';
// import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RichText, MediaUpload, UrlInput } = wp.editor;
const { Button, Dashicon, IconButton } = wp.components;
const { withSelect } = wp.data;

/**
 * Block edit function
 */
export default class AuthorBlock extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			onReplace,
			setAttributes,
			mergeBlocks,
		} = this.props;

		const {
			align,
			biography,
			buttonText,
			buttonUrl,
			heading,
			imgId,
			imgUrl,
			name,
			textAlign,
		} = attributes;

		const onSelectImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

		return [
			isSelected && (
				<Controls
					{ ...this.props }
				/>
			),
			// isSelected && (
			// 	<Inspector
			// 		{ ...this.props }
			// 	/>
			// ),
			<Author { ...this.props }>

				<div className={ `${ className }__avatar` }>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imgId }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ ! imgId ? <Dashicon icon="format-image" /> :
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

					{ ( ( heading && heading.length > 0 ) || isSelected ) && (
						<RichText
							tagName="p"
							placeholder={ __( 'Heading...' ) }
							value={ heading }
							className={ `${ className }__content-heading` }
							onChange={ ( value ) => setAttributes( { heading: value } ) }
							keepPlaceholderOnFocus
						/>
					) }

					<div className={ `${ className }__content-name` }>
						<RichText
							tagName="h3"
							placeholder={ __( 'Author Name' ) }
							value={ name }
							onMerge={ mergeBlocks }
							onChange={ ( value ) => setAttributes( { name: value } ) }
							keepPlaceholderOnFocus
						/>
					</div>

					<div className={ `${ className }__content-biography` }>
						<RichText
							multiline="p"
							tagName="p"
							placeholder={ __( 'Write biography...' ) }
							value={ biography }
							onMerge={ mergeBlocks }
							onChange={ ( value ) => setAttributes( { biography: value } ) }
							keepPlaceholderOnFocus
						/>
					</div>

					{ ( ( buttonText && buttonText.length > 0 ) || isSelected ) && (
						<span className={ `${ className }__content-button` }>
							<RichText
								tagName="span"
								placeholder={ __( 'Add button...' ) }
								value={ buttonText }
								onMerge={ mergeBlocks }
								className={ `${ className }__content-button-link` }
								formattingControls={ [] }
								onChange={ ( value ) => setAttributes( { buttonText: value } ) }
								keepPlaceholderOnFocus
							/>
						</span>
					) }

					{ isSelected && (
						<form
							className="core-blocks-button__inline-link"
							onSubmit={ ( event ) => event.preventDefault() }>
							<Dashicon icon="admin-links" />
							<UrlInput
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
							/>
							<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
						</form>
					) }
				</div>
			</Author>
		];
	}
};
