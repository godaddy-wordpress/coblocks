/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoBlocksLabsModalControl from './coblocks-labs-slot';

function CoBlocksLabsToggleControl( { label, help } ) {
	return (
		<CoBlocksLabsModalControl>
			<CheckboxControl
				checked={ true }
				help={ help }
				label={ label }
			/>
		</CoBlocksLabsModalControl>
	);
}

export default CoBlocksLabsToggleControl;

