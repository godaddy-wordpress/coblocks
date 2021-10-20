/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import googleFonts from './../../components/font-family/fonts';
import TypographyAttributes from './attributes';
import TypograpyClasses from './classes';
import TypographyTransforms from './transforms';
import FontFamilyPicker from './../../components/font-family/index';
import { TypographyIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose, ifCondition } from '@wordpress/compose';
import { DOWN } from '@wordpress/keycodes';
import { RangeControl, withFallbackStyles, ToggleControl, Dropdown, ToolbarButton, SelectControl, Toolbar } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

/**
 * Export
 */
export {
	TypographyAttributes,
	TypograpyClasses,
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
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
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
		} = this.props;

		// Show line height on appropriate blocks.
		if ( ! allowedBlocks.includes( this.props.name ) ) {
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
				value: '',
				/* translators: typography style */
				label: __( 'Default', 'coblocks' ),
			},
			{
				value: 'normal',
				/* translators: typography style */
				label: __( 'Normal', 'coblocks' ),
			},
			{
				value: 'bold',
				/* translators: typography style */
				label: __( 'Bold', 'coblocks' ),
			},
		];

		const transform = [
			{
				value: '',
				/* translators: typography style */
				label: __( 'Default', 'coblocks' ),
			},
			{
				value: 'uppercase',
				/* translators: typography style */
				label: __( 'Uppercase', 'coblocks' ),
			},
			{
				value: 'lowercase',
				/* translators: typography style */
				label: __( 'Lowercase', 'coblocks' ),
			},
			{
				value: 'capitalize',
				/* translators: typography style */
				label: __( 'Capitalize', 'coblocks' ),
			},
			{
				value: 'initial',
				/* translators: typography style */
				label: __( 'Normal', 'coblocks' ),
			},
		];

		if ( typeof googleFonts[ fontFamily ] !== 'undefined' && typeof googleFonts[ fontFamily ].weight !== 'undefined' ) {
			googleFonts[ fontFamily ].weight.forEach( ( k ) => {
				weight.push(
					{ value: k, label: k }
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
								className="components-dropdown-menu__toggle"
								icon={ icon }
								onClick={ onToggle }
								onKeyDown={ openOnArrowDown }
								aria-haspopup="true"
								aria-expanded={ isOpen }
								label={ label }
								tooltip={ label }
							/>
						);
					} }
					renderContent={ () => (
						<Fragment>
							<div className="components-coblocks-typography-dropdown__inner">
								<FontFamilyPicker
									label={ __( 'Font', 'coblocks' ) }
									value={ fontFamily }
									onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily ) }
									className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--font"
								/>
								{ ( ( typeof attributes.textPanelFontWeight === 'undefined' || ( typeof attributes.textPanelFontWeight !== 'undefined' && typeof attributes.textPanelFontWeight === 'undefined' ) ) )
									? (
										<SelectControl
											label={ __( 'Weight', 'coblocks' ) }
											value={ fontWeight }
											options={ weight }
											onChange={ ( nextFontWeight ) => setAttributes( { fontWeight: nextFontWeight } ) }
											className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--weight"
										/>
									)
									: null
								}
								{ ( ( typeof attributes.textPanelTextTransform === 'undefined' || ( typeof attributes.textPanelTextTransform !== 'undefined' && typeof attributes.textPanelTextTransform === 'undefined' ) ) )
									? (
										<SelectControl
											label={ __( 'Transform', 'coblocks' ) }
											value={ textTransform }
											options={ transform }
											onChange={ ( nextTextTransform ) => setAttributes( { textTransform: nextTextTransform } ) }
											className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--transform"
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelHideSize === 'undefined' || ( typeof attributes.textPanelHideSize !== 'undefined' && typeof attributes.textPanelHideSize === 'undefined' ) ) )
									? (
										<RangeControl
											label={ __( 'Size', 'coblocks' ) }
											value={ parseFloat( customFontSize ) || undefined }
											onChange={ ( nextFontSize ) => setAttributes( { customFontSize: nextFontSize } ) }
											min={ 1 }
											max={ 100 }
											step={ 1 }
											className="components-coblocks-typography-dropdown__inner--size"
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelLineHeight === 'undefined' || ( typeof attributes.textPanelLineHeight !== 'undefined' && typeof attributes.textPanelLineHeight === 'undefined' ) ) )
									? (
										<RangeControl
											label={ __( 'Line height', 'coblocks' ) }
											value={ parseFloat( lineHeight ) || undefined }
											onChange={ ( nextLineHeight ) => setAttributes( { lineHeight: nextLineHeight } ) }
											min={ 1 }
											max={ 3 }
											step={ .01 }
											className="components-coblocks-typography-dropdown__inner--line-height"
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelLetterSpacing === 'undefined' || ( typeof attributes.textPanelLetterSpacing !== 'undefined' && typeof attributes.textPanelLetterSpacing === 'undefined' ) ) )
									? (
										<RangeControl
											label={ __( 'Letter spacing', 'coblocks' ) }
											value={ parseFloat( letterSpacing ) || undefined }
											onChange={ ( nextLetterSpacing ) => setAttributes( { letterSpacing: nextLetterSpacing } ) }
											min={ -1 }
											max={ 3 }
											step={ .1 }
											className="components-coblocks-typography-dropdown__inner--letter-spacing"
										/> ) : null
								}
								{ ( ( typeof attributes.textPanelShowSpacingControls !== 'undefined' && attributes.textPanelShowSpacingControls ) ) &&
									<div className="components-coblocks-typography-dropdown__footer">
										<ToggleControl
											label={ __( 'No top spacing', 'coblocks' ) }
											checked={ !! noTopSpacing }
											onChange={ () => setAttributes( { noTopSpacing: ! noTopSpacing } ) }
										/>
										<ToggleControl
											label={ __( 'No bottom spacing', 'coblocks' ) }
											checked={ !! noBottomSpacing }
											onChange={ () => setAttributes( { noBottomSpacing: ! noBottomSpacing } ) }
										/>
									</div>
								}
							</div>
						</Fragment>
					) }
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
