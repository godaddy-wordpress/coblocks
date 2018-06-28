/**
 * Internal dependencies
 */
import Colors from './colors';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment, compose } = wp.element;
const { InspectorControls, PanelColor, ContrastChecker } = wp.editor;
const { PanelBody, withFallbackStyles, Toolbar, RangeControl } = wp.components;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		buttonBackground,
		buttonColor,
		tableBackground,
		tableColor,
	} = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackButtonBackground: buttonBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackButtonColor: buttonColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackTableBackground: tableBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTableColor: tableColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 */
export default compose( Colors, FallbackStyles ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
			fallbackButtonBackground,
			fallbackButtonColor,
			fallbackTableBackground,
			fallbackTableColor,
			setButtonBackground,
			setButtonColor,
			setTableBackground,
			setTableColor,
			buttonBackground,
			buttonColor,
			tableBackground,
			tableColor,
		} = this.props;

		const {
			columns,
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
					<PanelColor
						colorValue={ tableBackground.value }
						title={ __( 'Background Color' ) }
						onChange={ setTableBackground }
					/>
					<PanelColor
						colorValue={ tableColor.value }
						title={ __( 'Text Color' ) }
						onChange={ setTableColor }
						initialOpen={ false }
					/>
					{ <ContrastChecker
						textColor={ tableColor.value }
						backgroundColor={ tableBackground.value }
						{ ...{
							fallbackTableBackground,
							fallbackTableColor,
						} }
					/> }
					<PanelColor
						colorValue={ buttonBackground.value }
						title={ __( 'Button Background' ) }
						onChange={ setButtonBackground }
						initialOpen={ false }
					/>
					<PanelColor
						colorValue={ buttonColor.value }
						title={ __( 'Button Color' ) }
						onChange={ setButtonColor }
						initialOpen={ false }
					/>
					{ <ContrastChecker
						textColor={ buttonColor.value }
						backgroundColor={ buttonBackground.value }
						{ ...{
							fallbackButtonBackground,
							fallbackButtonColor,
						} }
					/> }
				</InspectorControls>
			</Fragment>
		);
	}
} );
