/**
 * External dependencies.
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import TokenList from '@wordpress/token-list';

export const blockStyles = [
	{
		isDefault: true,
		/* translators: block style */
		label: __( 'Boxy', 'coblocks' ),
		name: 'tall',
	},
	{
		/* translators: block style */
		label: __( 'Conversation', 'coblocks' ),
		name: 'conversation',
	},
	{
		/* translators: block style */
		label: __( 'Horizontal', 'coblocks' ),
		name: 'horizontal',
	},
];

/**
 * Returns the active style from the given className.
 *
 * @param {Array}  styles    Block style variations.
 * @param {string} className Class name
 * @return {Object?} The active style.name.
 */
export const getActiveStyle = ( styles, className ) => {
	for ( const style of new TokenList( className ).values() ) {
		if ( style.indexOf( 'is-style-' ) === -1 ) {
			continue;
		}

		const potentialStyleName = style.substring( 9 );
		const activeStyle = find( styles, { name: potentialStyleName } );

		if ( activeStyle ) {
			return activeStyle.name;
		}
	}

	return find( styles, 'isDefault' ).name;
};
