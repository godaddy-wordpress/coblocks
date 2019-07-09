const { createBlock } = wp.blocks;

function getTransformedAttributes( blockName, attributeName, attributes ) {
	if ( blockName === 'share' ) {
		if ( attributes.shareAttributes ) {
			return attributes.shareAttributes[ attributeName ];
		}
		return attributes[ attributeName ] ? true : false;
	} else if ( blockName === 'social-profiles' ) {
		if ( attributes.socialProfileAttributes ) {
			return attributes.socialProfileAttributes[ attributeName ];
		}
		return attributes[ attributeName ] ? true : false;
	}
}

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: attributes => {
				console.log( attributes );
				// transforming an empty social element
				// if ( ! value || ! value.length ) {
				// 	return createBlock( 'coblocks/social' );
				// }
				// transforming an social element with content
				return createBlock( 'coblocks/social', {
					shareAttributes: JSON.stringify( attributes ),
					facebook: getTransformedAttributes( 'share', 'facebook', attributes ),
					twitter: getTransformedAttributes( 'share', 'twitter', attributes ),
					pinterest: getTransformedAttributes( 'share', 'pinterest', attributes ),
					linkedin: getTransformedAttributes( 'share', 'linkedin', attributes ),
					email: getTransformedAttributes( 'share', 'email', attributes ),
					tumblr: getTransformedAttributes( 'share', 'tumblr', attributes ),
					google: getTransformedAttributes( 'share', 'google', attributes ),
					reddit: getTransformedAttributes( 'share', 'reddit', attributes ),
				} );
			},
		},
	],
	from: [
		{
			type: 'block',
			blocks: [ 'coblocks/social' ],
			transform: attributes => {
				console.log( attributes );
				return createBlock( 'coblocks/social-profiles', {
					socialProfileAttributes: JSON.stringify( attributes ),
					facebook: getTransformedAttributes(
						'social-profiles',
						'facebook',
						attributes
					),
					twitter: getTransformedAttributes(
						'social-profiles',
						'twitter',
						attributes
					),
					pinterest: getTransformedAttributes(
						'social-profiles',
						'pinterest',
						attributes
					),
					linkedin: getTransformedAttributes(
						'social-profiles',
						'linkedin',
						attributes
					),
					instagram: getTransformedAttributes(
						'social-profiles',
						'instagram',
						attributes
					),
					houzz: getTransformedAttributes(
						'social-profiles',
						'houzz',
						attributes
					),
					yelp: getTransformedAttributes( 'social-profiles', 'yelp', attributes ),
					youtube: getTransformedAttributes(
						'social-profiles',
						'youtube',
						attributes
					),
					attributes,
				} );
			},
		},
	],
};
