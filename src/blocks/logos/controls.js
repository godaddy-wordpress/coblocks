/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';

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
					<Toolbar label={ __( 'Logos controls', 'coblocks' ) }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectImages }
								allowedTypes={ [ 'image' ] }
								multiple
								gallery
								value={ attributes.images.map( ( img ) => img.id ) }
								render={ ( { open } ) => (
									<ToolbarButton
										className="components-toolbar__control"
										label={ __( 'Edit logos', 'coblocks' ) }
										icon={ edit }
										onClick={ open }
									/>
								) }
							/>
						</MediaUploadCheck>
					</Toolbar>
				</>
			) }
		</BlockControls>
	);
};

export default Controls;
