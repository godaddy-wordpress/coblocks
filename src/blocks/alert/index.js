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

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'alert';

const title = __( 'Alert' );

const icon = icons.alert;

const blockAttributes = {
	title: {
		type: 'string',
		selector: '.wp-block-coblocks-alert__title',
	},
	value: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-coblocks-alert__text',
		default: [],
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	customTitleColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	titleColor: {
		type: 'string',
	},
	textAlign: {
		type: 'string',
	},
	type: {
		type: 'string',
		default: 'default',
	},
	borderColor: {
		type: 'string',
	},
	customBorderColor: {
		type: 'string',
	},
};

const settings = {

	title,

	description: __( 'Provide contextual feedback messages.' ),

	keywords: [	__( 'notice' ),	__( 'message' ), __( 'coblocks' ) ],

	attributes: blockAttributes,

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

export { name, title, icon, settings, blockAttributes };
