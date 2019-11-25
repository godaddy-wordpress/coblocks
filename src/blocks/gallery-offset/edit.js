/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';

/**
 * Internal dependencies
 */
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import Inspector from './inspector';
import Controls from './controls';
import icon from './icon';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withNotices } from '@wordpress/components';
import { withFontSizes } from '@wordpress/block-editor';

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.setImageAttributes = this.setImageAttributes.bind( this );
		this.gutterClasses = this.gutterClasses.bind( this );

		this.state = {
			selectedImage: null,
		};
	}

	componentDidMount() {
		if ( this.props.wideControlsEnabled === true && ! this.props.attributes.align ) {
			this.props.setAttributes( {
				align: 'wide',
			} );
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

	gutterClasses() {
		const {
			attributes,
		} = this.props;

		const {
			gutter,
		} = attributes;

		let gutterClasses;

		switch ( gutter ) {
			case 0:
				gutterClasses = 'm-0';
				break;
			case 1:
				gutterClasses = 'mr-1 mb-1';
				break;
			case 2:
				gutterClasses = 'mr-1 sm:mr-2 md:mr-3 mb-1 sm:mb-2 md:mb-3';
				break;
			case 3:
				gutterClasses = 'mr-1 sm:mr-2 md:mr-3 lg:mr-4 mb-1 sm:mb-2 md:mb-3 lg:mb-4';
				break;
		}

		return gutterClasses;
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			noticeUI,
			fontSize,
		} = this.props;

		const {
			align,
			captions,
			contentAlign,
			gutter,
			images,
			linkTo,
			lightbox,
		} = attributes;

		const hasImages = !! images.length;

		const wrapperClasses = classnames(
			className, {
				'has-lightbox': lightbox,
			}
		);

		const innerClasses = classnames(
			...GalleryClasses( attributes ),
			`has-${ contentAlign }-content`,
			'mb-0', {
				[ `align${ align }` ]: align,
				'has-margin': gutter < 0,
			}
		);

		const offsetGalleryPlaceholder = (
			<Fragment>
				{ ! hasImages ? noticeUI : null }
				<GalleryPlaceholder
					{ ...this.props }
					label={ __( 'Offset', 'coblocks' ) }
					icon={ icon }
					gutter={ gutter === 0 ? 14 : 0 }
				/>
			</Fragment>
		);

		if ( ! hasImages ) {
			return offsetGalleryPlaceholder;
		}

		return (
			<Fragment>
				<Controls { ...this.props } />
				<Inspector
					{ ...this.props }
				/>
				{ noticeUI }
				<div className={ wrapperClasses }>
					<ul className={ innerClasses }>
						{ images.map( ( img, index ) => {
							const ariaLabel = sprintf(
								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
								( index + 1 ),
								images.length
							);

							return (
								<li className="coblocks-gallery--item" key={ img.id || img.url }>
									<GalleryImage
										url={ img.url }
										alt={ img.alt }
										id={ img.id }
										gutterUtility={ this.gutterClasses() }
										isSelected={ isSelected && this.state.selectedImage === index }
										onRemove={ this.onRemoveImage( index ) }
										onSelect={ this.onSelectImage( index ) }
										setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
										caption={ img.caption }
										aria-label={ ariaLabel }
										captions={ captions }
										supportsCaption={ true }
										imgLink={ img.imgLink }
										linkTo={ linkTo }
										isFirstItem={ index === 0 }
										isLastItem={ ( index + 1 ) === images.length }
										onMoveBackward={ this.onMoveBackward( index ) }
										onMoveForward={ this.onMoveForward( index ) }
										fontSize={ fontSize.size }
										newClass="wp-block-coblocks-gallery-offset__figure"
									/>
								</li>
							);
						} ) }
					</ul>
					{ offsetGalleryPlaceholder }
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
	withNotices,
] )( Edit );
