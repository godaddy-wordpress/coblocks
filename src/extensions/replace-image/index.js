/**
 * External dependencies
 */
import { get, omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

const supportedBlocks = [
	'core/image',
];

const useReplaceImage = ( props ) => {
	if ( props.name.includes( supportedBlocks ) && !! props.attributes.url ) {
		const {
			setAttributes,
			attributes,
		} = props;

		const onSelectImage = ( media ) => {
			if ( ! media || ! media.url ) {
				this.props.setAttributes( {
					alt: undefined,
					caption: undefined,
					id: undefined,
					title: undefined,
					url: undefined,
				} );
				return;
			}

			const {
				id,
				url,
				alt,
				caption,
				linkDestination,
			} = attributes;

			let mediaAttributes = helper.pickRelevantMediaFiles( media );

			// If the current image is temporary but an alt text was meanwhile written by the user,
			// make sure the text is not overwritten.
			if ( helper.isTemporaryImage( id, url ) ) {
				if ( alt ) {
					mediaAttributes = omit( mediaAttributes, [ 'alt' ] );
				}
			}

			// If a caption text was meanwhile written by the user,
			// make sure the text is not overwritten by empty captions
			if ( caption && ! get( mediaAttributes, [ 'caption' ] ) ) {
				mediaAttributes = omit( mediaAttributes, [ 'caption' ] );
			}

			let additionalAttributes;
			// Reset the dimension attributes if changing to a different image.
			if ( ! media.id || media.id !== id ) {
				additionalAttributes = {
					height: undefined,
					sizeSlug: 'large',
					width: undefined,
				};
			} else {
				// Keep the same url when selecting the same file, so "Image Size" option is not changed.
				additionalAttributes = { url };
			}

			// Check if the image is linked to it's media.
			if ( linkDestination === 'media' ) {
				// Update the media link.
				mediaAttributes.href = media.url;
			}

			// Check if the image is linked to the attachment page.
			if ( linkDestination === 'attachment' ) {
				// Update the media link.
				mediaAttributes.href = media.link;
			}

			setAttributes( {
				...mediaAttributes,
				...additionalAttributes,
			} );
		};

		return (
			<>
				<InspectorControls>
					<div className="components-coblocks-replace-image">
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={ [ 'image' ] }
								onSelect={ onSelectImage }
								render={ ( { open } ) => (
									<Button
										isSecondary
										isSmall
										onClick={ open }>
										{ __( 'Replace Image', 'coblocks' ) }
									</Button>
								) }
								value={ props.url }
							>
							</MediaUpload>
						</MediaUploadCheck>
					</div>
				</InspectorControls>
			</>
		);
	}
};

export { useReplaceImage };
