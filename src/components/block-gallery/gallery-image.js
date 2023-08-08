/**
 * Internal dependencies
 */
import * as helper from '../../utils/helper';

/**
 * External Dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { isBlobURL } from '@wordpress/blob';
import { withSelect } from '@wordpress/data';
import { BACKSPACE, DELETE } from '@wordpress/keycodes';
import { Button, ButtonGroup, Dashicon, Spinner } from '@wordpress/components';
import { chevronDown, chevronLeft, chevronRight, chevronUp, closeSmall } from '@wordpress/icons';
import { Component, createRef, Fragment } from '@wordpress/element';
import { MediaUpload, MediaUploadCheck, RichText, URLInput } from '@wordpress/block-editor';

class GalleryImage extends Component {
	constructor() {
		super( ...arguments );

		this.onImageClick = this.onImageClick.bind( this );
		this.onSelectCaption = this.onSelectCaption.bind( this );
		this.onKeyDown = this.onKeyDown.bind( this );
		this.saveCustomLink = this.saveCustomLink.bind( this );

		this.state = {
			captionFocused: false,
			captionSelected: false,
			isSaved: false,
		};
		this.container = createRef();
	}

	onSelectCaption() {
		const { captionSelected } = this.state;
		if ( ! captionSelected ) {
			this.setState( {
				captionSelected: true,
			} );
		}

		const { isSelected, onSelect } = this.props;
		if ( ! isSelected ) {
			onSelect();
		}
	}

	onImageClick() {
		const { isSelected, onSelect } = this.props;

		if ( ! isSelected ) {
			onSelect();
		}

		const { captionSelected } = this.state;
		if ( captionSelected ) {
			this.setState( {
				captionFocused: false,
				captionSelected: false,
			} );
		}
	}

	onKeyDown( event ) {
		const doc = this.container.current.ownerDocument;
		const { isSelected, onRemove } = this.props;

		if (
			this.container === doc.activeElement &&
			isSelected && [ BACKSPACE, DELETE ].indexOf( event.keyCode ) !== -1
		) {
			event.stopPropagation();
			event.preventDefault();
			onRemove();
		}
	}

	saveCustomLink() {
		this.setState( { isSaved: true } );
	}

	componentDidUpdate( prevProps ) {
		const { isSelected, image, url, imgLink, setAttributes } = this.props;
		if ( image && ! url ) {
			setAttributes( {
				alt: image.alt_text,
				url: image.source_url,
			} );
		}

		// unselect the caption so when the user selects other image and comeback
		// the caption is not immediately selected
		const { captionSelected } = this.state;
		if ( captionSelected && ! isSelected && prevProps.isSelected ) {
			this.setState( {
				captionFocused: false,
				captionSelected: false,
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
			linkTo,
			newClass,
			marginBottom,
			marginLeft,
			marginRight,
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
			imageIndex,
			replaceImage,
		} = this.props;

		const { captionSelected, isSaved } = this.state;

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
					alt={ alt }
					aria-label={ ariaLabel }
					className={ imgClasses }
					data-id={ id }
					data-imglink={ imgLink }
					onClick={ this.onImageClick }
					onKeyDown={ this.onImageClick }
					src={ url }
					tabIndex="0"
				/>
				{ isBlobURL( url ) && <Spinner /> }
			</Fragment>
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
		);

		const properClass = newClass ? newClass : 'coblocks-gallery--figure';

		const className = classnames( properClass, {
			'is-selected': isSelected,
			'is-transient': url && 0 === url.indexOf( 'blob:' ),
			[ `has-margin-right-${ gutter }` ]: marginRight && gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ]: marginRight && gutterMobile > 0,
			[ `has-margin-bottom-${ gutter }` ]: marginBottom && gutter > 0,
			[ `has-margin-bottom-mobile-${ gutterMobile }` ]: marginBottom && gutterMobile > 0,
			[ `has-margin-left-${ gutter }` ]: marginLeft && gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ]: marginLeft && gutterMobile > 0,
		} );

		const captionStyles = {
			fontSize: helper.computeFontSize( fontSize ),
		};
		// Disable reason: Each block can be selected by clicking on it and we should keep the same saved markup
		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
		return (
			<figure className={ className } onKeyDown={ this.onKeyDown } ref={ this.container } tabIndex="-1">
				{ isSelected && (
					<>
						<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									onSelect={ ( selectedImg ) => {
										const newAttributeProperty = helper.pickRelevantMediaFiles( selectedImg );
										replaceImage( imageIndex, newAttributeProperty );
									} }
									render={ ( { open } ) => (
										<Button
											className="coblocks-gallery-item__button-replace"
											label={ __( 'Replace Image', 'coblocks' ) }
											onClick={ open }
										>
											{ __( 'Replace', 'coblocks' ) }
										</Button>
									) }
									value={ url }
								>
								</MediaUpload>
							</MediaUploadCheck>

							<Button
								className="coblocks-gallery-item__button"
								disabled={ ! isSelected }
								icon={ closeSmall }
								label={ __( 'Remove image', 'coblocks' ) }
								onClick={ onRemove }
							/>
						</ButtonGroup>
					</>
				) }
				{ isSelected &&
					<Fragment>
						{ supportsMoving &&
							<ButtonGroup className="block-library-gallery-item__inline-menu is-left">
								<Button
									aria-disabled={ isFirstItem }
									className="coblocks-gallery-item__button"
									disabled={ ! isSelected }
									icon={ verticalMoving ? chevronUp : chevronLeft }
									label={ __( 'Move image backward', 'coblocks' ) }
									onClick={ ! isFirstItem && onMoveBackward }
								/>
								<Button
									aria-disabled={ isLastItem }
									className="coblocks-gallery-item__button"
									disabled={ ! isSelected }
									icon={ verticalMoving ? chevronDown : chevronRight }
									label={ __( 'Move image forward', 'coblocks' ) }
									onClick={ ! isLastItem && onMoveForward }
								/>
							</ButtonGroup>
						}
						{ linkTo === 'custom' &&
							<form
								className="components-coblocks-gallery-item__image-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									onChange={ ( value ) => setAttributes( { imgLink: value } ) }
									value={ imgLink }
								/>
								<Button icon={ isSaved ? 'saved' : 'editor-break' } label={ isSaved ? __( 'Saving', 'coblocks' ) : __( 'Apply', 'coblocks' ) } onClick={ this.saveCustomLink } type="submit" />
							</form>
						}
					</Fragment>
				}
				{ img }
				{ ( supportsCaption === true ) && ( ! RichText.isEmpty( caption ) || isSelected ) && captions ? (
					<RichText
						className="coblocks-gallery--caption"
						inlineToolbar={ captionSelected }
						onChange={ ( newCaption ) => setAttributes( { caption: newCaption } ) }
						placeholder={ __( 'Write caption…', 'coblocks' ) }
						style={ captionStyles }
						tagName="figcaption"
						onFocus={ this.onSelectCaption }
						unstableOnFocus={ this.onSelectCaption }
						value={ caption }
					/>
				) : null }
			</figure>
		);
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
	}
}

GalleryImage.propTypes = {
	alt: PropTypes.string,
	caption: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.array,
	] ),
	captions: PropTypes.bool,
	fontSize: PropTypes.number,
	gutter: PropTypes.number,
	gutterMobile: PropTypes.number,
	gutterUtility: PropTypes.bool,
	id: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	imageIndex: PropTypes.number,
	imgLink: PropTypes.string,
	isFirstItem: PropTypes.bool,
	isLastItem: PropTypes.bool,
	isSelected: PropTypes.bool,
	linkTo: PropTypes.string,
	marginBottom: PropTypes.bool,
	marginLeft: PropTypes.bool,
	marginRight: PropTypes.bool,
	newClass: PropTypes.string,
	onMoveBackward: PropTypes.func,
	onMoveForward: PropTypes.func,
	onRemove: PropTypes.func,
	onSelect: PropTypes.func,
	replaceImage: PropTypes.func,
	setAttributes: PropTypes.func,
	shadow: PropTypes.string,
	supportsCaption: PropTypes.bool,
	supportsMoving: PropTypes.bool.isRequired,
	url: PropTypes.string,
	verticalMoving: PropTypes.bool.isRequired,
};

GalleryImage.defaultProps = {
	supportsMoving: true,
	verticalMoving: false,
};

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { getMedia } = select( 'core' );
		const { id } = ownProps;

		return {
			image: id ? getMedia( id ) : null,
		};
	} ),
] )( GalleryImage );
