/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';

/**
 * WordPress dependencies
 */
const { RichText, InnerBlocks, getColorClassName } = wp.blockEditor;

const isEmpty = attributes => {
	const attributesToCheck = [ 'name', 'imgUrl', 'biography' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

const save = ( { attributes, className } ) => {
	const {
		backgroundColor,
		biography,
		customBackgroundColor,
		customTextColor,
		imgUrl,
		name,
		textColor,
	} = attributes;

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );

	const classes = classnames( className, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[ textClass ]: textClass,
		[ backgroundClass ]: backgroundClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
	};

	return isEmpty( attributes ) ? null : (
		<div className={ classes } style={ styles }>
			{ imgUrl && (
				<div className={ 'wp-block-coblocks-author__avatar' }>
					<img className="wp-block-coblocks-author__avatar-img" src={ imgUrl } alt={ name } />
				</div>
			) }
			<div className={ 'wp-block-coblocks-author__content' }>
				{ ! RichText.isEmpty( name ) && (
					<RichText.Content
						tagName="span"
						className="wp-block-coblocks-author__name"
						value={ name }
					/>
				) }
				{ ! RichText.isEmpty( biography ) && (
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-author__biography"
						value={ biography }
					/>
				) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
