/**
 * Internal dependencies
 */
import GutterControl from '../../components/gutter-control/gutter-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			attributes,
		} = this.props;

		const {
			count,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Pricing Table settings', 'coblocks' ) }>
						{ count > 1 && <GutterControl { ...this.props } /> }
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
