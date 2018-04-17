/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blocks;
const { PanelBody, RangeControl } = wp.components;

/**
 * Inspector controls
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.updateHeight = this.updateHeight.bind( this );
	}

	updateHeight( newHeight ) {
		this.props.setAttributes( { height: newHeight } );
	}

	render() {

		const {
			attributes,
			setAttributes
		} = this.props;

		const { height } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Settings' ) }>
					<RangeControl
						label={ __( 'Height' ) }
						value={ height || '' }
						onChange={ this.updateHeight }
						min={ 30 }
						max={ 800 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
