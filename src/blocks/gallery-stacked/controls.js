/**
 * Internal dependencies
 */
import MediaFilterControl from '../../components/media-filter-control';

/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';

const Controls = ( props ) => {
	const { attributes } = props;
	const { images } = attributes;

	const hasImages = !! images.length;

	return (
		<BlockControls>
			{ hasImages && (
				<MediaFilterControl
					{ ...props }
				/>
			) }
		</BlockControls>
	);
};

export default Controls;
