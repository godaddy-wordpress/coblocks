/**
 * Internal dependencies
 */
import './styles/editor.scss';
import icons from './../../utils/icons';
import Sidebar from './components/sidebar';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

/**
 * Register Plugin
 */
registerPlugin( 'coblocks-save-template', {
	icon: icons.sideBar,
	render: Sidebar,
} );