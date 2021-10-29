/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
 */
const TEMPLATE = [ [ 'core/button', { placeholder: __( 'Buy Now', 'coblocks' ) } ] ];

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
		setAttributes,
		backgroundColor,
		textColor,
	} = props;

	const {
		amount,
		currency,
		features,
		title,
		placeholder,
	} = attributes;

	const allowedFormats = [ 'bold', 'italic', 'strikethrough' ];

	return (
		<>
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<div
				className={ classnames(
					className, {
						'has-background': backgroundColor.color,
						'has-text-color': textColor.color,
						[ backgroundColor.class ]: backgroundColor.class,
						[ textColor.class ]: textColor.class,
					}
				) }
				style={ {
					backgroundColor: backgroundColor.color,
					color: textColor.color,
				} }
			>
				<RichText
					tagName="span"
					className="wp-block-coblocks-pricing-table-item__title"
					onChange={ ( nextTitle ) => setAttributes( { title: nextTitle } ) }
					value={ title }
					placeholder={ placeholder || __( 'Plan A', 'coblocks' ) }
					allowedFormats={ allowedFormats }
				/>
				<div className="wp-block-coblocks-pricing-table-item__price-wrapper">
					<RichText
						tagName="span"
						className="wp-block-coblocks-pricing-table-item__currency"
						onChange={ ( nextCurrency ) => setAttributes( { currency: nextCurrency } ) }
						value={ currency }
						placeholder={ __( '$', 'coblocks' ) }
						allowedFormats={ allowedFormats }
					/>
					<RichText
						tagName="span"
						className="wp-block-coblocks-pricing-table-item__amount"
						onChange={ ( nextAmount ) => setAttributes( { amount: nextAmount } ) }
						value={ amount }
						placeholder="99"
						allowedFormats={ allowedFormats }
					/>
				</div>
				<RichText
					tagName="ul"
					multiline="li"
					className="wp-block-coblocks-pricing-table-item__features"
					onChange={ ( nextFeatures ) => setAttributes( { features: nextFeatures } ) }
					value={ features }
					placeholder={ __( 'Add features', 'coblocks' ) }
				/>
				<InnerBlocks
					template={ TEMPLATE }
					templateLock={ false }
					templateInsertUpdatesSelection={ false }
					renderAppender={ InnerBlocks.ButtonBlockAppender }
				/>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
