
/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const supportedBlocks = [
	'core/image',
];

const withReplaceImage = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name.includes( supportedBlocks ) && !! props.attributes.url ) {
			const {
				setAttributes,
				url,
			} = props;

			const onUploadImage = ( media ) => setAttributes( { url: media.url, id: media.id } );

			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<div className="replace-image-button">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									onSelect={ onUploadImage }
									value={ url }
									render={ ( { open } ) => (
										<Button className="is-secondary" onClick={ open }>
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

addFilter( 'editor.BlockEdit', 'coblocks/replace-image-button', withReplaceImage );
