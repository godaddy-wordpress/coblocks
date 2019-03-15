/**
 * Set the attributes for the Background Image Panel
 * @type {Object}
 */
const BackgroundAttributes = {
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
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
	hasParallax: {
		type: 'boolean',
		default: false,
	},
	backgroundOverlay: {
		type: 'number',
		default: 0,
	},
	focalPoint: {
		type: 'object',
	},
	backgroundType: {
		type: 'string',
		default: 'image',
	},
};

export default BackgroundAttributes;