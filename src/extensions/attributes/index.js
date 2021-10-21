/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

const allowedBlocks = [ 'coblocks/row', 'coblocks/column', 'coblocks/features', 'coblocks/feature', 'coblocks/media-card', 'coblocks/hero' ];

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
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
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAttributes = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name: blockName } = props;

		if ( allowedBlocks.includes( blockName ) ) {
			props.attributes.coblocks = props.attributes.coblocks || {};

			if ( typeof props.attributes.coblocks.id === 'undefined' ) {
				const d = new Date();
				props.attributes.coblocks = Object.assign( {}, props.attributes.coblocks, {
					id: '' + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds(),
				} );
			}
		}

		return <BlockEdit { ...props } />;
	},
	'withAttributes'
);

addFilter(
	'blocks.registerBlockType',
	'coblocks/custom/attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'coblocks/attributes',
	withAttributes
);
