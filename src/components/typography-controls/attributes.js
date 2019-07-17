/**
 * Set the attributes for the text panel
 * @type {Object}
 */
const TypographyAttributes = {
	fontSize: {
		type: 'number',
	},
	customFontSize: {
		type: 'number',
	},
	fontFamily: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	lineHeight: {
		type: 'number',
	},
	letterSpacing: {
		type: 'number',
	},
	fontWeight: {
		type: 'string',
		default: '',
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	noBottomSpacing: {
		type: 'boolean',
		default: false,
	},
	noTopSpacing: {
		type: 'boolean',
		default: false,
	},
};

export default TypographyAttributes;
