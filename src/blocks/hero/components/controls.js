/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import icons from './icons';
import { BackgroundControls } from '../../../components/background';
import CSSGridToolbar from '../../../components/grid-control/toolbar';

/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls, PanelColorSettings } = wp.blockEditor;
const { Toolbar, Dropdown, IconButton, withFallbackStyles } = wp.components;

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

class Controls extends Component {
	render() {
		const {
			attributes,
			backgroundColor,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const { contentAlign, paddingSize } = attributes;

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<CSSGridToolbar
							icon={ icons.grid }
							label={ __( 'Change layout' ) }
							props={ this.props }
						/>
					</Toolbar>

					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					<Toolbar>
						<Dropdown
							className="components-dropdown-menu"
							position="bottom right"
							renderToggle={ ( { onToggle } ) => (
								<IconButton
									className="components-dropdown-menu__toggle"
									icon={ icons.colorpicker }
									aria-haspopup="true"
									label={ __( 'Color Settings' ) }
									tooltip={ __( 'Color Settings' ) }
									onClick={ onToggle }
								>
									<span className="components-dropdown-menu__indicator" />
								</IconButton>
							) }
							renderContent={ () => (
								<PanelColorSettings
									title={ __( 'Color Settings' ) }
									initialOpen={ true }
									colorSettings={ [
										{
											value: backgroundColor.color,
											onChange: ( nextBackgroundColor ) => {
												setBackgroundColor( nextBackgroundColor );

												// Add padding if there's none.
												if ( ! paddingSize || paddingSize === 'no' ) {
													setAttributes( { paddingSize: 'huge' } );
												}
											},
											label: __( 'Background Color' ),
										},
										{
											value: textColor.color,
											onChange: setTextColor,
											label: __( 'Text Color' ),
										},
									] }
								>
								</PanelColorSettings>
							) }
						/>
					</Toolbar>

					{ BackgroundControls( this.props ) }
				</BlockControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Controls );
