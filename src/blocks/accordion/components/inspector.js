/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			count,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Settings' ) }>
						<RangeControl
							label={ __( 'Accordion Items' ) }
							value={ count }
							onChange={ ( nextCount ) => {
								setAttributes( {
									count: nextCount,
								} );
							} }
							min={ 1 }
							max={ 10 }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;