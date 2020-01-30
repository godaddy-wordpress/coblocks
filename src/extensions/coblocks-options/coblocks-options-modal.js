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
	processGradientPresets( newSetting ) {
		const { getSettings } = this.props;
		let gradientPresets = getSettings( ).gradients;

		if ( newSetting ) {
			localStorage.setItem( 'gradientsPresets', JSON.stringify( gradientPresets ) );
			gradientPresets = [];
		} else {
			const storedPresets = localStorage.getItem( 'gradientsPresets' );
			if ( storedPresets ) {
				gradientPresets = JSON.parse( storedPresets );
			}
		}
		return gradientPresets;
	}

	updateCustomColorsSetting( newSetting ) {
		const { updateSettings, setCustomColors } = this.props;
		updateSettings( { disableCustomColors: newSetting } );
		setCustomColors();
	}

	updateGradientsControlsSetting( newSetting ) {
		const { setGradients, updateSettings } = this.props;

		updateSettings( {
			disableCustomGradients: newSetting,
			gradients: this.processGradientPresets( newSetting ),
		} );
		setGradients();
	}

	updateTypographyControlsSetting() {
		const { setTypography } = this.props;
		setTypography();
	}

	render() {
		const { isOpen, closeModal, typography, customColors, gradientControls } = this.props;

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
						onChange={ () => this.updateCustomColorsSetting( !! customColors ) }
						checked={ !! customColors }
					/>
					<span>{ __( 'Apply custom colors to blocks that support colors', 'coblocks' ) }</span>
					<HorizontalRule />
					<CheckboxControl
						label={ __( 'Gradient Presets', 'coblocks' ) }
						onChange={ () => this.updateGradientsControlsSetting( !! gradientControls ) }
						checked={ !! gradientControls }
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
	const { getTypography, getCustomColors, getGradients } = select( 'coblocks-settings' );
	const { getSettings } = select( 'core/block-editor' );

	return {
		typography: getTypography(),
		customColors: getCustomColors(),
		gradientControls: getGradients(),
		getSettings,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { setTypography, setCustomColors, setGradients } = dispatch( 'coblocks-settings' );
	const { updateSettings } = dispatch( 'core/block-editor' );

	return {
		setCustomColors,
		setTypography,
		setGradients,
		updateSettings,
	};
} );

export default compose( [
	applyWithSelect,
	applyWithDispatch,
] )( CoBlocksOptionsModal );
