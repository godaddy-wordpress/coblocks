/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import Flickity from 'react-flickity-component';

/**
 * Internal dependencies
 */
import { icon } from './';
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import GalleryUploader from '../../components/block-gallery/gallery-uploader';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo } from '../../components/background';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withNotices, ResizableBox, Spinner } = wp.components;
const { withColors, RichText } = wp.blockEditor;
const { isBlobURL } = wp.blob;

class GalleryCarouselEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.onFocusCaption = this.onFocusCaption.bind( this );
		this.onItemClick = this.onItemClick.bind( this );

		this.state = {
			selectedImage: null,
			captionFocused: false,
		};
	}

	componentDidMount() {
		// This block does not support the following attributes.
		this.props.setAttributes( {
			lightbox: undefined,
			lightboxStyle: undefined,
			shadow: undefined,
		} );
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block.
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
				captionFocused: false,
			} );
		}

		if ( ! this.props.isSelected && prevProps.isSelected && this.state.captionFocused ) {
			this.setState( {
				captionFocused: false,
			} );
		}

		if ( this.props.attributes.gutter <= 0 ) {
			this.props.setAttributes( {
				radius: 0,
			} );
		}

		if ( this.props.attributes.gridSize === 'xlrg' && prevProps.attributes.align === undefined ) {
			this.props.setAttributes( {
				gutter: 0,
				gutterMobile: 0,
			} );
		}
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
					captionFocused: false,
				} );
			}
		};
	}

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( _img, i ) => index !== i );
			this.setState( { selectedImage: null } );
			this.props.setAttributes( {
				images,
			} );
		};
	}

	setImageAttributes( index, attributes ) {
		const { attributes: { images }, setAttributes } = this.props;
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...attributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	}

	onFocusCaption() {
		if ( ! this.state.captionFocused ) {
			this.setState( {
				captionFocused: true,
			} );
		}
	}

	onItemClick() {
		if ( ! this.props.isSelected ) {
			this.props.onSelect();
		}

		if ( this.state.captionFocused ) {
			this.setState( {
				captionFocused: false,
			} );
		}
	}

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			noticeUI,
			setAttributes,
			captionColor,
		} = this.props;

		const {
			align,
			gridSize,
			gutter,
			gutterMobile,
			height,
			images,
			pageDots,
			prevNextButtons,
			primaryCaption,
			backgroundImg,
			alignCells,
		} = attributes;

		const hasImages = !! images.length;

		// An additional dropzone to wrap the entire gallery in.
		const dropZone = (
			<GalleryDropZone
				{ ...this.props }
			/>
		);

		const innerClasses = classnames(
			'is-cropped',
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ), {
				[ `align${ align }` ]: align,
				'has-horizontal-gutter': gutter > 0,
				'has-no-dots': ! pageDots,
				'has-no-arrows': ! prevNextButtons,
				'is-selected': isSelected,

			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
		};

		const captionStyles = {
			color: captionColor.color,
		};

		const flickityClasses = classnames(
			'has-carousel',
			`has-carousel-${ gridSize }`, {
				'has-aligned-cells': alignCells,
			}
		);

		const flickityOptions = {
			draggable: false,
			pageDots: true,
			prevNextButtons: true,
			wrapAround: true,
			autoPlay: false,
			cellAlign: alignCells ? 'left' : 'center',
			arrowShape: {
				x0: 10,
				x1: 60, y1: 50,
				x2: 65, y2: 45,
				x3: 20,
			},
		};

		if ( ! hasImages ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					label={ __( 'Carousel' ) }
					icon={ icon }
				/>
			);
		}

		return (
			<Fragment>
				{ isSelected &&
					<Controls
						{ ...this.props }
					/>
				}
				{ isSelected &&
					<Inspector
						{ ...this.props }
					/>
				}
				{ noticeUI }
				<ResizableBox
					size={ {
						height: height,
						width: '100%',
					} }
					className={ classnames(
						{ 'is-selected': isSelected }
					) }
					minHeight="200"
					enable={ {
						bottom: true,
						bottomLeft: false,
						bottomRight: false,
						left: false,
						right: false,
						top: false,
						topLeft: false,
						topRight: false,
					} }
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
					} }
				>
					{ dropZone }
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					{ BackgroundVideo( attributes ) }
					<div className={ className }>
						<div
							className={ innerClasses }
							style={ innerStyles }
						>
							<Flickity
								className={ flickityClasses }
								disableImagesLoaded={ false }
								flickityRef={ c => this.flkty = c }
								options={ flickityOptions }
								reloadOnUpdate={ true }
								updateOnEachImageLoad={ true }
							>
								{ images.map( ( img, index ) => {
									// translators: %1$d is the order number of the image, %2$d is the total number of images
									const ariaLabel = sprintf( __( 'image %1$d of %2$d in gallery' ), ( index + 1 ), images.length );

									return (
										<div className="coblocks-gallery--item" key={ img.id || img.url } onClick={ this.onItemClick }>
											<GalleryImage
												url={ img.url }
												alt={ img.alt }
												id={ img.id }
												gutter={ gutter }
												gutterMobile={ gutterMobile }
												marginRight={ true }
												marginLeft={ true }
												isSelected={ isSelected && this.state.selectedImage === index }
												onRemove={ this.onRemoveImage( index ) }
												onSelect={ this.onSelectImage( index ) }
												setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
												caption={ img.caption }
												aria-label={ ariaLabel }
												supportsCaption={ false }
												supportsMoving={ false }
											/>
										</div>
									);
								} ) }
								{ isSelected && (
									<div className="coblocks-gallery--item">
										<GalleryUploader { ...this.props }
											gutter={ gutter }
											gutterMobile={ gutterMobile }
											marginRight={ true }
											marginLeft={ true }
										/>
									</div>
								) }
							</Flickity>
						</div>
					</div>
				</ResizableBox>
				{ ( ! RichText.isEmpty( primaryCaption ) || isSelected ) && (
					<RichText
						tagName="figcaption"
						placeholder={ __( 'Write caption…' ) }
						value={ primaryCaption }
						className="coblocks-gallery--caption coblocks-gallery--primary-caption"
						style={ captionStyles }
						unstableOnFocus={ this.onFocusCaption }
						onChange={ ( value ) => setAttributes( { primaryCaption: value } ) }
						isSelected={ this.state.captionFocused }
						keepPlaceholderOnFocus
						inlineToolbar
					/>
				) }
			</Fragment>
		);
	}
}

export default compose( [
	withColors( { backgroundColor: 'background-color', captionColor: 'color' } ),
	withNotices,
] )( GalleryCarouselEdit );
