/**
 * External dependencies.
 */
import { find } from 'lodash';

/**
 * Internal dependencies.
 */
import icons from './icons';
import { hasEmptyAttributes } from '../../utils/block-helpers';
import fromEntries from '../../js/coblocks-fromEntries';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import TokenList from '@wordpress/token-list';

/**
 * Constants
 */
const SERVICES_ALLOWED_BLOCKS = [ 'coblocks/service' ];
const SERVICES_TEMPLATE = [ [ 'coblocks/service' ] ];
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
 * @param {Array}  styles    Block style variations.
 * @param {string} className Class name
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

/**
 * Given an attributes object will return true if attributes are unset.
 *
 * @param {Object} attributes The replacing style.
 * @return {boolean} Whether or not the attributes object is empty.
 */
const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'columns', 'buttons' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

/**
 * Given an innerBlocks array will return true if innerBlocks attributes are unset.
 *
 * @param {Array} innerBlocks Array of innerBlocks.
 * @return {boolean} Whether or not the innerBlocks attributes object is empty.
 */
const isEmptyInnerBlocks = ( innerBlocks ) => {
	//innerBlock attributes to search for.
	const attributesToCheck = [ 'content' ];

	let blocksAreEmpty = true;
	innerBlocks.forEach( ( block ) => {
		const newAttributes = Object.entries( block.attributes ).filter( ( [ key ] ) =>	attributesToCheck.includes( key ) );

		if ( ! hasEmptyAttributes( fromEntries( newAttributes ) ) ) {
			blocksAreEmpty = false;
		}
	} );

	return blocksAreEmpty;
};

export {
	replaceActiveStyle,
	getActiveStyle,
	isEmpty,
	isEmptyInnerBlocks,
	layoutOptions,
	SERVICES_ALLOWED_BLOCKS,
	SERVICES_TEMPLATE,
	SERVICE_ALLOWED_BLOCKS,
};
