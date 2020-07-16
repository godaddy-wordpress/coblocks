/**
 * WordPress dependencies
 */

import { createHigherOrderComponent } from '@wordpress/compose';
import { createSlotFill } from '@wordpress/components';

// Constants
const initializedIds = [];

export const { Fill, Slot } = createSlotFill( 'CoBlocksSettingsSlot' );

/**
 * CoBlocksSettingsSlot is a SlotFill Provider to be used exclusively with the CoBlocks Settings panel.
 *
 * @return {Object} Returns Slot Provider to be used exclusively with CoBlocks Settings panel.
 */
const CoBlocksSettingsSlot = <Slot />;
CoBlocksSettingsSlot.Slot = Slot;
export default CoBlocksSettingsSlot;

/**
 * Helper function for extending CoBlocks Settings panel.
 * Function allows user to embed custom react components into settings modal.
 * Function is intended for use with WordPress filter. Example: `addFilter( 'editor.BlockEdit', 'custom/slug', createSettingsFill( 'sample-id', ReactComponentHere ).setup );`.
 *
 * Developer Notes:
 * Filters set using the same ID will result in children from the most recently executed filter.
 * Filters set without an ID will cause children not to render.
 * Filters set without children will not render any custom controls.
 *
 * @param {string} id A unique identifier to the specified control.
 * @param {Object} children React components to display within the editor settings panel.
 *
 * @return {Object} Returns `BlockEdit` component in addition to `Fill` when correct parameters are supplied and control has not been initialized. Otherwise returns `BlockEdit` unchanged.
 */
export const createSettingsFill = ( id, children ) => {
	if ( typeof id === 'string' && !! id === true ) {
		return {
			init: () => {
				if ( ! initializedIds.includes( id ) ) {
					initializedIds.push( id );
					return true;
				}
				return false;
			},
			setup: createHigherOrderComponent( ( BlockEdit ) => {
				return ( props ) => {
					if ( createSettingsFill( id ).init() === true ) {
						return (
							<>
								<Fill name="CoBlocksSettingsSlot">
									{ children }
								</Fill>

								<BlockEdit { ...props } />
							</> );
					}
					return <BlockEdit { ...props } />;
				};
			}, 'createSettingsFill' ),
		};
	}
	return {
		setup: createHigherOrderComponent( ( BlockEdit ) => {
			return ( props ) => {
				return <BlockEdit { ...props } />;
			};
		} ),
	};
};
