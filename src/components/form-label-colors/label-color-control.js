/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InspectorControls, withColors, PanelColorSettings } from '@wordpress/block-editor';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Color Settings
 */
class LabelColorControl extends Component {
	componentDidUpdate() {
		const { updateInnerAttributes, attributes } = this.props;
		const { textColor, customTextColor } = attributes;
		updateInnerAttributes( { textColor, customTextColor } );
	}

	render() {
		const {
			setTextColor,
			textColor,
		} = this.props;

		const colorSettings = [ {
			value: textColor?.color || '',
			onChange: setTextColor,
			label: __( 'Label color', 'coblocks' ),
		} ];

		return (
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ colorSettings }
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
			const exculdeBlocks = [ 'coblocks/field-hidden', 'coblocks/field-submit-button' ];
			innerItems
				.filter( ( item ) => exculdeBlocks.indexOf( item.name ) === -1 )
				.forEach( ( item ) => {
					updateBlockAttributes(
						item.clientId,
						newAttributes
					);
				} );
		};

		return {
			updateInnerAttributes,
		};
	} ),
] )( LabelColorControl );
