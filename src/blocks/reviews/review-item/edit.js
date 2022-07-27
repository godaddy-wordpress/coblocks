/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const {
		className,
		attributes,
		setAttributes,
	} = props;

	return (
		<div className={ className }>

			<RichText
				onChange={ ( updatedComment ) => setAttributes( { comment: updatedComment } ) }
				placeholder={ __( 'COMMENT', 'coblocks' ) }
				value={ attributes.comment }
			/>

			<RichText
				onChange={ ( updatedAuthor ) => setAttributes( { author: updatedAuthor } ) }
				placeholder={ __( 'AUTHOR', 'coblocks' ) }
				value={ attributes.author }
			/>

			<RichText
				onChange={ ( updatedLocalizedDate ) => setAttributes( { localizedDate: updatedLocalizedDate } ) }
				placeholder={ __( 'DATE', 'coblocks' ) }
				value={ attributes.localizedDate }
			/>

			<RichText
				onChange={ ( updatedRating ) => setAttributes( { rating: updatedRating } ) }
				placeholder={ __( 'RATING', 'coblocks' ) }
				value={ attributes.rating }
			/>

			<img alt={ 'author avatar' } src={ attributes.authorAvatarURL } />

		</div>
	);
};

export default compose( [ ] )( Edit );
