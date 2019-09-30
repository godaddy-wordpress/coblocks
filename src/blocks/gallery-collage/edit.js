/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withNotices, DropZone, Spinner, IconButton } from '@wordpress/components';
import { MediaPlaceholder, RichText, withColors } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';

class GalleryCollageEdit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			images: [],
			selectedImage: null,
		};
	}

	componentDidMount() {
		this.setupImageLocations();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.className !== prevProps.className ) {
			this.setupImageLocations();

			if ( this.props.className.includes( 'is-style-layered' ) ) {
				this.props.setAttributes( { gutter: 0, gutterMobile: 0 } );
			}
		}

		if ( this.props.isSelected !== prevProps.isSelected && this.props.isSelected === false ) {
			this.setState( { selectedImage: null } );
		}
	}

	setupImageLocations = ( images = null ) => {
		const theImages = images || this.props.attributes.images;

		const placeholderCount = this.props.className.includes( 'is-style-tiled' ) || this.props.className.includes( 'is-style-layered' ) ? 4 : 5;
		const imageLocations = [];

		for ( let index = 0; index < placeholderCount; index++ ) {
			imageLocations.push( theImages.find( image => parseInt( image.index ) === parseInt( index ) ) || {} );
		}

		this.props.setAttributes( { images: imageLocations } );
		this.setState( { images: imageLocations } );
	};

	onSelectImage = ( index ) => {
		if ( this.state.selectedImage !== index ) {
			this.setState( { selectedImage: index } );
		}
	}

	locationClasses = ( classes ) => classnames( classes,
		{
			'has-gutter': !! this.props.attributes.gutter,
			[ `has-gutter-${ this.props.attributes.gutter }` ]: !! this.props.attributes.gutter,
			[ `has-gutter-mobile-${ this.props.attributes.gutterMobile }` ]: !! this.props.attributes.gutterMobile,
		}
	);

	uploadImage = ( files, index ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ image ] ) => this.replaceImage( image, index ),
		} );
	};

	replaceImage = ( image, index ) => {
		const { attributes } = this.props;

		const images = [
			...attributes.images.filter( image => parseInt( image.index ) !== parseInt( index ) ),
			{ ...helper.pickRelevantMediaFiles( image ), index },
		];
		this.setupImageLocations( images );
	};

	removeImage = ( index ) => {
		const { attributes } = this.props;

		const images = [
			...attributes.images.filter( image => parseInt( image.index ) !== parseInt( index ) ),
		];
		this.setupImageLocations( images );
	};

	updateImageAttributes = ( index, newAttributes ) => {
		const { attributes } = this.props;
		const image = attributes.images.filter( image => parseInt( image.index ) === parseInt( index ) ).pop();

		const images = [
			...attributes.images.filter( image => parseInt( image.index ) !== parseInt( index ) ),
			Object.assign( {}, image, newAttributes ),
		];

		this.setupImageLocations( images );
	}

	renderImage( index ) {
		const image = this.props.attributes.images.filter( image => parseInt( image.index ) === parseInt( index ) ).pop() || {};
		const isSelected = this.props.isSelected && this.state.selectedImage === image.index;

		const dropZone = (
			<DropZone
				onFilesDrop={ files => this.uploadImage( files, index ) }
				label={ __( 'Drop image to replace' ) }
			/>
		);

		return (
			<Fragment>
				<a onClick={ () => this.onSelectImage( image.index ) }>
					<figure
						className={ this.locationClasses( {
							'wp-block-coblocks-gallery-collage__figure': true,
							'is-transient': isBlobURL( image.url ),
							'is-selected': isSelected,
						} ) }>
						{ isSelected && (
							<div className="components-coblocks-gallery-item__remove-menu">
								<IconButton
									icon="no-alt"
									onClick={ () => this.removeImage( index ) }
									className="coblocks-gallery-item__button"
									label={ __( 'Remove Image' ) }
									disabled={ ! isSelected }
								/>
							</div>
						) }
						{ dropZone }
						{ isBlobURL( image.url ) && <Spinner /> }
						<img src={ image.url } alt={ image.alt } />
						{ this.props.attributes.captions && ( image.caption || isSelected ) &&
							<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption...' ) }
								className="coblocks-gallery--caption"
								style={ { color: this.props.captionColor.color } }
								value={ image.caption }
								onChange={ ( caption ) => this.updateImageAttributes( index, { caption } ) }
								isSelected={ isSelected }
								inlineToolbar
							/>
						}
					</figure>
				</a>
			</Fragment>
		);
	}

	renderPlaceholder( index ) {
		return (
			<MediaPlaceholder
				className={ this.locationClasses( 'wp-block-coblocks-gallery-collage__figure' ) }
				allowedTypes={ [ 'image' ] }
				multiple={ false }
				icon={ false }
				labels={ {
					title: ' ',
					instructions: ' ',
				} }
				onSelect={ image => this.replaceImage( image, index ) }
			/>
		);
	}

	render() {
		const {
			attributes,
			captionColor,
			className,
			noticeUI,
		} = this.props;

		const {
			captionStyle,
			filter,
		} = attributes;

		const innerStyles = {
			color: ! captionColor.class && captionColor.color,
		};

		const gutterStyles = className.includes( 'is-style-layered' );
		const enableGutter = ! gutterStyles;

		return (
			<Fragment>
				<Controls { ...this.props } />
				<Inspector { ...this.props } enableGutter={ enableGutter } />
				{ noticeUI }
				<div className={ classnames( className, {
					[ `has-filter-${ filter }` ]: filter !== 'none',
					[ `has-caption-style-${ captionStyle }` ]: captionStyle !== undefined,
					'has-caption-color': captionColor.color,
					[ captionColor.class ]: captionColor.class,
				} ) }>
					<ul style={ innerStyles }>
						{ this.state.images.map( ( img, index ) => {
							const theIndex = img.index || index;
							return (
								<li className="wp-block-coblocks-gallery-collage__item" key={ `image-${ theIndex }` }>
									{ !! img.url ? this.renderImage( theIndex ) : this.renderPlaceholder( theIndex ) }
								</li>
							);
						} ) }
					</ul>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( { captionColor: 'color' } ),
	withNotices,
] )( GalleryCollageEdit );
