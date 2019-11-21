/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { mediaUpload } from '@wordpress/editor';
import { withSelect, select } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { Button, Dashicon, DropZone } from '@wordpress/components';
import { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, withColors, withFontSizes } from '@wordpress/block-editor';

class AuthorEdit extends Component {
	constructor() {
		super( ...arguments );
		this.addImage = this.addImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
	}

	onSelectImage( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { imgUrl: media.url } );
		}
	}

	addImage( files ) {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImage( media ),
		} );
	}

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			clientId,
			fontSize,
			isSelected,
			selectedParentClientId,
			setAttributes,
			textColor,
		} = this.props;

		const {
			biography,
			imgUrl,
			name,
		} = attributes;

		const hasImage = !! imgUrl;

		const dropZone = (
			<DropZone
				onFilesDrop={ this.addImage }
				/* translators: image to represent the post author */
				label={ __( 'Drop to upload as avatar', 'coblocks' ) }
			/>
		);

		const classes = classnames(
			className, {
				'has-background': backgroundColor.color,
				'has-text-color': textColor.color,
				[ backgroundColor.class ]: backgroundColor.class,
				[ textColor.class ]: textColor.class,
			}
		);

		const styles = {
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
		};

		const onUploadImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

		return (
			<Fragment>
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
				<div className={ classes } style={ styles }>
					{ dropZone }
					{ ( !! isSelected || clientId === selectedParentClientId || hasImage ) ?
						<figure className="wp-block-coblocks-author__avatar">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onUploadImage }
									allowedTypes={ [ 'image' ] }
									value={ imgUrl }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! imgUrl ?
												<Dashicon icon="format-image" /> :
												<img className="wp-block-coblocks-author__avatar-img"
													src={ imgUrl }
													alt="avatar"
												/>
											}
										</Button>
									) }
								>
								</MediaUpload>
							</MediaUploadCheck>
						</figure> : null }
					<div className={ `${ className }__content` }>
						<RichText
							identifier="name"
							multiline={ false }
							tagName="span"
							className="wp-block-coblocks-author__name"
							placeholder={
								/* translators: placeholder text used for the author name */
								__( 'Write author name…', 'coblocks' )
							}
							value={ name }
							onChange={ ( nextName ) => {
								setAttributes( { name: nextName } );
							} }
							keepPlaceholderOnFocus={ true }
						/>
						<RichText
							identifier="biography"
							multiline={ false }
							tagName="p"
							className="wp-block-coblocks-author__biography"
							placeholder={
								/* translators: placeholder text used for the biography */
								__( 'Write a biography that distills objective credibility and authority to your readers…', 'coblocks' )
							}
							value={ biography }
							onChange={ ( nextBio ) => {
								setAttributes( { biography: nextBio } );
							} }
							keepPlaceholderOnFocus={ true }
						/>
						<InnerBlocks
							template={ [ [ 'core/button', { placeholder: /* translators: content placeholder */ __( 'Author link…', 'coblocks' ) } ] ] }
							templateLock="all"
							allowedBlocks={ [ 'core/button' ] }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const selectedClientId = select( 'core/block-editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/block-editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
	};
} );

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
	withFontSizes( 'fontSize' ),
	applyWithSelect,
] )( AuthorEdit );
