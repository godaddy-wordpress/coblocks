/**
 * Internal dependencies.
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { ContrastChecker, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';

const Inspector = ( props ) => {
	const {
		textColor,
		setTextColor,
	} = props;

	const defaultColors = [
		{
			label: __( 'Text color', 'coblocks' ),
			onChange: setTextColor,
			value: textColor.color,
		},
	];

	return (
		<InspectorControls>
			<PanelColorSettings
				colorSettings={ defaultColors }
				initialOpen={ false }
				title={ __( 'Color settings', 'coblocks' ) }
			>
				<ContrastChecker
					{ ...{
						isLargeText: true,
						textColor: textColor.color,
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default compose( [
	applyWithColors,
] )( Inspector );
