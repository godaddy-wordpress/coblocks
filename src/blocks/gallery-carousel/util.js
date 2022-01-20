/**
 * Function will dynamically process a string for use with the `navForClass` block attribute.
 * This attribute should only be truthy when the corresponding `thumbnails` attribute is also set.
 *
 * @constant parseNavForClass
 * @type {Function}
 * @param {boolean} thumbnails This boolean value is equal to props.attributes.thumbnails.
 * @param {string}  clientId   This string value is equal to props.clientId.
 * @return {string} Return parsed class string if thumbnails is truthy or an empty string.
 */
export const parseNavForClass = ( thumbnails, clientId ) => thumbnails
	? `has-nav-${ clientId.split( '-' )[ 0 ] }`
	: '';
