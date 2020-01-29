/*global coblocksBlockData*/

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { CheckboxControl, Modal, HorizontalRule } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import './style.scss';

/**
 * Inspector controls
 */
class CoBlocksOptionsModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			colors: true,
			gradient: true,
			typography: true,
			apiCallPending: true,
		};
		this.settingsNonce = coblocksBlockData.coblocksSettingsNonce;
		apiFetch.use( apiFetch.createNonceMiddleware( this.settingsNonce ) );
	}

	componentDidMount() {
		apiFetch( {
			path: '/wp-json/wp/v2/settings/',
			method: 'GET',
			headers: {
				'X-WP-Nonce': this.settingsNonce,
			},
		} ).then( ( res ) => {
			this.setState( {
				typography: res.coblocks_typography_controls_enabled || false,
				apiCallPending: false,
			} );
		} );
	}

	typographyToggle( toggle ) {
		const { typography } = this.state;

		apiFetch( {
			path: '/wp-json/wp/v2/settings/',
			method: 'POST',
			headers: {
				'X-WP-Nonce': this.settingsNonce,
			},
			data: {
				coblocks_typography_controls_enabled: toggle,
			},
		} ).then( () => {
			this.setState( { typography: ! typography } );
		} );
	}

	render() {
		const { isOpen, closeModal } = this.props;
		const { colors, gradient, typography, apiCallPending } = this.state;

		if ( ! isOpen ) {
			return null;
		}

		if ( apiCallPending ) {
			return null;
		}

		return (
			<Modal
				title="CoBlocks Settings"
				onRequestClose={ closeModal }>
				<div className="coblocks-modal__content">

					<h3>General</h3>
					<HorizontalRule />
					<CheckboxControl
						label={ __( 'Custom Colors', 'coblocks' ) }
						onChange={ () => this.setState( { colors: ! colors } ) }
						checked={ !! colors }
					/>
					<span>{ __( 'Apply custom colors to blocks that support colors', 'coblocks' ) }</span>
					<HorizontalRule />
					<CheckboxControl
						label={ __( 'Gradient Presets', 'coblocks' ) }
						onChange={ () => this.setState( { gradient: ! gradient } ) }
						checked={ !! gradient }
					/>
					<span>{ __( 'Apply gradient styles to blocks that support gradients', 'coblocks' ) }</span>

					<HorizontalRule />
					<CheckboxControl
						label={ __( 'Typography Controls', 'coblocks' ) }
						onChange={ () => this.typographyToggle( ! typography ) }
						checked={ !! typography }
					/>
					<span>{ __( 'Change fonts, adjust font sizes and line-height with block-level typography controls', 'coblocks' ) }</span>

				</div>
			</Modal>
		);
	}
}

export default CoBlocksOptionsModal;

