/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Toolbar, Button } from '@wordpress/components';
import { edit } from '@wordpress/icons';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		imgUrl,
		imgId,
	} = attributes;

	const onSelectImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

	return (
		<BlockControls>
			{ imgUrl &&
				<MediaUploadCheck>
					<Toolbar label={ __( 'Author controls', 'coblocks' ) }>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imgId }
							render={ ( { open } ) => (
								<Button
									className="components-toolbar__control"
									label={ __( 'Edit avatar', 'coblocks' ) }
									icon={ edit }
									onClick={ open }
								/>
							) }
						/>
					</Toolbar>
				</MediaUploadCheck>
			}
		</BlockControls>
	);
};

export default Controls;
