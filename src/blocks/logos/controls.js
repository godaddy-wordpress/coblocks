/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { edit } from '@wordpress/icons';
import {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		setAttributes,
		attributes,
	} = props;

	const hasImages = !! attributes.images.length;

	const onSelectImages = ( images ) => {
		setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
		} );
	};

	return (
		<BlockControls>
			{ hasImages && (
				<>
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={ [ 'image' ] }
								gallery
								multiple
								onSelect={ onSelectImages }
								render={ ( { open } ) => (
									<ToolbarButton
										className="components-toolbar__control"
										icon={ edit }
										label={ __( 'Edit logos', 'coblocks' ) }
										onClick={ open }
									/>
								) }
								value={ attributes.images.map( ( img ) => img.id ) }
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				</>
			) }
		</BlockControls>
	);
};

export default Controls;
