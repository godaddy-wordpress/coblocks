/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, PanelColorSettings, ContrastChecker } from '@wordpress/block-editor';
import { RangeControl, ToggleControl, SelectControl, CheckboxControl, Button, Modal, Panel, PanelBody, PanelRow, HorizontalRule } from '@wordpress/components';

/**
 * Inspector controls
 */
class CoBlocksOptionsModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			advanced: false,
			colors: true,
			gradient: true,
			typography: true,
			utilities: true,
		};
	}

	render() {
		const { isOpen, closeModal, openModal } = this.props;
		const { advanced, colors, gradient, typography, utilities } = this.state;

		if ( ! isOpen ) {
			return null;
		}

		return (
			<Modal
				title="CoBlocks Settings"
				onRequestClose={ closeModal }>
				<h3>General</h3>
				<HorizontalRule />
				<CheckboxControl
					label={ __( 'Custom Colors', 'coblocks' ) }
					onChange={ () => this.setState( { colors: ! colors } ) }
					checked={ !! colors }
				/>
				{ ! advanced && ( <span>{ __( 'Apply custom colors to blocks that support colors', 'coblocks' ) }</span> ) }

				<HorizontalRule />
				<CheckboxControl
					label={ __( 'Gradient Presets', 'coblocks' ) }
					onChange={ () => this.setState( { gradient: ! gradient } ) }
					checked={ !! gradient }
				/>
				{ ! advanced && ( <span>{ __( 'Apply gradient styles to blocks that support gradients', 'coblocks' ) }</span> ) }

				<HorizontalRule />
				<CheckboxControl
					label={ __( 'Typography Controls', 'coblocks' ) }
					onChange={ () => this.setState( { typography: ! typography } ) }
					checked={ !! typography }
				/>
				{ ! advanced && ( <span>{ __( 'Change fonts, adjust font sizes and line-height with block-level typography controls', 'coblocks' ) }</span> ) }

				<HorizontalRule />

				<h3>Advanced</h3>

				<CheckboxControl
					label={ __( 'Advanced Mode', 'coblocks' ) }
					onChange={ () => this.setState( { advanced: ! advanced } ) }
					checked={ !! advanced }
				/>
				{ !! advanced && ( <span>{ __( 'Build with advanced tooling to fine-tune block settings throughout CoBlocks', 'coblocks' ) }</span> ) }
				{ !! advanced && (
					<Fragment>
						<HorizontalRule />
						<CheckboxControl
							label={ __( 'Load Utility Stylesheet', 'coblocks' ) }
							onChange={ () => this.setState( { utilities: ! utilities } ) }
							checked={ !! utilities }
						/>
						<span>{ __( 'Build with advanced tooling to fine-tune block settings throughout CoBlocks', 'coblocks' ) }</span>
					</Fragment>
				) }
			</Modal>
		);
	}
}

export default CoBlocksOptionsModal;

