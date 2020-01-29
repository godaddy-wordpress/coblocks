/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { CheckboxControl, Modal, HorizontalRule } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect, select } from '@wordpress/data';

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
			// typography: this.props.typography,
		};
	}

	render() {
		const { isOpen, closeModal, setTypography, typography } = this.props;
		const { colors, gradient } = this.state;

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
						onChange={ () => setTypography( ) }
						checked={ !! typography }
					/>
					<span>{ __( 'Change fonts, adjust font sizes and line-height with block-level typography controls', 'coblocks' ) }</span>

				</div>
			</Modal>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const { getTypography } = select( 'coblocks-settings' );

	return {
		typography: getTypography(),
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { setTypography } = dispatch( 'coblocks-settings' );
	return {
		setTypography,
	};
} );

export default compose( [
	applyWithSelect,
	applyWithDispatch,
] )( CoBlocksOptionsModal );
