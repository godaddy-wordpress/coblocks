/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { hasBlockSupport } from '@wordpress/blocks';
import { InspectorControls, PanelColorSettings, withColors } from '@wordpress/block-editor';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Color Settings
 */
class LabelColorControl extends Component {
	componentDidUpdate() {
		const { updateInnerAttributes, attributes } = this.props;
		const { textColor, customTextColor } = attributes;
		updateInnerAttributes( { customTextColor, textColor } );
	}

	render() {
		const {
			setTextColor,
			textColor,
		} = this.props;

		const colorSettings = [ {
			label: __( 'Label color', 'coblocks' ),
			onChange: setTextColor,
			value: textColor?.color || '',
		} ];

		return (
			<InspectorControls>
				<PanelColorSettings
					colorSettings={ colorSettings }
					initialOpen={ false }
					title={ __( 'Color settings', 'coblocks' ) }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
}

export default compose( [
	withColors( { textColor: 'color' } ),
	withSelect( ( select, props ) => {
		const {	getBlocksByClientId, getBlocks	} = select( 'core/block-editor' );

		return {
			getBlocksByClientId,
			innerBlocks: getBlocks( props.clientId ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const { getBlocksByClientId } = props;
		const {	updateBlockAttributes } = dispatch( 'core/block-editor' );

		const updateInnerAttributes = ( newAttributes ) => {
			const innerItems = getBlocksByClientId(	props.clientId	)[ 0 ].innerBlocks;
			innerItems.forEach( ( item ) => {
				if ( hasBlockSupport( item.name, 'labelColor', false ) ) {
					updateBlockAttributes(
						item.clientId,
						newAttributes
					);
				}
			} );
		};

		return {
			updateInnerAttributes,
		};
	} ),
] )( LabelColorControl );

LabelColorControl.propTypes = {
	attributes: PropTypes.object,
	setTextColor: PropTypes.func,
	textColor: PropTypes.object,
	updateInnerAttributes: PropTypes.func,
};
