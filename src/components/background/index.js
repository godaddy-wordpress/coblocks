/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';

import BackgroundAttributes from './attributes';
import BackgroundClasses from './classes';
import BackgroundControls from './controls';
import BackgroundDropZone from './dropzone';
import BackgroundStyles from './styles';
import BackgroundPanel from './panel';
import BackgroundTransforms from './transforms';
import BackgroundVideo from './video';

export {
	BackgroundAttributes,
	BackgroundClasses,
	BackgroundControls,
	BackgroundDropZone,
	BackgroundStyles,
	BackgroundTransforms,
	BackgroundVideo,
	BackgroundPanel,
};

export const ALLOWED_BG_MEDIA_TYPES = [ 'image', 'video' ];
export const BLOCKS_WITH_AUTOPADDING = [ 'coblocks/row', 'coblocks/column', 'coblocks/media-card', 'coblocks/features', 'coblocks/feature' ];
