
/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, ToolbarGroup } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const supportedBlocks = [
	'core/image',
];

const withReplaceImage = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name.includes( supportedBlocks ) ) {
			const {
				setAttributes,
				url,
			} = props;

			const onUploadImage = ( media ) => setAttributes( { url: media.url, id: media.id } );

			const supportsToolbarGroup = !! ToolbarGroup;

			const ToolbarElement = ( { children } ) => {
				if ( supportsToolbarGroup ) {
					return <ToolbarGroup className="replace-image-button">{ children }</ToolbarGroup>;
				}
				return <div className="replace-image-button">{ children }</div>;
			};

			return (
				<Fragment>
					<BlockEdit { ...props } />
					<BlockControls>
						<ToolbarElement>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									onSelect={ onUploadImage }
									value={ url }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ __( 'Replace Image', 'coblocks' ) }
										</Button>
									) }
								>
								</MediaUpload>
							</MediaUploadCheck>
						</ToolbarElement>
					</BlockControls>
				</Fragment>
			);
		}
		return 	<BlockEdit { ...props } />;
	};
}, 'withReplaceImage' );

addFilter( 'editor.BlockEdit', 'coblocks/replace-image-button', withReplaceImage );
