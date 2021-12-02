/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Template option choices for predefined columns layouts.
 *
 * @constant
 * @type {Array}
 */
export const TEMPLATE_OPTIONS = [
	{
		title: __( 'Contact', 'coblocks' ),
		icon: icons.layoutContact,
		template: [
			[ 'coblocks/field-name', { required: false } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-textarea', { required: true } ],
			[ 'coblocks/field-submit-button', {} ],
		],
		submitButtonText: __( 'Contact Us', 'coblocks' ),
	},
	{
		title: __( 'RSVP', 'coblocks' ),
		icon: icons.layoutRSVP,
		template: [
			[ 'coblocks/field-name', { required: true, hasLastName: true } ],
			/* translators: an additional guest */
			[ 'coblocks/field-name', { label: __( 'Plus one', 'coblocks' ), hasLastName: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-radio', { label: __( 'Will you be attending?', 'coblocks' ), required: true, options: [ __( 'Yes', 'coblocks' ), __( 'No', 'coblocks' ) ], isInline: true } ],
			[ 'coblocks/field-textarea', { label: __( 'Notes?', 'coblocks' ) } ],
			[ 'coblocks/field-submit-button', {} ],
		],
		/* translators: RSVP is an initialism derived from the French phrase Répondez s'il vous plaît, meaning "Please respond" to require confirmation of an invitation */
		submitButtonText: __( 'RSVP', 'coblocks' ),
	},
	{
		title: __( 'Appointment', 'coblocks' ),
		icon: icons.layoutAppointment,
		template: [
			[ 'coblocks/field-name', { required: true, hasLastName: true } ],
			[ 'coblocks/field-phone', { required: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-date', { required: true } ],
			[ 'coblocks/field-radio', { label: __( 'Time', 'coblocks' ), required: true, options: [ __( 'Morning', 'coblocks' ), __( 'Afternoon', 'coblocks' ) ], isInline: true } ],
			[ 'coblocks/field-textarea', { label: __( 'Special notes', 'coblocks' ) } ],
			[ 'coblocks/field-submit-button', {} ],
		],
		submitButtonText: __( 'Book Appointment', 'coblocks' ),
	},
];
