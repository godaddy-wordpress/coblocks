/**
 * External dependencies
 */
import {
	CalendarIcon,
	CheckmarkCircleIcon,
	FormIcon,
	RequestIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';

/**
 * Template option choices for predefined form layouts.
 *
 * @constant
 * @type {Array}
 */
const variations = [
	{
		icon: <Icon className="m-2" height={ 24 } icon={ FormIcon } width={ 24 } />,
		innerBlocks: [
			[ 'coblocks/field-name', { required: false } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-textarea', { required: true } ],
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'Contact Us', 'coblocks' ) } ],
		],
		isDefault: true,
		name: 'contact-form',
		scope: [ 'block' ],
		title: __( 'Contact', 'coblocks' ),
	},
	{
		icon: <Icon className="m-2" height={ 24 } icon={ CheckmarkCircleIcon } width={ 24 } />,
		innerBlocks: [
			[ 'coblocks/field-name', {
				hasLastName: true,
				required: true,
			} ],
			/* translators: an additional guest */
			[ 'coblocks/field-name', {
				hasLastName: true,
				label: __( 'Plus one', 'coblocks' ),
			} ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-radio', {
				isInline: true,
				label: __( 'Will you be attending?', 'coblocks' ),
				options: [
					__( 'Yes', 'coblocks' ),
					__( 'No', 'coblocks' ),
				],
				required: true,
			} ],
			[ 'coblocks/field-textarea', { label: __( 'Notes?', 'coblocks' ) } ],
			/* translators: RSVP is an initialism derived from the French phrase Répondez s'il vous plaît, meaning "Please respond" to require confirmation of an invitation */
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'RSVP', 'coblocks' ) } ],
		],
		name: 'rsvp-form',
		scope: [ 'block' ],
		title: __( 'RSVP', 'coblocks' ),
	},
	{
		icon: <Icon className="m-2" height={ 24 } icon={ CalendarIcon } width={ 24 } />,
		innerBlocks: [
			[ 'coblocks/field-name', {
				hasLastName: true,
				required: true,
			} ],
			[ 'coblocks/field-phone', { required: true } ],
			[ 'coblocks/field-email', { required: true } ],
			[ 'coblocks/field-date', { required: true } ],
			[ 'coblocks/field-radio', {
				isInline: true,
				label: __( 'Time', 'coblocks' ),
				options: [
					__( 'Morning', 'coblocks' ),
					__( 'Afternoon', 'coblocks' ),
				],
				required: true,
			} ],
			[ 'coblocks/field-textarea', { label: __( 'Special notes', 'coblocks' ) } ],
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'Book Appointment', 'coblocks' ) } ],
		],
		name: 'appointment-form',
		scope: [ 'block' ],
		title: __( 'Event', 'coblocks' ),
	},
	{
		icon: <Icon className="m-2" height={ 24 } icon={ RequestIcon } width={ 24 } />,
		innerBlocks: [
			[ 'coblocks/field-name', {
				required: true,
			} ],
			[ 'core/columns', {}, [
				[ 'core/column', {}, [
					[ 'coblocks/field-email', { required: true } ],
				] ],
				[ 'core/column', {}, [
					[ 'coblocks/field-phone', { required: true } ],
				] ],
			] ],
			[ 'coblocks/field-checkbox', {
				label: __( 'Services', 'coblocks' ),
				required: false,
			} ],
			[ 'coblocks/field-textarea', { label: __( 'Describe your project', 'coblocks' ) } ],
			[ 'coblocks/field-checkbox', {
				label: `<a href="#" target="_blank" rel="noreferrer noopener">${ __( 'Terms and conditions', 'coblocks' ) }</a>`,
				options: [
					__( 'By submitting this form, you agree to the terms and conditions.', 'coblocks' ),
				],
				required: true,
			} ],
			[ 'coblocks/field-submit-button', { submitButtonText: __( 'Send request', 'coblocks' ) } ],
		],
		name: 'request-quote-form',
		scope: [ 'block' ],
		title: __( 'Request a Quote', 'coblocks' ),
	},
];

export default variations;
