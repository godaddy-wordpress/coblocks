/**
 * External dependencies
 */
import { assign } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { getBlockSupport, hasBlockSupport } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

/**
 * Constants
 */
const SUPPORTS_NAME = 'coblockColumns';

const GUTTER_OPTIONS = [
	{ value: 'none', label: __( 'None' ) },
	{ value: 'small', label: __( 'Small' ) },
	{ value: 'medium', label: __( 'Medium' ) },
	{ value: 'large', label: __( 'Large' ) },
];

export function addAttribute( settings ) {
	if ( hasBlockSupport( settings, SUPPORTS_NAME ) ) {
		settings.attributes = assign(
			{
				coblockColumns: { type: 'integer', default: 2 },
				coblockGutter: { type: 'string', default: 'large' },
			},
			settings.attributes
		);
	}

	return settings;
}

export const withInspectorControls = createHigherOrderComponent(
	BlockEdit => props => {
		const { name: blockName, attributes, setAttributes } = props;
		const blockSupport = getBlockSupport( blockName, SUPPORTS_NAME );
		return [
			blockSupport && (
				<InspectorControls>
					<PanelBody title={ __( 'Column Settings' ) }>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ attributes.coblockColumns }
							min={ blockSupport.min || 1 }
							max={ blockSupport.max || 3 }
							onChange={ coblockColumns => setAttributes( { coblockColumns } ) }
						/>
						{ attributes.coblockColumns > 1 && (
							<SelectControl
								label={ __( 'Gutter' ) }
								value={ attributes.coblockGutter }
								options={ GUTTER_OPTIONS }
								help={ __( 'Space between each column.' ) }
								onChange={ coblockGutter => setAttributes( { coblockGutter } ) }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			),
			<BlockEdit key="edit" { ...props } />,
		];
	},
	'withInspectorControls'
);

addFilter(
	'blocks.registerBlockType',
	'coblocks/columns/addAttribute',
	addAttribute
);
addFilter(
	'editor.BlockEdit',
	'coblocks/columns/with-inspector-controls',
	withInspectorControls
);
