/**
 * Internal dependencies
 */
import Colors from './colors';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, PanelColor, ContrastChecker, PanelColorSettings } = wp.editor;
const { PanelBody, withFallbackStyles, Toolbar, RangeControl, SelectControl } = wp.components;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {

	const {
		buttonBackground,
		buttonColor,
		featuredTableBackground,
		featuredTableColor,
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
		fallbackFeaturedTableBackground: featuredTableBackground || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackFeaturedTableColor: featuredTableColor || ! computedStyles ? undefined : computedStyles.color,
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
			buttonBackground,
			buttonColor,
			fallbackButtonBackground,
			fallbackButtonColor,
			fallbackFeaturedTableBackground,
			fallbackFeaturedTableColor,
			fallbackTableBackground,
			fallbackTableColor,
			featuredTableBackground,
			featuredTableColor,
			setAttributes,
			setButtonBackground,
			setButtonColor,
			setFeaturedTableBackground,
			setFeaturedTableColor,
			setTableBackground,
			setTableColor,
			tableBackground,
			tableColor,
		} = this.props;

		const {
			title,
			title_2,
			columns,
			featured,
		} = attributes;

		const linkOptions = [
			{ value: 'none', label: __( 'None' ) },
			{ value: 1, label: title && title.length ? title : __( 'Column 1' ) },
			{ value: 2, label: title_2 && title_2.length ? title_2 : __( 'Column 2' ) },
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings' ) } className='coblocks__inspector-block-settings-panel-body'>
						<p>{ __( 'Columns' ) }</p>
						<Toolbar
							className="coblocks__toolbar--numeral"
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
						{ columns > 1 && (
							<SelectControl
								label={ __( 'Featured Column' ) }
								value={ featured }
								options={ linkOptions }
								onChange={ ( nextFeatured ) => setAttributes( { featured: nextFeatured } ) }
							/>
						) }
					</PanelBody>
					{ featured >= 1 && (
						<PanelColorSettings
							title={ __( 'Featured Settings' ) }
							initialOpen={ false }
							colorSettings={ [
								{
									value: featuredTableBackground.color,
									onChange: setFeaturedTableBackground,
									label: __( 'Background Color' ),
								},
								{
									value: featuredTableColor.color,
									onChange: setFeaturedTableColor,
									label: __( 'Text Color' ),
								},
							] }
						>
							<ContrastChecker
								{ ...{
									textColor: featuredTableColor.color,
									backgroundColor: featuredTableBackground.color,
									fallbackFeaturedTableColor,
									fallbackFeaturedTableBackground,
								} }
							/>
						</PanelColorSettings>
					) }
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: tableBackground.color,
								onChange: setTableBackground,
								label: __( 'Background Color' ),
							},
							{
								value: tableColor.color,
								onChange: setTableColor,
								label: __( 'Text Color' ),
								initialOpen: false,
							},
							{
								value: buttonBackground.color,
								onChange: setButtonBackground,
								label: __( 'Button Background Color' ),
							},
							{
								value: buttonColor.color,
								onChange: setButtonColor,
								label: __( 'Button Text Color' ),
							},
						] }
					>
						<ContrastChecker
							{ ...{
								textColor: tableColor.color,
								backgroundColor: tableBackground.color,
								fallbackTableColor,
								fallbackTableBackground,
							} }
						/>
						<ContrastChecker
							{ ...{
								textColor: buttonColor.color,
								backgroundColor: buttonBackground.color,
								fallbackButtonColor,
								fallbackButtonBackground,
							} }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
} );
