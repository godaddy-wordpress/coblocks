
/**
 * Constants
 */
const allowedBlocks = [ 'coblocks/row', 'coblocks/column', 'coblocks/features', 'coblocks/feature', 'coblocks/media-card', 'coblocks/hero' ];

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function applyAttributes( settings ) {
	// Add custom selector/id
	if ( allowedBlocks.includes( settings.name ) && typeof settings.attributes !== 'undefined' ) {
		settings.attributes = Object.assign( settings.attributes, {
			coblocks: { type: 'object' },
		} );
	}

	return settings;
}

/**
 * Add custom CoBlocks attributes to selected blocks
 *
 * @param {Object} props Block props
 * @return {string} Block props extended with CoBlocks attributes.
 */
const useAttributes = ( props ) => {
	const { name: blockName } = props;
	const extendedProps = { ...props };
	if ( allowedBlocks.includes( blockName ) ) {
		extendedProps.attributes.coblocks = extendedProps.attributes.coblocks || {};

		if ( typeof extendedProps.attributes.coblocks.id === 'undefined' ) {
			const d = new Date();
			extendedProps.attributes.coblocks = Object.assign( {}, extendedProps.attributes.coblocks, {
				id: '' + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds(),
			} );
		}
	}

	return extendedProps;
};

export { applyAttributes, useAttributes };

