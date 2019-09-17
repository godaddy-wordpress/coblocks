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
const { __, _x } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { DOWN } = wp.keycodes;
const { RangeControl, withFallbackStyles, ToggleControl, Dropdown, IconButton, SelectControl } = wp.components;

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
			label = __( 'Change typography' ),
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
				label: _x( 'Default', 'typography styles' ),
			},
			{
				value: 'normal',
				label: _x( 'Normal', 'typography styles' ),
			},
			{
				value: 'bold',
				label: _x( 'Bold', 'typography styles' ),
			},
		];

		const transform = [
			{
				value: '',
				label: _x( 'Default', 'typography styles' ),
			},
			{
				value: 'uppercase',
				label: _x( 'Uppercase', 'typography styles' ),
			},
			{
				value: 'lowercase',
				label: _x( 'Lowercase', 'typography styles' ),
			},
			{
				value: 'capitalize',
				label: _x( 'Capitalize', 'typography styles' ),
			},
			{
				value: 'initial',
				label: _x( 'Normal', 'typography styles' ),
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
									label={ __( 'Font' ) }
									value={ fontFamily }
									onChange={ ( nextFontFamily ) => onFontChange( nextFontFamily, onClose ) }
									className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--font"
								/>
								{ ( ( typeof attributes.textPanelFontWeight === 'undefined' || ( typeof attributes.textPanelFontWeight !== 'undefined' && typeof attributes.textPanelFontWeight === 'undefined' ) ) ) ?
									<SelectControl
										label={ __( 'Weight' ) }
										value={ fontWeight }
										options={ weight }
										onChange={ ( nextFontWeight ) => setAttributes( { fontWeight: nextFontWeight } ) }
										className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--weight"
									/> : null
								}
								{ ( ( typeof attributes.textPanelTextTransform === 'undefined' || ( typeof attributes.textPanelTextTransform !== 'undefined' && typeof attributes.textPanelTextTransform === 'undefined' ) ) ) ?
									<SelectControl
										label={ __( 'Transform' ) }
										value={ textTransform }
										options={ transform }
										onChange={ ( nextTextTransform ) => setAttributes( { textTransform: nextTextTransform } ) }
										className="components-base-control--with-flex components-coblocks-typography-dropdown__inner--transform"
									/> : null
								}
								{ ( ( typeof attributes.textPanelHideSize === 'undefined' || ( typeof attributes.textPanelHideSize !== 'undefined' && typeof attributes.textPanelHideSize === 'undefined' ) ) ) ?
									<RangeControl
										label={ __( 'Size' ) }
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
										label={ __( 'Line Height' ) }
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
										label={ __( 'Letter Spacing' ) }
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
											label={ __( 'No Top Spacing' ) }
											checked={ !! noTopSpacing }
											onChange={ () => setAttributes( { noTopSpacing: ! noTopSpacing } ) }
										/>
										<ToggleControl
											label={ __( 'No Bottom Spacing' ) }
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
