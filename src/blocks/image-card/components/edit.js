/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';
import BackgroundImagePanel, { BackgroundClasses, BackgroundImageDropZone } from '../../../components/background';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { RichText, URLInput, MediaUpload, MediaPlaceholder, mediaUpload, withFontSizes, InnerBlocks } = wp.editor;
const { IconButton, DropZone } = wp.components;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_MEDIA_TYPES = [ 'image' ];
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/spacer', 'core/button', 'core/list' ];
const TEMPLATE = [ 
			[ 'core/heading', { placeholder: __( 'Add title...' ), content: __( 'Image Card' ), level: 3 } ],
			[ 'core/paragraph', { placeholder: __( 'Add feature content...' ), content: __( 'Showcase an image card with an offset text block.' ) } ],
			[ 'core/button', { text: __( 'Buy Now' ) } ] 
		];

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.addImage = this.addImage.bind( this );
	}

	componentDidMount() {

		if ( this.props.wideControlsEnabled == true && ! this.props.attributes.align  ) {
			this.props.setAttributes( {
				align: 'wide',
			} );
		}
	}

	addImage( files ) {
		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImage( media ),
		} );
	}

	onRemoveImage() {
		this.props.setAttributes( { imgUrl: '' } );
	}

	onSelectImage( media ) {
		this.props.setAttributes( { imgUrl: media.url } );
	}

	render() {

		const {
			attributes,
			backgroundColor,
			cardBackgroundColor,
			className,
			fontSize,
			headingColor,
			headingFontSize,
			isSelected,
			setAttributes,
			setState,
			textColor,
		} = this.props;

		const {
			coblocks,
			alt,
			backgroundImg,
			content,
			contentAlign,
			fontFamily,
			hasCardShadow,
			hasImgShadow,
			imgId,
			imgUrl,

			//dimension controls
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			paddingSize,
		} = attributes;

		const dropZone = (
			<BackgroundImageDropZone
				{ ...this.props }
				label={ __( 'Add backround image' ) }
			/>
		);

		const imageDropZone = (
			<DropZone
				onFilesDrop={ this.addImage }
				label={ __( 'Upload image' ) }
			/>
		);

		const innerClasses = classnames(
			'wp-block-coblocks-image-card__inner',
			...BackgroundClasses( attributes ), {
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const innerStyles = {
			backgroundColor: backgroundColor.color,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		};

		return [
			<Fragment>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className,{
							'has-background': backgroundColor.color,
							[ backgroundColor.class ]: backgroundColor.class,
							[ `coblocks-image-card-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
						}
					) }
				>
					<div className={ innerClasses } style={ innerStyles } >
						<div className="wp-block-coblocks-image-card__intrinsic">

							<div
								className={ classnames(
									'wp-block-coblocks-image-card__img-wrapper', {
										'has-no-image': ! imgUrl || null,
										'has-shadow': hasImgShadow,
									}
								) }
							>
								{ ! imgUrl ?
									<MediaPlaceholder
										icon={ 'format-image' }
										labels={ {
											title: __( 'Upload Image' ),
											name: __( 'an image' ),
										} }
										onSelect={ this.onSelectImage }
										accept="image/*"
										allowedTypes={ ALLOWED_MEDIA_TYPES }
									/>
								:
									<div>
										{ imageDropZone }
										<img src={ imgUrl } alt={ alt }/>
										{ this.props.isSelected ?
											<IconButton
												className="components-coblocks__delete-image-button"
												label={ __( 'Remove image' ) }
												icon={ icons.trash }
												onClick={ this.onRemoveImage }
											/>
										: null }
									</div>
								}
							</div>
						</div>
						<div className="wp-block-coblocks-image-card__card-wrapper">
							<div
								className={ classnames(
									'wp-block-coblocks-image-card__card', {
										'has-background': cardBackgroundColor.color,
										[ cardBackgroundColor.class ]: cardBackgroundColor.class,
										'has-shadow': hasCardShadow,
									}
								) }
								style={ {
									backgroundColor: cardBackgroundColor.color,
									textAlign: contentAlign,
								} }
							>
								{ ( typeof this.props.insertBlocksAfter !== 'undefined' ) && (
									<InnerBlocks
										template={ TEMPLATE }
										allowedBlocks={ ALLOWED_BLOCKS }
										templateLock={ false }
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyWithColors,
	withFontSizes( 'fontSize', 'headingFontSize', 'buttonFontSize' ),
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
] )( Edit );
