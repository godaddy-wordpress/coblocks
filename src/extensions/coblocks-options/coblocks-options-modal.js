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
			// colors: true,
			gradient: true,
			// typography: this.props.typography,
		};
	}

	updateCustomColorsSetting() {
		const { customColors, updateSettings, setCustomColors } = this.props;
		updateSettings( { disableCustomColors: customColors } );
		setCustomColors();
	}

	updateTypographyControlsSetting() {
		const { setTypography } = this.props;
		setTypography();
	}

	render() {
		const { isOpen, closeModal, typography, customColors } = this.props;
		const { gradient } = this.state;

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
						onChange={ () => this.updateCustomColorsSetting() }
						checked={ !! customColors }
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
						onChange={ () => this.updateTypographyControlsSetting() }
						checked={ !! typography }
					/>
					<span>{ __( 'Change fonts, adjust font sizes and line-height with block-level typography controls', 'coblocks' ) }</span>

				</div>
			</Modal>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const { getTypography, getCustomColors } = select( 'coblocks-settings' );

	return {
		typography: getTypography(),
		customColors: getCustomColors(),

	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { setTypography, setCustomColors } = dispatch( 'coblocks-settings' );
	const { updateSettings } = dispatch( 'core/block-editor' );

	return {
		setTypography,
		setCustomColors,
		updateSettings,
	};
} );

export default compose( [
	applyWithSelect,
	applyWithDispatch,
] )( CoBlocksOptionsModal );
