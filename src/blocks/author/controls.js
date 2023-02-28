/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { edit } from '@wordpress/icons';
import { BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Toolbar } from '@wordpress/components';

const Controls = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		imgUrl,
		imgId,
	} = attributes;

	const onSelectImage = ( media ) => setAttributes( { imgId: media.id, imgUrl: media.url } );

	return (
		<BlockControls>
			{ imgUrl &&
				<MediaUploadCheck>
					<Toolbar label={ __( 'Author controls', 'coblocks' ) }>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							onSelect={ onSelectImage }
							render={ ( { open } ) => (
								<Button
									className="components-toolbar__control"
									icon={ edit }
									label={ __( 'Edit avatar', 'coblocks' ) }
									onClick={ open }
								/>
							) }
							value={ imgId }
						/>
					</Toolbar>
				</MediaUploadCheck>
			}
		</BlockControls>
	);
};

export default Controls;
