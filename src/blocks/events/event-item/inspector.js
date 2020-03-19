/**
 * Internal dependencies.
 */
import applyWithColors from './colors';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings, ContrastChecker } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		textColor,
		setTextColor,
	} = props;

	const defaultColors = [
		{
			value: textColor.color,
			onChange: setTextColor,
			label: __( 'Text color', 'coblocks' ),
		},
	];

	return (
		<InspectorControls>
			<PanelColorSettings
				title={ __( 'Color settings', 'coblocks' ) }
				initialOpen={ false }
				colorSettings={ defaultColors }
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
