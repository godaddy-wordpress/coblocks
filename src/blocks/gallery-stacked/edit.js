/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import { GalleryStackedIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withNotices, Icon } from '@wordpress/components';
import { withFontSizes } from '@wordpress/block-editor';

class GalleryStackedEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.replaceImage = this.replaceImage.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		// This block does not support caption style.
		if ( typeof attributes.captionStyle !== 'undefined' ) {
			setAttributes( { captionStyle: undefined } );
		}
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

	/**
	 * replaceImage is passed to GalleryImage component and is used to replace images
	 *
	 * @param {number} index Index of image to remove.
	 * @param {Object} media Media object used to initialize attributes.
	 */
	replaceImage( index, media ) {
		const images = [ ...this.props.attributes.images ];
		images[ index ] = { ...media };

		this.props.setAttributes( { images } );
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
			className,
			fontSize,
			isSelected,
			noticeUI,
		} = this.props;

		const {
			align,
			animation,
			captions,
			fullwidth,
			gutter,
			gutterMobile,
			images,
			shadow,
			linkTo,
			lightbox,
		} = attributes;

		const hasImages = !! images.length;

		const stackedGalleryPlaceholder = (
			<Fragment>
				{ ! hasImages ? noticeUI : null }
				<GalleryPlaceholder
					{ ...this.props }
					label={ __( 'Stacked', 'coblocks' ) }
					icon={ <Icon icon={ icon } /> }
					gutter={ gutter }
				/>
			</Fragment> );

		if ( ! hasImages ) {
			return stackedGalleryPlaceholder;
		}

		const classes = classnames(
			className, {
				'has-lightbox': lightbox,
			}
		);

		const innerClasses = classnames(
			...GalleryClasses( attributes ), {
				'has-fullwidth-images': fullwidth,
				[ `align${ align }` ]: align,
				'has-margin': gutter > 0,
				'has-lightbox': lightbox,
				[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
			}
		);

		const itemClasses = classnames(
			'coblocks-gallery--item', {
				[ `coblocks-animate ${ animation }` ]: animation,
			}
		);

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
				<div className={ classes }>
					<ul className={ innerClasses }>
						{ images.map( ( img, index ) => {
							const ariaLabel = sprintf(
								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
								( index + 1 ),
								images.length
							);

							return (
								<li className={ itemClasses } key={ img.id || img.url }>
									<GalleryImage
										url={ img.url }
										alt={ img.alt }
										id={ img.id }
										imgLink={ img.imgLink }
										linkTo={ linkTo }
										gutter={ gutter }
										gutterMobile={ gutterMobile }
										marginBottom={ true }
										shadow={ shadow }
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
										verticalMoving={ true }
										fontSize={ fontSize.size }
										imageIndex={ index }
										replaceImage={ this.replaceImage }
									/>
								</li>
							);
						} ) }
						{ stackedGalleryPlaceholder }
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
	withFontSizes( 'fontSize' ),
	withNotices,
] )( GalleryStackedEdit );
