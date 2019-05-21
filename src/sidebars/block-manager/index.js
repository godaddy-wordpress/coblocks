/**
 * Internal dependencies
 */
import './styles/editor.scss';
import ModalSettings from './components/modal';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;
const { dispatch } = wp.data;
const hideBlockTypes = dispatch( 'core/edit-post' ).hideBlockTypes;

/**
 * Register Plugin
 */
if ( typeof hideBlockTypes === 'undefined' ) {
	registerPlugin( 'coblocks-block-manager', {
		icon: false,
		render: ModalSettings,
	} );
}
