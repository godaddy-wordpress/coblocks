/**
 * Internal dependencies
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	PanelRow,
} from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		setColor,
		color,
		backgroundColor,
		setBackgroundColor,
	} = props;

	const {
		shapeHeight,
		backgroundHeight,
	} = attributes;

	const unitControlProps = {
		labelPosition: 'edge',
		units: [
			{ value: 'px', label: 'px', default: 20 },
			{ value: 'vh', label: 'vh', default: 20 },
			{ value: 'vw', label: 'vw', default: 20 },
		],
		min: 0,
		__unstableInputWidth: '80px',
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Divider settings', 'coblocks' ) }>
				<PanelRow>
					<UnitControl
						{ ...unitControlProps }
						label={ __( 'Shape height', 'coblocks' ) }
						onChange={ ( newShapeHeight ) => setAttributes( { shapeHeight: newShapeHeight } ) }
						value={ shapeHeight }
					/>
				</PanelRow>
				<PanelRow>
					<UnitControl
						{ ...unitControlProps }
						label={ __( 'Background height', 'coblocks' ) }
						onChange={ ( newBackgroundHeight ) => setAttributes( { backgroundHeight: newBackgroundHeight } ) }
						value={ backgroundHeight }
					/>
				</PanelRow>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color settings', 'coblocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: color.color,
						onChange: setColor,
						label: __( 'Shape color', 'coblocks' ),
					},
					{
						value: backgroundColor.color,
						onChange: setBackgroundColor,
						label: __( 'Background color', 'coblocks' ),
					},
				] }
			>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );
