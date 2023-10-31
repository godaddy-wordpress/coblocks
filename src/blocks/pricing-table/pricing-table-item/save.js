/**
 * External dependencies
 */
import classnames from 'classnames';
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import fromEntries from '../../../js/coblocks-fromEntries';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName, InnerBlocks } from '@wordpress/block-editor';

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
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
