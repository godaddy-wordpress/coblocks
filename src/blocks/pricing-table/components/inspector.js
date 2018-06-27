/**
 * Internal dependencies
 */
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, Toolbar, PanelColor, RangeControl } = wp.components;

/**
 * Inspector controls
 */
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
			buttonBackground,
			buttonColor,
			columns,
			tableBackground,
			tableColor,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings' ) } className='coblocks__inspector-block-settings-panel-body'>
						<p>{ __( 'Columns' ) }</p>
						<Toolbar
							controls={ '12'.split( '' ).map( ( count ) => ( {
								icon: icons.blank,
								// translators: %s: columns count e.g: "1", "2"
								title: sprintf( __( '%s Columns' ), count ),
								isActive: columns == count,
								subscript: count,
								onClick: () =>
									setAttributes( {
										columns: count,
										align: count == 2 ? 'wide' : count == 3 ? 'full' : undefined,
									} )
							} ) ) }
						/>
					</PanelBody>

					<PanelColor title={ __( 'Background Color' ) } colorValue={ tableBackground } initialOpen={ false }>
						<ColorPalette
							value={ tableBackground }
							onChange={ ( colorValue ) => setAttributes( { tableBackground: colorValue } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( 'Text Color' ) } colorValue={ tableColor } initialOpen={ false }>
						<ColorPalette
							value={ tableColor }
							onChange={ ( colorValue ) => setAttributes( { tableColor: colorValue } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( 'Button Background' ) } colorValue={ buttonBackground } initialOpen={ false }>
						<ColorPalette
							value={ buttonBackground }
							onChange={ ( colorValue ) => setAttributes( { buttonBackground: colorValue } ) }
						/>
					</PanelColor>
					<PanelColor title={ __( 'Button Color' ) } colorValue={ buttonColor } initialOpen={ false }>
						<ColorPalette
							value={ buttonColor }
							onChange={ ( colorValue ) => setAttributes( { buttonColor: colorValue } ) }
						/>
					</PanelColor>
				</InspectorControls>
			</Fragment>
		);
	}
}
