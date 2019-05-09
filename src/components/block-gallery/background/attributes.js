/**
 * Set the attributes for the Background Panel
 * @type {Object}
 */
const BackgroundAttributes = {
	backgroundImg: {
		type: 'string',
	},
	backgroundPosition: {
		type: 'string',
		default: 'center center',
	},
	backgroundRepeat: {
		type: 'string',
		default: 'no-repeat',
	},
	backgroundSize: {
		type: 'string',
	},
	backgroundRadius: {
		type: 'number',
		default: 0,
	},
	backgroundPadding: {
		type: 'number',
		default: 0,
	},
	backgroundPaddingMobile: {
		type: 'number',
		default: 0,
	},
	hasParallax: {
		type: 'boolean',
		default: false,
	},
	backgroundOverlay: {
		type: 'number',
		default: 0,
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
};

export default BackgroundAttributes;