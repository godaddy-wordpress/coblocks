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
	componentDidUpdate() {
		const { getSettings, customColors, gradientControls } = this.props;
		const { disableCustomColors, disableCustomGradients } = getSettings();

		console.log( disableCustomColors, customColors );
		console.log( disableCustomGradients, gradientControls );
		if ( !! disableCustomColors === customColors ) {
			this.updateCustomColorsSetting( true );
		}
		if ( !! disableCustomGradients === gradientControls ) {
			this.updateGradientsControlsSetting( true );
		}
	}

	processGradientPresets() {
		const { getSettings, gradientControls } = this.props;
		let gradientPresets = getSettings( ).gradients;

		if ( gradientPresets.length > 0 && gradientControls ) {
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

	updateCustomColorsSetting( shallow = false ) {
		const { customColors, updateSettings, setCustomColors } = this.props;
		updateSettings( { disableCustomColors: customColors } );
		if ( ! shallow ) {
			setCustomColors();
		}
	}

	updateGradientsControlsSetting( shallow = false ) {
		const { setGradients, gradientControls, updateSettings } = this.props;

		updateSettings( {
			disableCustomGradients: gradientControls,
			gradients: this.processGradientPresets(),
		} );
		if ( ! shallow ) {
			setGradients();
		}
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
						onChange={ () => this.updateCustomColorsSetting() }
						checked={ !! customColors }
					/>
					<span>{ __( 'Apply custom colors to blocks that support colors', 'coblocks' ) }</span>
					<HorizontalRule />
					<CheckboxControl
						label={ __( 'Gradient Presets', 'coblocks' ) }
						onChange={ () => this.updateGradientsControlsSetting() }
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
