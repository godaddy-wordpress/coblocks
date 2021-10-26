/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import FontFamilyPicker from './../../components/font-family/index';
import googleFonts from './../../components/font-family/fonts';
import TypographyAttributes from './attributes';
import TypographyClasses from './classes';
import { TypographyIcon } from '@godaddy-wordpress/coblocks-icons';
import TypographyTransforms from './transforms';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { useEntityProp } from '@wordpress/core-data';
import { Component, Fragment } from '@wordpress/element';
import { compose, ifCondition } from '@wordpress/compose';
import { Dropdown, RangeControl, SelectControl, ToggleControl, Toolbar, ToolbarButton, withFallbackStyles } from '@wordpress/components';

/**
 * Export
 */
export {
	TypographyAttributes,
	TypographyClasses,
	TypographyTransforms,
};

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : undefined;
	return {
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

const allowedBlocks = [ 'core/paragraph', 'core/heading', 'core/button', 'core/list', 'coblocks/row', 'coblocks/column', 'coblocks/accordion', 'coblocks/accordion-item', 'coblocks/click-to-tweet', 'coblocks/alert', 'coblocks/pricing-table', 'coblocks/highlight' ];

/**
 * Typography Component
 */
class TypographyControls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			icon = TypographyIcon,
			label = __( 'Change typography', 'coblocks' ),
			name,
		} = this.props;

		// Show line height on appropriate blocks.
		if ( ! allowedBlocks.includes( name ) ) {
			return null;
		}

		const {
			customFontSize,
			fontFamily,
			lineHeight,
			letterSpacing,
			noBottomSpacing,
			noTopSpacing,
			fontWeight,
			textTransform,
		} = attributes;

		const weight = [
			{
				/* translators: typography style */
				label: __( 'Default', 'coblocks' ),
				value: '',
			},
			{
				/* translators: typography style */
				label: __( 'Normal', 'coblocks' ),
				value: 'normal',
			},
			{
				/* translators: typography style */
				label: __( 'Bold', 'coblocks' ),
				value: 'bold',
			},
		];

		const transform = [
			{
				/* translators: typography style */
				label: __( 'Default', 'coblocks' ),
				value: '',
			},
			{
				/* translators: typography style */
				label: __( 'Uppercase', 'coblocks' ),
				value: 'uppercase',
			},
			{
				/* translators: typography style */
				label: __( 'Lowercase', 'coblocks' ),
				value: 'lowercase',
			},
			{
				/* translators: typography style */
				label: __( 'Capitalize', 'coblocks' ),
				value: 'capitalize',
			},
			{
				/* translators: typography style */
				label: __( 'Normal', 'coblocks' ),
				value: 'initial',
			},
		];

		if ( typeof googleFonts[ fontFamily ] !== 'undefined' && typeof googleFonts[ fontFamily ].weight !== 'undefined' ) {
			googleFonts[ fontFamily ].weight.forEach( ( k ) => {
				weight.push(
					{ label: k, value: k }
				);
			} );
		}

		const onFontChange = ( value ) => {
			setAttributes( { fontFamily: value } );

			if ( typeof googleFonts[ value ] !== 'undefined' && typeof googleFonts[ value ].weight !== 'undefined' ) {
				if ( fontWeight && Object.values( googleFonts[ fontFamily ].weight ).indexOf( fontWeight ) < 0 ) {
					setAttributes( { fontWeight: undefined } );
				}
			}
		};

		return (
			<Toolbar label={ __( 'Typography controls', 'coblocks' ) } >
				<Dropdown
					className={ classnames( 'components-dropdown-menu', 'components-coblocks-typography-dropdown' ) }
					contentClassName="components-dropdown-menu__popover components-coblocks-typography-dropdown"
					renderContent={ () => (
						<Fragment>
							<div className="components-coblocks-typography-dropdown__inner">
								<FontFamilyPicker
									className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--font"
									label={ __( 'Font', 'coblocks' ) }
									onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily ) }
									value={ fontFamily }
								/>
								{ ( ( typeof attributes.textPanelFontWeight === 'undefined' || ( typeof attributes.textPanelFontWeight !== 'undefined' && typeof attributes.textPanelFontWeight === 'undefined' ) ) )
									? (
										<SelectControl
											className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--weight"
											label={ __( 'Weight', 'coblocks' ) }
											onChange={ ( nextFontWeight ) => setAttributes( { fontWeight: nextFontWeight } ) }
											options={ weight }
											value={ fontWeight }
										/>
									)
									: null
								}
								{ ( ( typeof attributes.textPanelTextTransform === 'undefined' || ( typeof attributes.textPanelTextTransform !== 'undefined' && typeof attributes.textPanelTextTransform === 'undefined' ) ) )
									? (
										<SelectControl
											className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--transform"
											label={ __( 'Transform', 'coblocks' ) }
											onChange={ ( nextTextTransform ) => setAttributes( { textTransform: nextTextTransform } ) }
											options={ transform }
											value={ textTransform }
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelHideSize === 'undefined' || ( typeof attributes.textPanelHideSize !== 'undefined' && typeof attributes.textPanelHideSize === 'undefined' ) ) )
									? (
										<RangeControl
											className="components-coblocks-typography-dropdown__inner--size"
											label={ __( 'Size', 'coblocks' ) }
											max={ 100 }
											min={ 1 }
											onChange={ ( nextFontSize ) => setAttributes( { customFontSize: nextFontSize } ) }
											step={ 1 }
											value={ parseFloat( customFontSize ) || undefined }
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelLineHeight === 'undefined' || ( typeof attributes.textPanelLineHeight !== 'undefined' && typeof attributes.textPanelLineHeight === 'undefined' ) ) )
									? (
										<RangeControl
											className="components-coblocks-typography-dropdown__inner--line-height"
											label={ __( 'Line height', 'coblocks' ) }
											max={ 3 }
											min={ 1 }
											onChange={ ( nextLineHeight ) => setAttributes( { lineHeight: nextLineHeight } ) }
											step={ .01 }
											value={ parseFloat( lineHeight ) || undefined }
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelLetterSpacing === 'undefined' || ( typeof attributes.textPanelLetterSpacing !== 'undefined' && typeof attributes.textPanelLetterSpacing === 'undefined' ) ) )
									? (
										<RangeControl
											className="components-coblocks-typography-dropdown__inner--letter-spacing"
											label={ __( 'Letter spacing', 'coblocks' ) }
											max={ 3 }
											min={ -1 }
											onChange={ ( nextLetterSpacing ) => setAttributes( { letterSpacing: nextLetterSpacing } ) }
											step={ .1 }
											value={ parseFloat( letterSpacing ) || undefined }
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelShowSpacingControls !== 'undefined' && attributes.textPanelShowSpacingControls ) ) &&
									<div className="components-coblocks-typography-dropdown__footer">
										<ToggleControl
											checked={ !! noTopSpacing }
											label={ __( 'No top spacing', 'coblocks' ) }
											onChange={ () => setAttributes( { noTopSpacing: ! noTopSpacing } ) }
										/>
										<ToggleControl
											checked={ !! noBottomSpacing }
											label={ __( 'No bottom spacing', 'coblocks' ) }
											onChange={ () => setAttributes( { noBottomSpacing: ! noBottomSpacing } ) }
										/>
									</div>
								}
							</div>
						</Fragment>
					) }
					renderToggle={ ( { isOpen, onToggle } ) => {
						const openOnArrowDown = ( event ) => {
							if ( ! isOpen && event.keyCode === DOWN ) {
								event.preventDefault();
								event.stopPropagation();
								onToggle();
							}
						};

						return (
							<ToolbarButton
								aria-expanded={ isOpen }
								aria-haspopup="true"
								className="components-dropdown-menu__toggle"
								icon={ icon }
								label={ label }
								onClick={ onToggle }
								onKeyDown={ openOnArrowDown }
								tooltip={ label }
							/>
						);
					} }
				/>
			</Toolbar>
		);
	}
}

export default compose( [
	applyFallbackStyles,
	ifCondition( () => {
		const [ typographyEnabled ] = useEntityProp( 'root', 'site', 'coblocks_typography_controls_enabled' );
		return typographyEnabled;
	} ),
] )( TypographyControls );
