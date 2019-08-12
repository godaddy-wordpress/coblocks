import applyWithColors from '.././colors';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.blockEditor;

const Inspector = props => {
	const {
		textColor,
		setTextColor,
	} = props;

	const defaultColors = [
		{
			value: textColor.color,
			onChange: setTextColor,
			label: __( 'Text Color' ),
		},
	];

	return (
		<InspectorControls>
			<PanelColorSettings
				title={ __( 'Color Settings' ) }
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
