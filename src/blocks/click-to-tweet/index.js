/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
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
const name = 'click-to-tweet';

const title = __( 'Click to Tweet' );

const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
		default: [],
	},
	url: {
		type: 'attribute',
	},
	textAlign: {
		type: 'string',
	},
	via: {
		type: 'string',
	},
	buttonText: {
		type: 'string',
		default: __( 'Tweet' ),
	},
	buttonColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customButtonColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	fontSize: {
		type: 'string',
	},
	customFontSize: {
		type: 'number',
	},
};

const icon = icons.twitter;

const settings = {

	title,

	description: __( 'Add a quote for readers to tweet via Twitter.' ),

	keywords: [ __( 'share' ), __( 'twitter' ), 'coblocks' ],

	attributes: blockAttributes,

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
