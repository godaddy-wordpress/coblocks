/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { RichText, InnerBlocks } = wp.editor;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'core/button' ];
const TEMPLATE = [ [ 'core/button', { text: __( 'Buy Now' ) } ] ];

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			setState,
			setTableBackground,
			setTableColor,
			tableBackground,
			tableColor,
		} = this.props;

		const {
			amount,
			currency,
			features,
			title,
		} = attributes;

		const formattingControls = [ 'bold', 'italic', 'strikethrough' ];

		return [
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className, {
							'has-background': tableBackground.color,
							'has-text-color': tableColor.color,
							[ tableBackground.class ]: tableBackground.class,
							[ tableColor.class ]: tableColor.class,
						}
					) }
					style={ {
						backgroundColor: tableBackground.color,
						color: tableColor.color,
					} }
				>
					<RichText
						tagName="h4"
						className={ 'wp-block-coblocks-pricing-table-item__title' }
						onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
						style={ { color: tableColor.color } }
						value={ title }
						placeholder={ __( 'Plan A' ) }
						formattingControls={ formattingControls }
						keepPlaceholderOnFocus
					/>
					<div className={ 'wp-block-coblocks-pricing-table-item__price-wrapper' }>
						<RichText
							tagName='span'
							className={ 'wp-block-coblocks-pricing-table-item__currency' }
							onChange={ ( nextCurrency ) => setAttributes( { currency: nextCurrency } ) }
							style={ { color: tableColor.color } }
							value={ currency }
							placeholder={ __( '$' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>
						<RichText
							tagName='h5'
							className={ 'wp-block-coblocks-pricing-table-item__amount' }
							onChange={ ( nextAmount ) => setAttributes( { amount: nextAmount } ) }
							style={ { color: tableColor.color } }
							value={ amount }
							placeholder={ __( '99' ) }
							formattingControls={ formattingControls }
							keepPlaceholderOnFocus
						/>
					</div>
					<RichText
						tagName='ul'
						multiline='li'
						className={ 'wp-block-coblocks-pricing-table-item__features' }
						onChange={ ( nextFeatures ) => setAttributes( { features: nextFeatures } ) }
						value={ features }
						style={ { color: tableColor.color } }
						placeholder={ __( 'Add features' ) }
						keepPlaceholderOnFocus
					/>
					<InnerBlocks
						template={ TEMPLATE }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
				</div>
			</Fragment>
		];
	}
};

export default compose( [
	applyWithColors,
] )( Edit );
