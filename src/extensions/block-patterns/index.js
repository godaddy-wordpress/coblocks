/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { Fragment, useState } from '@wordpress/element';

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
			<PluginBlockSettingsMenuItem
				label={ __( 'Add to Design Patterns', 'coblocks' ) }
				icon={ false }
				onClick={ openModal }
			/>
			<CoBlocksBlockPatternsModal { ...props } />
		</Fragment>
	);
};

registerPlugin( 'coblocks-block-patterns', {
	render: CoBlocksBlockPatterns,
} );
