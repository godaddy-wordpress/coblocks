/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { IconButton, Spinner, Dashicon } = wp.components;
const { RichText, URLInput } = wp.blockEditor;
const { withSelect } = wp.data;
const { BACKSPACE, DELETE } = wp.keycodes;
const { isBlobURL } = wp.blob;

class GalleryImage extends Component {
	constructor() {
		super( ...arguments );

		this.onImageClick = this.onImageClick.bind( this );
		this.onSelectCaption = this.onSelectCaption.bind( this );
		this.onKeyDown = this.onKeyDown.bind( this );
		this.bindContainer = this.bindContainer.bind( this );
		this.saveCustomLink = this.saveCustomLink.bind( this );

		this.state = {
			captionSelected: false,
			captionFocused: false,
			isSaved: false,
		};
	}

	bindContainer( ref ) {
		this.container = ref;
	}

	onSelectCaption() {
		if ( ! this.state.captionSelected ) {
			this.setState( {
				captionSelected: true,
			} );
		}

		if ( ! this.props.isSelected ) {
			this.props.onSelect();
		}
	}

	onImageClick() {
		if ( ! this.props.isSelected ) {
			this.props.onSelect();
		}

		if ( this.state.captionSelected ) {
			this.setState( {
				captionSelected: false,
				captionFocused: false,
			} );
		}
	}

	onKeyDown( event ) {
		if (
			this.container === document.activeElement &&
			this.props.isSelected && [ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
		) {
			event.stopPropagation();
			event.preventDefault();
			this.props.onRemove();
		}
	}

	saveCustomLink() {
		this.setState( { isSaved: true } );
	}

	componentDidUpdate( prevProps ) {
		const { isSelected, image, url, imgLink } = this.props;
		if ( image && ! url ) {
			this.props.setAttributes( {
				url: image.source_url,
				alt: image.alt_text,
			} );
		}

		// unselect the caption so when the user selects other image and comeback
		// the caption is not immediately selected
		if ( this.state.captionSelected && ! isSelected && prevProps.isSelected ) {
			this.setState( {
				captionSelected: false,
				captionFocused: false,
			} );
		}

		if ( imgLink && ! isSelected && prevProps.isSelected ) {
			this.setState( { isSaved: false } );
		}
	}

	render() {
		const {
			alt,
			caption,
			captions,
			fontSize,
			gutter,
			gutterMobile,
			id,
			isFirstItem,
			isLastItem,
			isSelected,
			link,
			linkTo,
			marginBottom,
			marginLeft,
			marginRight,
			marginTop,
			onMoveBackward,
			onMoveForward,
			onRemove,
			setAttributes,
			shadow,
			supportsCaption,
			supportsMoving = true,
			verticalMoving = false,
			url,
			'aria-label': ariaLabel,
			imgLink,
		} = this.props;

		const imgClasses = classnames( {
			[ `has-shadow-${ shadow }` ]: shadow !== 'none' || shadow !== undefined,
		} );

		// Disable reason: Image itself is not meant to be
		// interactive, but should direct image selection and unfocus caption fields
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
		const img = (
			// Disable reason: Image itself is not meant to be interactive, but should
			// direct image selection and unfocus caption fields.
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
			<Fragment>
				<img
					src={ url }
					className={ imgClasses }
					alt={ alt }
					data-id={ id }
					data-imglink={ imgLink }
					onClick={ this.onImageClick }
					tabIndex="0"
					onKeyDown={ this.onImageClick }
					aria-label={ ariaLabel }
				/>
				{ isBlobURL( url ) && <Spinner /> }
			</Fragment>
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
		);

		const className = classnames( {
			'is-selected': isSelected,
			'is-transient': url && 0 === url.indexOf( 'blob:' ),
			[ `has-margin-top-${ gutter }` ]: marginTop && gutter > 0,
			[ `has-margin-top-mobile-${ gutterMobile }` ]: marginTop && gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ]: marginRight && gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ]: marginRight && gutterMobile > 0,
			[ `has-margin-bottom-${ gutter }` ]: marginBottom && gutter > 0,
			[ `has-margin-bottom-mobile-${ gutterMobile }` ]: marginBottom && gutterMobile > 0,
			[ `has-margin-left-${ gutter }` ]: marginLeft && gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ]: marginLeft && gutterMobile > 0,
		} );

		const captionStyles = {
			fontSize: fontSize ? fontSize + 'px' : undefined,
		};

		// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
		return (
			<figure className={ 'coblocks-gallery--figure ' + className } tabIndex="-1" onKeyDown={ this.onKeyDown } ref={ this.bindContainer }>
				{ isSelected &&
					<Fragment>
						{ supportsMoving &&
							<div className="components-coblocks-gallery-item__move-menu">
								<IconButton
									icon={ verticalMoving ? 'arrow-up' : 'arrow-left' }
									onClick={ ! isFirstItem && onMoveBackward }
									className="coblocks-gallery-item__button"
									label={ __( 'Move Image Backward' ) }
									aria-disabled={ isFirstItem }
									disabled={ ! isSelected }
								/>
								<IconButton
									icon={ verticalMoving ? 'arrow-down' : 'arrow-right' }
									onClick={ ! isLastItem && onMoveForward }
									className="coblocks-gallery-item__button"
									label={ __( 'Move Image Forward' ) }
									aria-disabled={ isLastItem }
									disabled={ ! isSelected }
								/>
							</div>
						}
						<div className="components-coblocks-gallery-item__remove-menu">
							<IconButton
								icon="no-alt"
								onClick={ onRemove }
								className="coblocks-gallery-item__button"
								label={ __( 'Remove Image' ) }
								disabled={ ! isSelected }
							/>
						</div>
						{ linkTo === 'custom' &&
							<form
								className="components-coblocks-gallery-item__image-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ imgLink }
									onChange={ ( value ) => setAttributes( { imgLink: value } ) }
								/>
								<IconButton icon={ this.state.isSaved ? 'saved' : 'editor-break' } label={ this.state.isSaved ? __( 'Saving' ) : __( 'Apply' ) } onClick={ this.saveCustomLink } type="submit" />
							</form>
						}
					</Fragment>
				}
				{ img }
				{ ( supportsCaption === true ) && ( ! RichText.isEmpty( caption ) || isSelected ) && captions ? (
					<RichText
						tagName="figcaption"
						placeholder={ __( 'Write caption…' ) }
						className="coblocks-gallery--caption"
						style={ captionStyles }
						value={ caption }
						isSelected={ this.state.captionSelected }
						onChange={ ( newCaption ) => setAttributes( { caption: newCaption } ) }
						unstableOnFocus={ this.onSelectCaption }
						inlineToolbar
					/>
				) : null }
			</figure>
		);
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
	}
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { getMedia } = select( 'core' );
		const { id } = ownProps;

		return {
			image: id ? getMedia( id ) : null,
		};
	} ),
] )( GalleryImage );
