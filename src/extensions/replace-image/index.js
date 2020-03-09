/**
 * External dependencies
 */
import { get, omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

const supportedBlocks = [
	'core/image',
];

const withReplaceImage = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name.includes( supportedBlocks ) && !! props.attributes.url ) {
			const {
				setAttributes,
				attributes,
			} = props;

			const onSelectImage = ( media ) => {
				if ( ! media || ! media.url ) {
					this.props.setAttributes( {
						url: undefined,
						alt: undefined,
						id: undefined,
						title: undefined,
						caption: undefined,
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
						width: undefined,
						height: undefined,
						sizeSlug: 'large',
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
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<div className="components-coblocks-replace-image">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									onSelect={ onSelectImage }
									value={ props.url }
									render={ ( { open } ) => (
										<Button
											isSmall
											isSecondary
											onClick={ open }>
											{ __( 'Replace Image', 'coblocks' ) }
										</Button>
									) }
								>
								</MediaUpload>
							</MediaUploadCheck>
						</div>
					</InspectorControls>
				</Fragment>
			);
		}
		return 	<BlockEdit { ...props } />;
	};
}, 'withReplaceImage' );

addFilter( 'editor.BlockEdit', 'coblocks/components-coblocks-replace-image', withReplaceImage );
