/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/editor.scss';
import googleFonts from './../../components/font-family/fonts';
import TypographyAttributes from './attributes';
import TypograpyClasses from './classes';
import TypographyTransforms from './transforms';
import FontFamilyPicker from './../../components/font-family/index';
import icons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { DOWN } from '@wordpress/keycodes';
import { RangeControl, withFallbackStyles, ToggleControl, Dropdown, IconButton, SelectControl } from '@wordpress/components';

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
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

/**
 * Typography Component
 */
class TypographyControls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			icon = icons.typography,
			label = __( 'Change typography', 'coblocks' ),
		} = this.props;

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
			googleFonts[ fontFamily ].weight.map( ( k ) => {
				weight.push(
					{ value: k, label: k }
				);
			} );
		}

		const onFontChange = ( value, onClose ) => {
			setAttributes( { fontFamily: value } );

			if ( typeof googleFonts[ value ] !== 'undefined' && typeof googleFonts[ value ].weight !== 'undefined' ) {
				if ( fontWeight && Object.values( googleFonts[ fontFamily ].weight ).indexOf( fontWeight ) < 0 ) {
					setAttributes( { fontWeight: '' } );
				}
			}

			onClose();
		};

		return (
			<Fragment>
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
							<IconButton
								className="components-dropdown-menu__toggle"
								icon={ icon }
								onClick={ onToggle }
								onKeyDown={ openOnArrowDown }
								aria-haspopup="true"
								aria-expanded={ isOpen }
								label={ label }
								tooltip={ label }
							>
								<span className="components-dropdown-menu__indicator" />
							</IconButton>
						);
					} }
					renderContent={ ( { onClose } ) => (
						<Fragment>
							<div className="components-coblocks-typography-dropdown__inner">
								<FontFamilyPicker
									label={ __( 'Font', 'coblocks' ) }
									value={ fontFamily }
									onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily, onClose ) }
									className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--font"
								/>
								{ ( ( typeof attributes.textPanelFontWeight === 'undefined' || ( typeof attributes.textPanelFontWeight !== 'undefined' && typeof attributes.textPanelFontWeight === 'undefined' ) ) ) ?
									<SelectControl
										label={ __( 'Weight', 'coblocks' ) }
										value={ fontWeight }
										options={ weight }
										onChange={ ( nextFontWeight ) => setAttributes( { fontWeight: nextFontWeight } ) }
										className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--weight"
									/> : null
								}
								{ ( ( typeof attributes.textPanelTextTransform === 'undefined' || ( typeof attributes.textPanelTextTransform !== 'undefined' && typeof attributes.textPanelTextTransform === 'undefined' ) ) ) ?
									<SelectControl
										label={ __( 'Transform', 'coblocks' ) }
										value={ textTransform }
										options={ transform }
										onChange={ ( nextTextTransform ) => setAttributes( { textTransform: nextTextTransform } ) }
										className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--transform"
									/> : null
								}
								{ ( ( typeof attributes.textPanelHideSize === 'undefined' || ( typeof attributes.textPanelHideSize !== 'undefined' && typeof attributes.textPanelHideSize === 'undefined' ) ) ) ?
									<RangeControl
										label={ __( 'Size', 'coblocks' ) }
										value={ parseFloat( customFontSize ) || null }
										onChange={ ( nextFontSize ) => setAttributes( { customFontSize: nextFontSize } ) }
										min={ 1 }
										max={ 100 }
										step={ 1 }
										className="components-coblocks-typography-dropdown__inner--size"
									/> : null
								}
								{ ( ( typeof attributes.textPanelLineHeight === 'undefined' || ( typeof attributes.textPanelLineHeight !== 'undefined' && typeof attributes.textPanelLineHeight === 'undefined' ) ) ) ?
									<RangeControl
										label={ __( 'Line Height', 'coblocks' ) }
										value={ parseFloat( lineHeight ) || null }
										onChange={ ( nextLineHeight ) => setAttributes( { lineHeight: nextLineHeight } ) }
										min={ 1 }
										max={ 3 }
										step={ .01 }
										className="components-coblocks-typography-dropdown__inner--line-height"
									/> : null
								}
								{ ( ( typeof attributes.textPanelLetterSpacing === 'undefined' || ( typeof attributes.textPanelLetterSpacing !== 'undefined' && typeof attributes.textPanelLetterSpacing === 'undefined' ) ) ) ?
									<RangeControl
										label={ __( 'Letter Spacing', 'coblocks' ) }
										value={ parseFloat( letterSpacing ) || null }
										onChange={ ( nextLetterSpacing ) => setAttributes( { letterSpacing: nextLetterSpacing } ) }
										min={ -1 }
										max={ 3 }n
										step={ .1 }
										className="components-coblocks-typography-dropdown__inner--letter-spacing"
									/> : null
								}
								{ ( ( typeof attributes.textPanelShowSpacingControls !== 'undefined' && attributes.textPanelShowSpacingControls ) ) &&
									<div className="components-coblocks-typography-dropdown__footer">
										<ToggleControl
											label={ __( 'No Top Spacing', 'coblocks' ) }
											checked={ !! noTopSpacing }
											onChange={ () => setAttributes( { noTopSpacing: ! noTopSpacing } ) }
										/>
										<ToggleControl
											label={ __( 'No Bottom Spacing', 'coblocks' ) }
											checked={ !! noBottomSpacing }
											onChange={ () => setAttributes( { noBottomSpacing: ! noBottomSpacing } ) }
										/>
									</div>
								}
							</div>
						</Fragment>
					) }
				/>
			</Fragment>
		);
	}
}

export default compose( [
	applyFallbackStyles,
] )( TypographyControls );
