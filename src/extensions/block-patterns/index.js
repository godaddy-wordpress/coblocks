/*global coblocksBlockPatterns*/
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockSettingsMenuControls } from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import CoBlocksBlockPatternsModal from './modal';

const CoBlocksBlockPatterns = () => {
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const props = { closeModal, isOpen, openModal };

	return (
		<>
			<BlockSettingsMenuControls>
				{ ( { onClose } ) => (
					<MenuItem
						onClick={ () => {
							openModal();
							onClose();
						} }
					>
						{ __( 'Add Design Pattern', 'coblocks' ) }
					</MenuItem>
				) }
			</BlockSettingsMenuControls>
			<CoBlocksBlockPatternsModal { ...props } />
		</>
	);
};

if ( typeof coblocksBlockPatterns !== 'undefined' && !! coblocksBlockPatterns?.patternsEnabled ) {
	registerPlugin( 'coblocks-block-patterns', {
		render: CoBlocksBlockPatterns,
	} );
}
