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
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const name = 'event-item';

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
		default: '#000000',
	},
	customTextColor: {
		type: 'string',
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

export { name, title, icon, settings };
