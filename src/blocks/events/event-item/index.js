/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

import icons from './icons';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const name = 'coblocks/event-item';

const category = 'coblocks';

const title = __( 'Event Item' );

const icon = icons.eventItem;

const keywords = [];

const attributes = {
	title: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__heading',
		default: '',
	},
	description: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__description',
		default: '',
	},
	eventDay: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__day',
		default: '',
	},
	eventMonth: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__month',
		default: '',
	},
	eventDate: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__date',
		default: '',
	},
	eventTime: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__time',
		default: '',
	},
	eventLocation: {
		type: 'string',
		source: 'html',
		selector: '.wp-block-coblocks-event-item__location',
		default: '',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	pageNum: {
		type: 'number',
		default: 0,
	},
	lastItem: {
		type: 'bool',
		default: false,
	},
};

const settings = {
	title,

	description: __( 'A event item within the events block.' ),

	keywords,

	attributes,

	supports: {
		inserter: false,
		customClassName: false,
		reusable: false,
		html: false,
	},

	parent: [ 'coblocks/events' ],

	edit,
	save,
};

export { name, title, icon, settings, category };
