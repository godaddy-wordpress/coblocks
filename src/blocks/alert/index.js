/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import edit from './edit';
import save from './save';
import icons from './../../utils/icons';
import transforms from './transforms';
import deprecated from './deprecated';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { attributes, name } = metadata;

const title = __( 'Alert' );

const icon = icons.alert;

const settings = {

	title,

	description: __( 'Provide contextual feedback messages.' ),

	keywords: [	__( 'notice' ),	__( 'message' ), __( 'coblocks' ) ],

	attributes,

	supports: {
		align: true,
		alignWide: false,
		alignFull: false,
	},

	transforms,

	edit,

	save,

	deprecated,
};

export { name, title, icon, settings };
