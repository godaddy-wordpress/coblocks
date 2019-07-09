/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, } = wp.blockEditor;
const { PanelBody, RangeControl, ToggleControl, SelectControl  } = wp.components;


/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			clientId,
			attributes,
			setAttributes,
		} = this.props;

		const {
			items,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Buttons Settings' ) } className='components-coblocks-block-sidebar--buttons'>
						<RangeControl
							label={ __( 'Buttons' ) }
							value={ items }
							onChange={ ( nextCount ) => {
								setAttributes( {
									items: parseInt( nextCount ),
								} );

								wp.data.dispatch( 'core/editor' ).selectBlock( clientId );
							} }
							min={ 1 }
							max={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
