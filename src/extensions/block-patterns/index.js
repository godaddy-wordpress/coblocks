/*global coblocksBlockPatterns*/
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { Fragment, useState } from '@wordpress/element';
import { BlockSettingsMenuControls } from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CoBlocksBlockPatternsModal from './modal';
import './styles/style.scss';

const CoBlocksBlockPatterns = () => {
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	const props = { isOpen, openModal, closeModal };

	return (
		<Fragment>
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
		</Fragment>
	);
};

if ( typeof coblocksBlockPatterns !== 'undefined' && !! coblocksBlockPatterns?.patternsEnabled ) {
	registerPlugin( 'coblocks-block-patterns', {
		render: CoBlocksBlockPatterns,
	} );
}
