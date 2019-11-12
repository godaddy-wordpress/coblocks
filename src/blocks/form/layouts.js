/**
 * Internal dependencies
 */
// import rowIcons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	SVG,
	Path,
} from '@wordpress/components';

/**
 * Template option choices for predefined columns layouts.
 *
 * @constant
 * @type {Array}
 */
export const TEMPLATE_OPTIONS = [
	{
		title: __( 'Contact Us' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z" /></SVG>,
		template: [
			[ 'coblocks/field-name', { required: false } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-textarea', { required: true } ],
		],
	},
	{
		title: __( 'Subscribe' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z" /></SVG>,
		template: [
			[ 'coblocks/field-name', { required: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-radio', { required: false, submitButtonText: 'subscribe' } ],
		],
	},
	{
		title: __( 'RSVP' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z" /></SVG>,
		template: [
			[ 'coblocks/field-name', { required: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-checkbox', { required: false } ],
			[ 'coblocks/field-phone', { required: false, options: [ 'Option One', 'Option Two', 'Option Three' ] } ],
		],
	},
];
