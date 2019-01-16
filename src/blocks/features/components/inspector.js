/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import icons from './../../../utils/icons';
import BackgroundImagePanel from '../../../components/background';
import DimensionsControl from '../../../components/dimensions-control/';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, Toolbar, SelectControl, withFallbackStyles } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

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
			backgroundColor,
			fallbackBackgroundColor,
			fallbackTextColor,
			fallbackHeadingColor,
			setAttributes,
			setBackgroundColor,
			textColor,
			headingColor,
		} = this.props;

		const {
			columns,
			width,
			gutter,
			align,
			maxWidth,
			stacked,
			marginBottom,
			marginLeft,
			marginRight,
			marginSize,
			marginTop,
			marginBottomTablet,
			marginLeftTablet,
			marginRightTablet,
			marginTopTablet,
			marginBottomMobile,
			marginLeftMobile,
			marginRightMobile,
			marginTopMobile,
			marginSyncUnits,
			marginSyncUnitsTablet,
			marginSyncUnitsMobile,
			marginUnit,
			paddingBottom,
			paddingLeft,
			paddingRight,
			paddingSize,
			paddingTop,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingRightTablet,
			paddingTopTablet,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingRightMobile,
			paddingTopMobile,
			paddingSyncUnits,
			paddingSyncUnitsTablet,
			paddingSyncUnitsMobile,
			paddingUnit,
		} = attributes;

		const gutterOptions = [
			{ value: 'no', label: __( 'None' ) },
			{ value: 'small', label: __( 'Small' ) },
			{ value: 'medium', label: __( 'Medium' ) },
			{ value: 'large', label: __( 'Large' ) },
			{ value: 'huge', label: __( 'Huge' ) },
		];
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Features Settings' ) } className='block-coblocks__inspector-block-settings-panel-body'>
						<p>{ __( 'Columns' ) }</p>
						<Toolbar
							className="components-coblocks__toolbar-control--numerals"
							controls={ '1234'.split( '' ).map( ( count ) => ( {
								icon: icons.blank,
								// translators: %s: columns count e.g: "1", "2", "3"
								title: sprintf( __( '%s Columns' ), count ),
								isActive: columns == count,
								subscript: count,
								onClick: () => {
										setAttributes( {
											columns: count,
										} );
										wp.data.dispatch( 'core/editor' ).selectBlock( clientId );
									}
								} )
							) }
						/>
						<DimensionsControl { ...this.props }
							type={ 'margin' }
							label={ __( 'Margin' ) }
							help={ __( 'Space around the container.' ) }
							valueTop={ marginTop }
							valueRight={ marginRight }
							valueBottom={ marginBottom }
							valueLeft={ marginLeft }
							valueTopTablet={ marginTopTablet }
							valueRightTablet={ marginRightTablet }
							valueBottomTablet={ marginBottomTablet }
							valueLeftTablet={ marginLeftTablet }
							valueTopMobile={ marginTopMobile }
							valueRightMobile={ marginRightMobile }
							valueBottomMobile={ marginBottomMobile }
							valueLeftMobile={ marginLeftMobile }
							unit={ marginUnit }
							syncUnits={ marginSyncUnits }
							syncUnitsTablet={ marginSyncUnitsTablet }
							syncUnitsMobile={ marginSyncUnitsMobile }
							dimensionSize={ marginSize }
						/>
						<DimensionsControl { ...this.props }
							type={ 'padding' }
							label={ __( 'Padding' ) }
							help={ __( 'Space inside of the container.' ) }
							valueTop={ paddingTop }
							valueRight={ paddingRight }
							valueBottom={ paddingBottom }
							valueLeft={ paddingLeft }
							valueTopTablet={ paddingTopTablet }
							valueRightTablet={ paddingRightTablet }
							valueBottomTablet={ paddingBottomTablet }
							valueLeftTablet={ paddingLeftTablet }
							valueTopMobile={ paddingTopMobile }
							valueRightMobile={ paddingRightMobile }
							valueBottomMobile={ paddingBottomMobile }
							valueLeftMobile={ paddingLeftMobile }
							unit={ paddingUnit }
							syncUnits={ paddingSyncUnits }
							syncUnitsTablet={ paddingSyncUnitsTablet }
							syncUnitsMobile={ paddingSyncUnitsMobile }
							dimensionSize={ paddingSize }
						/>
						{ columns >= 2 &&
							<SelectControl
								label={ __( 'Gutter' ) }
								value={ gutter }
								options={ gutterOptions }
								help={ __( 'Space between each column.' ) }
								onChange={ ( value ) => setAttributes( { gutter: value } ) }
							/>
						}

						<ToggleControl
							label={ __( 'Stack on mobile' ) }
							checked={ !! stacked }
							onChange={ () => setAttributes( {  stacked: ! stacked } ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
							},
						] }
					>
					</PanelColorSettings>
					{ BackgroundImagePanel( this.props, { overlay: true } ) }
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	applyFallbackStyles,
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
] )( Inspector );
