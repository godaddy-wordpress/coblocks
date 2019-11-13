/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	SVG,
	Path,
} from '@wordpress/components';

/**
 * Block constants
 */

/**
 * Template option choices for predefined columns layouts.
 *
 * @constant
 * @type {Array}
 */
export const TEMPLATE_OPTIONS = [
	{
		title: __( 'Contact', 'coblocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z" /></SVG>,
		template: [
			[ 'coblocks/field-name', { required: false } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-textarea', { required: true } ],
		],
		submitButtonText: __( 'Contact Us', 'coblocks' ),
	},
	{
		title: __( 'RSVP', 'coblocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z" /></SVG>,
		template: [
			[ 'coblocks/field-name', { required: true, hasLastName: true } ],
			/* translators: a person's guest at a social function. */
			[ 'coblocks/field-name', { label: __( 'Plus one', 'coblocks' ), hasLastName: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-radio', { label: __( 'Will you be attending?', 'coblocks' ), required: true, options: [ __( 'Yes', 'coblocks' ), __( 'No', 'coblocks' ) ], isInline: true } ],
			[ 'coblocks/field-textarea', { label: __( 'Details', 'coblocks' ) } ],
		],
		/* translators: RSVP is an initialism derived from the French phrase Répondez s'il vous plaît, meaning "Please respond" to require confirmation of an invitation. */
		submitButtonText: __( 'RSVP', 'coblocks' ),
	},
	{
		title: __( 'Appointment', 'coblocks' ),
		icon: <SVG width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z" /></SVG>,
		template: [
			[ 'coblocks/field-name', { required: true, hasLastName: true } ],
			[ 'coblocks/field-phone', { required: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-date', { required: true } ],
			[ 'coblocks/field-radio', { label: __( 'Time', 'coblocks' ), required: true, options: [ __( 'Morning', 'coblocks' ), __( 'Afternoon', 'coblocks' ) ], isInline: true } ],
			[ 'coblocks/field-textarea', { label: __( 'Special Notes', 'coblocks' ) } ],

		],
		submitButtonText: __( 'Book Appointment', 'coblocks' ),
	},
];

// Note: Child form blocks are automatically allowed
export const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/separator',
	'core/spacer',
];
