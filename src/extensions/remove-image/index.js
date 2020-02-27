
/**
 * WordPress dependencies
 */
import { ToolbarGroup, Button } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { BlockControls, MediaUpload } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const supportedBlocks = [
	'core/image',
];

const withReplaceImage = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( props.name.includes( supportedBlocks ) ) {
			const {
				mediaURL,
				mediaId,
				allowedTypes,
				accept,
				onSelect,
				onSelectURL,
				onError,
			} = props;
			console.log( props );
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<BlockControls>
						<ToolbarGroup className="replace-image-button">
							<MediaUpload
								value={ mediaId }
								onSelect={ ( media ) => selectMedia( media ) }
								allowedTypes={ allowedTypes }
								render={ ( { open } ) => (
									<Button
										onClick={ () => open }
									>
										{ __( 'Replace Image', 'coblocks' ) }
									</Button>
								) }
							/>

						</ToolbarGroup>
					</BlockControls>
				</Fragment>
			);
		}
		return 	<BlockEdit { ...props } />;
	};
}, 'withInspectorControl' );

addFilter( 'editor.BlockEdit', 'coblocks/replace-image-button', withReplaceImage );
