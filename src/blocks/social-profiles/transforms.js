/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

/* eslint-env browser */
function getPreviousAttributes( blockName, attributeName, attributes ) {
	switch ( blockName ) {
		case 'social-profiles':
			if ( localStorage.getItem( 'shareAttributes' ) !== null ) {
				if ( attributes[ attributeName ] === false ) {
					return '';
				}
				const shareString = localStorage.getItem( 'shareAttributes' );
				const shareObject = JSON.parse( shareString );
				return shareObject[ attributeName ];
			}
			return '';
		case 'share':
			if ( localStorage.getItem( 'socialProfilesAttributes' ) !== null && attributes[ attributeName ] !== false ) {
				if ( attributes[ attributeName ] === '' ) {
					return false;
				}
				const socialString = localStorage.getItem( 'socialProfilesAttributes' );
				const socialObject = JSON.parse( socialString );
				return socialObject[ attributeName ];
			}
			return attributes[ attributeName ] ? true : false;
	}
}

function storePreviousAttributes( blockName, attributes ) {
	switch ( blockName ) {
		case 'share':
			localStorage.setItem( 'shareAttributes', JSON.stringify( attributes ) );
			break;
		case 'social-profiles':
			localStorage.setItem( 'socialProfilesAttributes', JSON.stringify( attributes ) );
			break;
		default:
			return null;
	}
}

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: attributes => {
				storePreviousAttributes( 'share', attributes );
				return createBlock( 'coblocks/social', {
					...attributes,
					facebook: getPreviousAttributes( 'share', 'facebook', attributes ),
					twitter: getPreviousAttributes( 'share', 'twitter', attributes ),
					pinterest: getPreviousAttributes( 'share', 'pinterest', attributes ),
					linkedin: getPreviousAttributes( 'share', 'linkedin', attributes ),
					email: getPreviousAttributes( 'share', 'email', attributes ),
					tumblr: getPreviousAttributes( 'share', 'tumblr', attributes ),
					google: getPreviousAttributes( 'share', 'google', attributes ),
					reddit: getPreviousAttributes( 'share', 'reddit', attributes ),
				} );
			},
		},
	],
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: attributes => {
				storePreviousAttributes( 'social-profiles', attributes );
				return createBlock( 'coblocks/social-profiles', {
					...attributes,
					facebook: getPreviousAttributes(
						'social-profiles',
						'facebook',
						attributes
					),
					twitter: getPreviousAttributes(
						'social-profiles',
						'twitter',
						attributes
					),
					pinterest: getPreviousAttributes(
						'social-profiles',
						'pinterest',
						attributes
					),
					linkedin: getPreviousAttributes(
						'social-profiles',
						'linkedin',
						attributes
					),
					instagram: getPreviousAttributes(
						'social-profiles',
						'instagram',
						attributes
					),
					houzz: getPreviousAttributes(
						'social-profiles',
						'houzz',
						attributes
					),
					yelp: getPreviousAttributes( 'social-profiles', 'yelp', attributes ),
					youtube: getPreviousAttributes(
						'social-profiles',
						'youtube',
						attributes
					),
				} );
			},
		},
	],
};
