/**
 * Internal dependencies
 */
import icons from './../../utils/icons';
import ModalSettings from './components/modal';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

/**
 * Register Plugin
 */
registerPlugin( 'coblocks-disable-blocks', {
	icon: false,
	render: ModalSettings,
} );