/**
 * External dependencies.
 */
import { find } from 'lodash';

/**
 * Internal dependencies.
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import TokenList from '@wordpress/token-list';

/**
 * Constants
 */
const SERVICES_ALLOWED_BLOCKS = [ 'coblocks/service-column' ];
const SERVICES_TEMPLATE = [ [ 'coblocks/service-column' ] ];
const SERVICE_COLUMN_ALLOWED_BLOCKS = [ 'coblocks/service' ];
const SERVICE_ALLOWED_BLOCKS = [ 'core/heading', 'core/buttons', 'core/paragraph' ];

const layoutOptions = [
	{
		name: 'threebyfour',
		label: '4:3',
		icon: icons.service43,
		isDefault: true,
	},
	{
		name: 'sixbynine',
		label: '16:9',
		icon: icons.service169,
	},
	{
		name: 'square',
		label: __( 'Square', 'coblocks' ),
		icon: icons.serviceSquare,
	},
	{
		name: 'circle',
		label: __( 'Circle', 'coblocks' ),
		icon: icons.serviceCircle,
		defaultAlign: 'center',
	},
];

/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */
function getActiveStyle( styles, className ) {
	for ( const style of new TokenList( className ).values() ) {
		if ( style.indexOf( 'is-style-' ) === -1 ) {
			continue;
		}

		const potentialStyleName = style.substring( 9 );
		const activeStyle = find( styles, { name: potentialStyleName } );

		if ( activeStyle ) {
			return activeStyle;
		}
	}

	return find( styles, 'isDefault' );
}

/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */
function replaceActiveStyle( className, activeStyle, newStyle ) {
	const list = new TokenList( className );

	if ( activeStyle ) {
		list.remove( 'is-style-' + activeStyle.name );
	}

	list.add( 'is-style-' + newStyle.name );

	return list.value;
}

export {
	replaceActiveStyle,
	getActiveStyle,
	layoutOptions,
	SERVICES_ALLOWED_BLOCKS,
	SERVICES_TEMPLATE,
	SERVICE_COLUMN_ALLOWED_BLOCKS,
	SERVICE_ALLOWED_BLOCKS,
};
