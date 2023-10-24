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
		title,
		placeholder,
		features,
	} = attributes;

	const allowedFormats = [ 'bold', 'italic', 'strikethrough' ];

	/**
	 * This block now allows several innerBlock types and has refactored to
	 * use core/list block instead of a custom RichText multiline solution.
	 *
	 * @constant
	 * @type {string[]}
	 */
	const TEMPLATE = [
		[ 'core/list', { className: 'wp-block-coblocks-pricing-table-item__features' },
			[ [ 'core/list-item', { content: features, placeholder: __( 'Add features', 'coblocks' ) }, [] ] ],
		],
		[ 'core/button', { placeholder: __( 'Buy Now', 'coblocks' ) } ],
	];

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
