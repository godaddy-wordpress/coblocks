/**
 * Internal dependencies
 */
import Section from './section';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
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
	sprintf,
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
				title={ sprintf(
					/* translators: %s: Plugin name */
					__( '%s Editor Settings', 'coblocks' ),
					'CoBlocks'
				) }
				onRequestClose={ closeModal }
			>
				<div className="coblocks-modal__content">
					<Section title={ __( 'General' ) }>
						<HorizontalRule />
						<CheckboxControl
							label={ __( 'Custom colors', 'coblocks' ) }
							help={ __( 'Allow styling with the custom color picker.', 'coblocks' ) }
							onChange={ () => this.updateCustomColorsSetting( !! customColors ) }
							checked={ !! customColors }
						/>
						<HorizontalRule />
						<CheckboxControl
							label={ __( 'Gradient styles', 'coblocks' ) }
							help={ __( 'Allow styling with gradient fills.', 'coblocks' ) }
							onChange={ () => this.updateGradientsControlsSetting( !! gradientControls ) }
							checked={ !! gradientControls }
						/>
						<HorizontalRule />
						<CheckboxControl
							label={ __( 'Typography controls', 'coblocks' ) }
							help={ __( 'Allow block-level typography controls.', 'coblocks' ) }
							onChange={ () => this.updateTypographyControlsSetting() }
							checked={ !! typography }
						/>
						<HorizontalRule />
					</Section>
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
] )( CoBlocksSettingsModal );
