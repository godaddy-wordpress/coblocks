/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import { computeFontSize } from '../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { mediaUpload } from '@wordpress/editor';
import { withSelect, select } from '@wordpress/data';
import { Button, DropZone } from '@wordpress/components';
import { image as icon } from '@wordpress/icons';
import {
	RichText,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	withColors,
	withFontSizes,
	BlockIcon,
} from '@wordpress/block-editor';

const AuthorEdit = ( props ) => {
	const onSelectImage = ( media ) => {
		if ( media && media.url ) {
			props.setAttributes( { imgUrl: media.url } );
		}
	};

	const addImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => onSelectImage( media ),
		} );
	};

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
	} = props;

	const {
		biography,
		imgUrl,
		name,
	} = attributes;

	const hasImage = !! imgUrl;

	const dropZone = (
		<DropZone
			onFilesDrop={ addImage }
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
		fontSize: computeFontSize( fontSize ),
	};

	const onUploadImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

	return (
		<>
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<div className={ classes } style={ styles }>
				{ dropZone }
				{ ( !! isSelected || clientId === selectedParentClientId || hasImage )
					? <figure className="wp-block-coblocks-author__avatar">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onUploadImage }
								allowedTypes={ [ 'image' ] }
								value={ imgUrl }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! imgUrl
											? <BlockIcon icon={ icon } />
											: <img className="wp-block-coblocks-author__avatar-img" src={ imgUrl } alt="avatar" />
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
					/>
					<InnerBlocks
						template={ [ [ 'core/button', { placeholder: /* translators: content placeholder */ __( 'Author link…', 'coblocks' ) } ] ] }
						allowedBlocks={ [ 'core/button' ] }
						templateInsertUpdatesSelection={ false }
						__experimentalCaptureToolbars={ true }
					/>
				</div>
			</div>
		</>
	);
};

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
