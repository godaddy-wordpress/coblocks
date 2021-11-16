/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { getColorClassName, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'title', 'features', 'currency', 'amount' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

const save = ( { attributes } ) => {
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
			role="listitem"
			style={ styles }
		>
			{ ! RichText.isEmpty( title ) && (
				<RichText.Content
					className="wp-block-coblocks-pricing-table-item__title"
					tagName="span"
					value={ title }
				/>
			) }
			{ ! RichText.isEmpty( amount ) && (
				<div className={ 'wp-block-coblocks-pricing-table-item__price-wrapper' }>
					{ ! RichText.isEmpty( currency ) && (
						<RichText.Content
							className="wp-block-coblocks-pricing-table-item__currency"
							tagName="span"
							value={ currency }
						/>
					) }
					<RichText.Content
						className="wp-block-coblocks-pricing-table-item__amount"
						tagName="span"
						value={ amount }
					/>
				</div>
			) }
			{ ! RichText.isEmpty( features ) && (
				<RichText.Content
					className="wp-block-coblocks-pricing-table-item__features"
					multiline="li"
					tagName="ul"
					value={ features }
				/>
			) }
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
