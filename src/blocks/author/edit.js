/**
 * Internal dependencies
 */
import Controls from './controls';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { image as icon } from '@wordpress/icons';
import { mediaUpload } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import {
	BlockIcon,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, DropZone } from '@wordpress/components';

const AuthorEdit = ( props ) => {
	const {
		attributes,
		className,
		clientId,
		isSelected,
		setAttributes,
	} = props;

	const {
		biography,
		imgUrl,
		name,
	} = attributes;

	const onSelectImage = ( media ) => {
		if ( media && media.url ) {
			setAttributes( { imgUrl: media.url } );
		}
	};

	const addImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => onSelectImage( media ),
		} );
	};

	const hasImage = !! imgUrl;

	const dropZone = (
		<DropZone
			label={ __( 'Drop to upload as avatar', 'coblocks' ) }
			/* translators: image to represent the post author */
			onFilesDrop={ addImage }
		/>
	);

	const blockProps = useBlockProps( { className } );

	const onUploadImage = ( media ) => setAttributes( { imgId: media.id, imgUrl: media.url } );

	const {
		selectedClientId,
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const selectedParentClientId = getBlockRootClientId( selectedClientId );

	return (
		<>
			{ isSelected && (
				<Controls { ...props } />
			) }
			<div { ...blockProps }>
				{ dropZone }
				{ ( !! isSelected || clientId === selectedParentClientId || hasImage )
					? <figure className="wp-block-coblocks-author__avatar">
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={ [ 'image' ] }
								onSelect={ onUploadImage }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! imgUrl
											? <BlockIcon icon={ icon } />
											: <img alt="avatar" className="wp-block-coblocks-author__avatar-img" src={ imgUrl } />
										}
									</Button>
								) }
								value={ imgUrl }
							>
							</MediaUpload>
						</MediaUploadCheck>
					</figure> : null }
				<div className={ `${ className }__content` }>
					<RichText
						className="wp-block-coblocks-author__name"
						identifier="name"
						multiline={ false }
						onChange={ ( nextName ) => {
							setAttributes( { name: nextName } );
						} }
						placeholder={
							/* translators: placeholder text used for the author name */
							__( 'Write author name…', 'coblocks' )
						}
						tagName="span"
						value={ name }
					/>
					<RichText
						className="wp-block-coblocks-author__biography"
						identifier="biography"
						multiline={ false }
						onChange={ ( nextBio ) => {
							setAttributes( { biography: nextBio } );
						} }
						placeholder={
							/* translators: placeholder text used for the biography */
							__( 'Write a biography that distills objective credibility and authority to your readers…', 'coblocks' )
						}
						tagName="p"
						value={ biography }
					/>
					<InnerBlocks
						__experimentalCaptureToolbars={ true }
						allowedBlocks={ [ 'core/button' ] }
						template={ [ [ 'core/button', { placeholder: /* translators: content placeholder */ __( 'Author link…', 'coblocks' ) } ] ] }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</div>
		</>
	);
};

export default AuthorEdit;
