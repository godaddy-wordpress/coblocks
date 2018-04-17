const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	InspectorControls,
	ColorPalette,
} = wp.blocks;

const {
	PanelBody,
	RangeControl,
	PanelColor,
	ToggleControl,
} = wp.components;

export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const {
			twitter,
		} = attributes;

		return (
			<InspectorControls key="inspector">
			</InspectorControls>
		);
	}
}
