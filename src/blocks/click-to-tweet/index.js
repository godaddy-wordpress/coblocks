/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import edit from './edit';
import icons from './../../utils/icons';
import save from './save';
import transforms from './transforms';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Click to Tweet' );

const icon = icons.twitter;

const settings = {

	title,

	description: __( 'Add a quote for readers to tweet via Twitter.' ),

	keywords: [ __( 'share' ), __( 'twitter' ), __( 'coblocks' ) ],

	attributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
