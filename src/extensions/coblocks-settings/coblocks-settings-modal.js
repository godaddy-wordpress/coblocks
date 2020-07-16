/**
 * Internal dependencies
 */
import Section from './section';
import CoBlocksSettingsSlot, { Fill } from './coblocks-settings-slot';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';
import { getPlugin } from '@wordpress/plugins';
import {
	CheckboxControl,
	Modal,
	HorizontalRule,
} from '@wordpress/components';
import {
	withDispatch,
	withSelect,
	select,
} from '@wordpress/data';
import {
	__,
} from '@wordpress/i18n';

class CoBlocksSettingsModal extends Component {
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

	processColorPresets( newSetting ) {
		const { getSettings } = this.props;
		let colorPresets = getSettings( ).colors;

		if ( newSetting ) {
			localStorage.setItem( 'colorPresets', JSON.stringify( colorPresets ) );
			colorPresets = [];
		} else {
			const storedPresets = localStorage.getItem( 'colorPresets' );
			if ( storedPresets ) {
				colorPresets = JSON.parse( storedPresets );
			}
		}
		return colorPresets;
	}

	updateColorPanel( newSetting ) {
		const { updateSettings, setColorPanel, setCustomColors, setGradients, getSettings } = this.props;

		const supportsGradients = getSettings().gradients !== undefined;
		if ( supportsGradients ) {
			updateSettings( {
				colors: this.processColorPresets( newSetting ),
				disableCustomColors: newSetting,
				disableCustomGradients: newSetting,
				gradients: this.processGradientPresets( newSetting ),
			} );
		} else {
			updateSettings( {
				colors: this.processColorPresets( newSetting ),
				disableCustomColors: newSetting,
			} );
		}

		setCustomColors();
		setGradients();
		setColorPanel();
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

	updateLayoutSelectorSetting() {
		const { setLayoutSelector } = this.props;
		setLayoutSelector();
	}

	updateTypographyControlsSetting() {
		const { setTypography } = this.props;
		setTypography();
	}

	render() {
		const { isOpen, closeModal, typography, customColors, gradientControls, getSettings, colorPanel, layoutSelector } = this.props;

		if ( ! isOpen ) {
			return null;
		}

		const supportsGradients = getSettings().gradients !== undefined;
		const colorPanelEnabled = !! colorPanel;
		const showLayoutSelectorControl = applyFilters( 'coblocks-show-layout-selector', true ) && !! getPlugin( 'coblocks-layout-selector' );

		return (
			<Modal
				title={ applyFilters( 'coblocks-settings-title', __( 'Editor settings', 'coblocks' ) ) }
				onRequestClose={ closeModal }
			>
				<div className="coblocks-modal__content">
					<Section title={ __( 'General' ) }>

						<CoBlocksSettingsSlot.Slot>
							{ ( fills ) => (
								<>
									{ fills }
								</>
							) }
						</CoBlocksSettingsSlot.Slot>

						{ showLayoutSelectorControl &&
						<Fill name="CoBlocksSettingsSlot">
							<HorizontalRule />
							<CheckboxControl
								label={ __( 'Layout selector', 'coblocks' ) }
								help={ __( 'Allow layout selection on new pages.', 'coblocks' ) }
								onChange={ () => this.updateLayoutSelectorSetting() }
								checked={ !! layoutSelector }
							/>
						</Fill>
						}

						<Fill name="CoBlocksSettingsSlot">
							<HorizontalRule />
							<CheckboxControl
								label={ __( 'Typography controls', 'coblocks' ) }
								help={ __( 'Allow block-level typography controls.', 'coblocks' ) }
								onChange={ () => this.updateTypographyControlsSetting() }
								checked={ !! typography }
							/>
						</Fill>

						<Fill name="CoBlocksSettingsSlot">
							<HorizontalRule />
							<CheckboxControl
								label={ __( 'Color settings', 'coblocks' ) }
								help={ __( 'Allow color settings throughout the editor.', 'coblocks' ) }
								onChange={ () => this.updateColorPanel( !! colorPanel ) }
								checked={ !! colorPanel }
							/>
						</Fill>

						{ colorPanelEnabled &&
						<Fill name="CoBlocksSettingsSlot">
							<HorizontalRule />
							<CheckboxControl
								label={ __( 'Custom color pickers', 'coblocks' ) }
								help={ __( 'Allow styling with custom colors.', 'coblocks' ) }
								onChange={ () => this.updateCustomColorsSetting( !! customColors ) }
								checked={ !! customColors }
							/>
						</Fill>
						}

						{ colorPanelEnabled && supportsGradients &&
						<Fill name="CoBlocksSettingsSlot">
							<HorizontalRule />
							<CheckboxControl
								label={ __( 'Gradient styles', 'coblocks' ) }
								help={ __( 'Allow styling with gradient fills.', 'coblocks' ) }
								onChange={ () => this.updateGradientsControlsSetting( !! gradientControls ) }
								checked={ !! gradientControls }
							/>
						</Fill>
						}

						<HorizontalRule />
					</Section>
				</div>
			</Modal>
		);
	}
}

const applyWithSelect = withSelect( () => {
	const { getTypography, getCustomColors, getGradients, getColorPanel, getLayoutSelector } = select( 'coblocks-settings' );
	const { getSettings } = select( 'core/block-editor' );

	return {
		typography: getTypography(),
		customColors: getCustomColors(),
		gradientControls: getGradients(),
		colorPanel: getColorPanel(),
		layoutSelector: getLayoutSelector(),
		getSettings,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { setTypography, setCustomColors, setGradients, setColorPanel, setLayoutSelector } = dispatch( 'coblocks-settings' );
	const { updateSettings } = dispatch( 'core/block-editor' );

	return {
		setColorPanel,
		setCustomColors,
		setTypography,
		setLayoutSelector,
		setGradients,
		updateSettings,
	};
} );

export default compose( [
	applyWithSelect,
	applyWithDispatch,
] )( CoBlocksSettingsModal );
