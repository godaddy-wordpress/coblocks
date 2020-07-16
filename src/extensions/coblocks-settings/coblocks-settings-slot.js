/**
 * WordPress dependencies
 */

import { createHigherOrderComponent } from '@wordpress/compose';
import { createSlotFill } from '@wordpress/components';

// Constants
const initializedIds = [];

export const { Fill, Slot } = createSlotFill( 'CoBlocksSettingsSlot' );
const CoBlocksSettingsSlot = <Slot />;
CoBlocksSettingsSlot.Slot = Slot;
export default CoBlocksSettingsSlot;

export const createSettingsFill = ( id ) => {
	if ( !! id === true ) {
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
									{ createSettingsFill.children }
								</Fill>

								<BlockEdit { ...props } />
							</> );
					}
					return <BlockEdit { ...props } />;
				};
			}, 'createSettingsFill' ),
		};
	}
	return !! id === false && {
		setup: createHigherOrderComponent( ( BlockEdit ) => {
			return ( props ) => {
				return <BlockEdit { ...props } />;
			};
		} ),
	};
};
