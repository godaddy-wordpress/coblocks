/**
 * Determine if the block attributes are empty.
 *
 * @param {Object} attributes The block attributes to check.
 * @returns {Boolean} The empty state of the attributes passed.
 */
export const hasEmptyAttributes = attributes => {
	return ! Object.entries( attributes )
		.map( ( [ , value ] ) => {
			if ( typeof value === 'string' ) {
				value = value.trim();
			}

			if ( value instanceof Array ) {
				value = value.length;
			}

			if ( value instanceof Object ) {
				value = Object.entries( value ).length;
			}

			return !! value;
		} )
		.filter( value => value === true ).length;
};
