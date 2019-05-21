/**
 * Set the attributes for the Background Panel
 * @type {Object}
 */
const BackgroundAttributes = {
	backgroundType: {
		type: 'string',
		default: 'image',
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
	hasParallax: {
		type: 'boolean',
		default: false,
	},
	focalPoint: {
		type: 'object',
	},
	videoMuted: {
		type: 'boolean',
		default: true,
	},
	videoLoop: {
		type: 'boolean',
		default: true,
	},
	openPopover: {
		type: 'boolean',
		default: false,
	},
};

export default BackgroundAttributes;