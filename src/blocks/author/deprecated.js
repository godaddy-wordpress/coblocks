/* eslint-disable sort-keys */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import fromEntries from '../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../utils/block-helpers';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { getColorClassName, getFontSizeClass, InnerBlocks, RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'name', 'imgUrl', 'biography' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

const deprecated = [
	{
		attributes: {
			...metadata.attributes,
			heading: {
				type: 'string',
				selector: '.wp-block-coblocks-author__heading',
			},
			textAlign: {
				type: 'string',
			},
		},

		save( { attributes } ) {
			const {
				biography,
				heading,
				imgUrl,
				name,
				textAlign,
			} = attributes;

			if ( name ) {
				return (
					<div style={ { textAlign } }>
						{ imgUrl && (
							<div className={ 'wp-block-coblocks-author__avatar' }>
								<img
									alt="avatar"
									className="wp-block-coblocks-author__avatar-img"
									src={ imgUrl }
								/>
							</div>
						) }
						<div className={ 'wp-block-coblocks-author__content' }>
							{ ! RichText.isEmpty( heading ) && (
								<RichText.Content
									className="wp-block-coblocks-author__heading"
									tagName="p"
									value={ heading }
								/>
							) }
							{ ! RichText.isEmpty( name ) && (
								<RichText.Content
									className="wp-block-coblocks-author__name"
									tagName="span"
									value={ name }
								/>
							) }
							{ ! RichText.isEmpty( biography ) && (
								<RichText.Content
									className="wp-block-coblocks-author__biography"
									tagName="p"
									value={ biography }
								/>
							) }
							<InnerBlocks.Content />
						</div>
					</div>
				);
			}
			return null;
		},
	},
	{
		attributes: {
			...metadata.attributes,
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
			fontSize: {
				type: 'string',
			},
			customFontSize: {
				type: 'number',
			},
		},
		save: ( { className, attributes } ) => {
			const {
				backgroundColor,
				biography,
				customBackgroundColor,
				customTextColor,
				imgUrl,
				name,
				textColor,
				fontSize,
				customFontSize,
			} = attributes;

			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const textClass = getColorClassName( 'color', textColor );
			const fontSizeClass = getFontSizeClass( fontSize );

			const classes = classnames( className, {
				'has-text-color': textColor || customTextColor,
				'has-background': backgroundColor || customBackgroundColor,
				[ textClass ]: textClass,
				[ backgroundClass ]: backgroundClass,
				[ fontSizeClass ]: fontSizeClass,
			} );

			const styles = {
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customTextColor,
				fontSize: fontSizeClass ? undefined : customFontSize,
			};

			return isEmpty( attributes ) ? null : (
				<div className={ classes } style={ styles }>
					{ imgUrl && (
						<figure className={ 'wp-block-coblocks-author__avatar' }>
							<img alt={ name } className="wp-block-coblocks-author__avatar-img" src={ imgUrl } />
						</figure>
					) }
					<div className={ 'wp-block-coblocks-author__content' }>
						{ ! RichText.isEmpty( name ) && (
							<RichText.Content
								className="wp-block-coblocks-author__name"
								tagName="span"
								value={ name }
							/>
						) }
						{ ! RichText.isEmpty( biography ) && (
							<RichText.Content
								className="wp-block-coblocks-author__biography"
								tagName="p"
								value={ biography }
							/>
						) }
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

export default deprecated;
