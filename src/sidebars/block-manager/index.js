/**
 * Internal dependencies
 */
import './styles/editor.scss';
import ModalSettings from './components/modal';

/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { dispatch } from '@wordpress/data';
const dispatcher = dispatch( 'core/edit-post' );

/**
 * Register Plugin
 */
if ( typeof dispatcher !== 'undefined' && ! Object.keys( dispatcher ).includes( 'hideBlockTypes' ) ) {
	registerPlugin( 'coblocks-block-manager', {
		icon: false,
		render: ModalSettings,
	} );
}
