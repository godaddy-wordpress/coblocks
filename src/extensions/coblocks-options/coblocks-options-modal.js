/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { CheckboxControl, Modal, HorizontalRule } from '@wordpress/components';

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
		};
	}

	render() {
		const { isOpen, closeModal } = this.props;
		const { colors, gradient, typography } = this.state;

		if ( ! isOpen ) {
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
						onChange={ () => this.setState( { typography: ! typography } ) }
						checked={ !! typography }
					/>
					<span>{ __( 'Change fonts, adjust font sizes and line-height with block-level typography controls', 'coblocks' ) }</span>

				</div>
			</Modal>
		);
	}
}

export default CoBlocksOptionsModal;

