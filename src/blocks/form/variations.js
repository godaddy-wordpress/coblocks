/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Template option choices for predefined form layouts.
 *
 * @constant
 * @type {Array}
 */
const variations = [
	{
		name: 'contact-form',
		label: __( 'Contact', 'coblocks' ),
		icon: icons.layoutContact,
		isDefault: true,
		innerBlocks: [
			[ 'coblocks/field-name', { required: false } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-textarea', { required: true } ],
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'Contact Us', 'coblocks' ) } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'rsvp-form',
		label: __( 'RSVP', 'coblocks' ),
		icon: icons.layoutRSVP,
		innerBlocks: [
			[ 'coblocks/field-name', { required: true, hasLastName: true } ],
			/* translators: an additional guest */
			[ 'coblocks/field-name', { label: __( 'Plus one', 'coblocks' ), hasLastName: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-radio', { label: __( 'Will you be attending?', 'coblocks' ), required: true, options: [ __( 'Yes', 'coblocks' ), __( 'No', 'coblocks' ) ], isInline: true } ],
			[ 'coblocks/field-textarea', { label: __( 'Notes?', 'coblocks' ) } ],
			/* translators: RSVP is an initialism derived from the French phrase Répondez s'il vous plaît, meaning "Please respond" to require confirmation of an invitation */
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'RSVP', 'coblocks' ) } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'appointment-form',
		label: __( 'Appointment', 'coblocks' ),
		icon: icons.layoutAppointment,
		innerBlocks: [
			[ 'coblocks/field-name', { required: true, hasLastName: true } ],
			[ 'coblocks/field-phone', { required: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-date', { required: true } ],
			[ 'coblocks/field-radio', { label: __( 'Time', 'coblocks' ), required: true, options: [ __( 'Morning', 'coblocks' ), __( 'Afternoon', 'coblocks' ) ], isInline: true } ],
			[ 'coblocks/field-textarea', { label: __( 'Special notes', 'coblocks' ) } ],
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'Book Appointment', 'coblocks' ) } ],
		],
		scope: [ 'block' ],
	},
];

export default variations;
