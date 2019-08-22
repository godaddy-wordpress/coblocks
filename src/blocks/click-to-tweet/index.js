/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import metadata from './block.json';
import edit from './edit';
import icons from './../../utils/icons';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const icon = icons.twitter;

const settings = {
	title: __( 'Click to Tweet' ),

	description: __( 'Add a quote for readers to tweet via Twitter.' ),

	keywords: [ __( 'share' ), __( 'twitter' ), __( 'coblocks' ) ],

	attributes,

	transforms,

	edit,

	save,
};

export { name, icon, settings };
