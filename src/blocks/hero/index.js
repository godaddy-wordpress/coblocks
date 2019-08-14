/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import CSSGridAttributes from '../../components/grid-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const name = 'hero';

const title = __( 'Hero' );

const icon = icons.hero;

const keywords = [
	__( 'button' ),
	__( 'cta' ),
	__( 'call to action' ),
];

const blockAttributes = {
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	...ResponsiveBaseControlAttributes,
	align: {
		type: 'string',
		default: 'full',
	},
	contentAlign: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	maxWidth: {
		type: 'number',
		default: 560,
	},
	saveCoBlocksMeta: {
		type: 'boolean',
		default: true,
	},
	paddingSize: {
		type: 'string',
		default: 'huge',
	},
	paddingUnit: {
		type: 'string',
		default: 'px',
	},
	paddingTop: {
		type: 'number',
		default: 60,
	},
	paddingBottom: {
		type: 'number',
		default: 60,
	},
	paddingLeft: {
		type: 'number',
		default: 60,
	},
	paddingRight: {
		type: 'number',
		default: 60,
	},
	customBackgroundColor: {
		type: 'string',
		default: '#f3f3f3',
	},
	height: {
		type: 'number',
		default: 500,
	},
};

const settings = {

	title: title,

	description: __( 'An introductory area of a page accompanied by a small amount of text and a call to action.' ),

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
