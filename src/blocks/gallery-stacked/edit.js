/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import { title, icon } from './'
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
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
const { withColors, withFontSizes } = wp.editor;
const { isBlobURL } = wp.blob;

class GalleryStackedEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		// This block does not support caption style.
		this.props.setAttributes( {
			captionStyle: undefined,
		} );
	}

	componentDidUpdate( prevProps ) {
		// Deselect images when deselecting the block
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

	onRemoveImage( index ) {
		return () => {
			const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
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
			captionColor,
			className,
			fontSize,
			isSelected,
			noticeOperations,
			noticeUI,
			setAttributes,
		} = this.props;

		const {
			align,
			captions,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			linkTo,
			shadow,
			backgroundImg,
		} = attributes;

		const hasImages = !! images.length;

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			...BackgroundClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				[ `align${ align }` ] : align,
				[ `has-margin` ] : gutter > 0,
				[ `has-margin-bottom-${ gutter }` ] : gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ] : gutterMobile > 0,
			}
		);

		const innerStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
			color: captionColor.color,
		};

		if ( ! hasImages ) {
			return (
				<GalleryPlaceholder
					{ ...this.props }
					label={ title }
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
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					{ BackgroundVideo( attributes ) }
					<ul className={ innerClasses } style={ innerStyles }>
						{ images.map( ( img, index ) => {
							// translators: %1$d is the order number of the image, %2$d is the total number of images.
							const ariaLabel = __( sprintf( 'image %1$d of %2$d in gallery', ( index + 1 ), images.length ) );

							return (
								<li className="coblocks-gallery--item" key={ img.id || img.url }>
									<GalleryImage
										url={ img.url }
										alt={ img.alt }
										id={ img.id }
										gutter={ gutter }
										gutterMobile={ gutterMobile }
										marginBottom={ true }
										shadow={ shadow }
										isSelected={ isSelected && this.state.selectedImage === index }
										onRemove={ this.onRemoveImage( index ) }
										onSelect={ this.onSelectImage( index ) }
										setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
										caption={ img.caption }
										aria-label={ ariaLabel }
										captions={ captions }
										supportsCaption={ true }
										fontSize={ fontSize.size }
									/>
								</li>
							);
						} ) }
						<li className="coblocks-gallery--item">
							<GalleryPlaceholder { ...this.props } />
						</li>
					</ul>
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
	withColors( { backgroundColor : 'background-color', captionColor : 'color' } ),
	withFontSizes( 'fontSize' ),
	withNotices,
] )( GalleryStackedEdit );
