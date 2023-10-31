/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import { RichText, getColorClassName, InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

const deprecated = [
	{
		migrate: ( attributes, innerBlocks ) => {
			const { features } = attributes;

			const newListItemBlocks = features.map( ( feature ) =>
				createBlock( 'core/list-item',
					{ content: feature?.props?.children.map( ( child ) => child ) },
					[ ]
				)
			);

			const listBlock = createBlock( 'core/list', {
				className: 'wp-block-coblocks-pricing-table-item__features',
			}, newListItemBlocks );

			delete attributes.features;
			innerBlocks = [ listBlock, ...innerBlocks ];
			return [ attributes, innerBlocks ];
		},
		attributes:	{
			title: {
				source: 'children',
				selector: '.wp-block-coblocks-pricing-table-item__title',
			},
			features: {
				source: 'children',
				selector: '.wp-block-coblocks-pricing-table-item__features',
			},
			currency: {
				type: 'array',
				source: 'children',
				selector: '.wp-block-coblocks-pricing-table-item__currency',
			},
			amount: {
				type: 'array',
				source: 'children',
				selector: '.wp-block-coblocks-pricing-table-item__amount',
			},
			backgroundColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},
			customTextColor: {
				type: 'string',
			},
			placeholder: {
				type: 'string',
			},
		},
		save: ( { attributes } ) => {
			const {
				amount,
				currency,
				customBackgroundColor,
				customTextColor,
				features,
				backgroundColor,
				textColor,
				title,
			} = attributes;

			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const textColorClass = getColorClassName( 'color', textColor );

			const classes = classnames( {
				'has-background': backgroundColor || customBackgroundColor,
				[ backgroundClass ]: backgroundClass,
				'has-text-color': textColor || customTextColor,
				[ textColorClass ]: textColorClass,
			}
			);

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textColorClass ? undefined : customTextColor,
			};

			return isEmpty( attributes ) ? null : (
				<div
					className={ classes }
					style={ styles }
				>
					{ ! RichText.isEmpty( title ) && (
						<RichText.Content
							tagName="span"
							className="wp-block-coblocks-pricing-table-item__title"
							value={ title }
						/>
					) }
					{ ! RichText.isEmpty( amount ) && (
						<div className={ 'wp-block-coblocks-pricing-table-item__price-wrapper' }>
							{ ! RichText.isEmpty( currency ) && (
								<RichText.Content
									tagName="span"
									className="wp-block-coblocks-pricing-table-item__currency"
									value={ currency }
								/>
							) }
							<RichText.Content
								tagName="span"
								className="wp-block-coblocks-pricing-table-item__amount"
								value={ amount }
							/>
						</div>
					) }
					{ ! RichText.isEmpty( features ) && (
						<RichText.Content
							tagName="ul"
							multiline="li"
							className="wp-block-coblocks-pricing-table-item__features"
							value={ features }
						/>
					) }
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];

export default deprecated;
