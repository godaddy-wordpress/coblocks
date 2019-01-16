/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Set the attributes for the text panel
 * @type {Object}
 */
const ButtonPanelAttributes = {
	button: {
		source: 'children',
		selector: '.wp-coblocks__button',
	},
	buttonUrl: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-coblocks__button',
		attribute: 'href',
	},
	buttonTitle: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-coblocks__button',
		attribute: 'title',
	},
	buttonFontFamily: {
		type: 'string',
	},
	buttonFontSize: {
		type: 'string',
	},
	customButtonFontSize: {
		type: 'number',
	},
	buttonLineHeight: {
		type: 'string',
	},
	buttonColor: {
		type: 'string',
	},
	customButtonColor: {
		type: 'string',
	},
	buttonBackground: {
		type: 'string',
	},
	customButtonBackground: {
		type: 'string',
	},
	openTab: {
		type: 'boolean',
		default: false,
	},
	button_2: {
		source: 'children',
		selector: '.wp-coblocks__button--2',
	},
	buttonUrl_2: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-coblocks__button--2',
		attribute: 'href',
	},
	buttonTitle_2: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-coblocks__button--2',
		attribute: 'title',
	},
	buttonColor_2: {
		type: 'string',
	},
	customButtonColor_2: {
		type: 'string',
	},
	buttonBackground_2: {
		type: 'string',
	},
	customButtonBackground_2: {
		type: 'string',
	},
	openTab_2: {
		type: 'boolean',
		default: false,
	},
	spacerButton: {
		type: 'number',
		default: 20,
	},
	buttonBorderRadius: {
		type: 'string',
	},
};

export default ButtonPanelAttributes;