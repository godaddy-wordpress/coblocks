/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import Masonry from 'react-masonry-component';

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
import { GalleryClasses } from '../../components/block-gallery/shared';
import { BackgroundClasses, BackgroundStyles, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { withNotices, Spinner } = wp.components;
const { withColors } = wp.blockEditor;
const { isBlobURL } = wp.blob;

/**
 * Block consts
 */
const masonryOptions = {
	transitionDuration: 0,
	percentPosition: true,
};

class GalleryMasonryEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		if ( this.props.wideControlsEnabled === true && ! this.props.attributes.align && this.props.attributes.gridSize === 'xlrg' ) {
			this.props.setAttributes( {
				align: 'wide',
				gridSize: 'lrg',
			} );
		}
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block.
		if ( ! this.props.isSelected && prevProps.isSelected ) {
			this.setState( {
				selectedImage: null,
				captionSelected: false,
			} );
		}
	}

	onSelectImage( index ) {
		return () => {
			if ( this.state.selectedImage !== index ) {
				this.setState( {
					selectedImage: index,
				} );
			}
		};
	}

	onMove( oldIndex, newIndex ) {
		const images = [ ...this.props.attributes.images ];
		images.splice( newIndex, 1, this.props.attributes.images[ oldIndex ] );
		images.splice( oldIndex, 1, this.props.attributes.images[ newIndex ] );
		this.setState( { selectedImage: newIndex } );
		this.props.setAttributes( { images } );
	}

	onMoveForward( oldIndex ) {
		return () => {
			if ( oldIndex === this.props.attributes.images.length - 1 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex + 1 );
		};
	}

	onMoveBackward( oldIndex ) {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			this.onMove( oldIndex, oldIndex - 1 );
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

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			editorSidebarOpened,
			isSelected,
			noticeUI,
			pluginSidebarOpened,
			publishSidebarOpened,
			captionColor,
		} = this.props;

		const {
			align,
			backgroundImg,
			captions,
			gridSize,
			gutter,
			gutterMobile,
			images,
			linkTo,
		} = attributes;

		const hasImages = !! images.length;

		// An additional dropzone to wrap the entire gallery in.
		const dropZone = (
			<GalleryDropZone
				{ ...this.props }
			/>
		);

		const sidebarIsOpened = editorSidebarOpened || pluginSidebarOpened || publishSidebarOpened;

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ),
			sidebarIsOpened, {
				[ `align${ align }` ]: align,
				'has-gutter': gutter > 0,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
		};

		const masonryClasses = classnames(
			`has-grid-${ gridSize }`, {
				[ `has-gutter-${ gutter }` ]: gutter > 0,
				[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const masonryStyles = {
			color: captionColor.color,
		};

		if ( ! hasImages ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					label={ __( 'Masonry' ) }
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
				<div className={ className }>
					<div
						className={ innerClasses }
						style={ innerStyles }
					>
						{ dropZone }
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<Masonry
							elementType={ 'ul' }
							className={ masonryClasses }
							style={ masonryStyles }
							options={ masonryOptions }
							disableImagesLoaded={ false }
							updateOnEachImageLoad={ false }
						>
							{ images.map( ( img, index ) => {
								// translators: %1$d is the order number of the image, %2$d is the total number of images
								const ariaLabel = sprintf( __( 'image %1$d of %2$d in gallery' ), ( index + 1 ), images.length );

								return (
									<li className="coblocks-gallery--item" key={ img.id || img.url }>
										<GalleryImage
											url={ img.url }
											alt={ img.alt }
											id={ img.id }
											imgLink={ img.imgLink }
											linkTo={ linkTo }
											isFirstItem={ index === 0 }
											isLastItem={ ( index + 1 ) === images.length }
											isSelected={ isSelected && this.state.selectedImage === index }
											onMoveBackward={ this.onMoveBackward( index ) }
											onMoveForward={ this.onMoveForward( index ) }
											onRemove={ this.onRemoveImage( index ) }
											onSelect={ this.onSelectImage( index ) }
											setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
											caption={ img.caption }
											aria-label={ ariaLabel }
											captions={ captions }
											supportsCaption={ true }
										/>
									</li>
								);
							} ) }
							<li className="coblocks-gallery--item">
								<GalleryUploader { ...this.props } />
							</li>
						</Masonry>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		editorSidebarOpened: select( 'core/edit-post' ).isEditorSidebarOpened(),
		pluginSidebarOpened: select( 'core/edit-post' ).isPluginSidebarOpened(),
		publishSidebarOpened: select( 'core/edit-post' ).isPublishSidebarOpened(),
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withColors( { backgroundColor: 'background-color', captionColor: 'color' } ),
	withNotices,
] )( GalleryMasonryEdit );
