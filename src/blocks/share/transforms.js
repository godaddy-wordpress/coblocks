/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'core/social-links' ],
			transform: ( attributes ) => {
				const { link = '', title = '' } = select( 'core/editor' )?.getCurrentPost() || {};
				const { colors } = select( 'core/block-editor' )?.getSettings() || {};

				const innerBlocks = [];
				[
					{
						slug: 'facebook',
						label: __( 'Share on Facebook', 'coblocks' ),
						url: 'https://facebook.com/sharer/sharer.php?u=%s&title=%s',
					},
					{
						slug: 'twitter',
						label: __( 'Share on Twitter', 'coblocks' ),
						url: 'https://twitter.com/share?url=%s&link=%s',
					},
					{
						slug: 'pinterest',
						label: __( 'Share on Pinterest', 'coblocks' ),
						url: 'https://pinterest.com/pin/create/button/?url=%s&description=%s',
					},
					{
						slug: 'linkedin',
						label: __( 'Share on LinkedIn', 'coblocks' ),
						url: 'https://linkedin.com/shareArticle?url=%s&title=%s',
					},
					{
						slug: 'email',
						label: __( 'Share via Email', 'coblocks' ),
						url: 'mailto:?body=%s&subject=%s',
					},
					{
						slug: 'tumblr',
						label: __( 'Share on Tumblr', 'coblocks' ),
						url: 'https://tumblr.com/share/link?url=%s&name=%s',
					},
					{
						slug: 'reddit',
						label: __( 'Share on Reddit', 'coblocks' ),
						url: 'https://reddit.com/submit?url=%s&title=%s',
					},
				].forEach( ( { slug, label, url } ) => {
					if ( !! attributes[ slug ] ) {
						innerBlocks.push(
							createBlock( 'core/social-link', {
								service: slug,
								label,
								url: sprintf(
									url,
									encodeURIComponent( link ),
									encodeURIComponent( title ),
								),
							} )
						);
					}
				} );

				// Get color values from slug.
				const iconColorObj = find( colors, { slug: attributes.textColor } );
				if ( iconColorObj ) {
					attributes.customTextColor = iconColorObj.color;
				}

				const iconBackgroundColorObj = find( colors, { slug: attributes.iconBackgroundColor } );
				if ( iconBackgroundColorObj ) {
					attributes.customTextColor = iconBackgroundColorObj.color;
				}

				// Convert old sizes into new size strings.
				const sizeValueTransform = {
					sml: 'has-small-icon-size',
					med: 'has-normal-icon-size',
					lrg: 'has-large-icon-size',
				};

				// Convert old styles into new style classNames.
				if ( !! attributes.className ) {
					[
						{
							old: 'is-style-mask',
							new: 'is-style-logos-only',
						},
						{
							old: 'is-style-icon',
							new: 'is-style-pill-shape',
						},
						{
							old: 'is-style-text',
							new: 'is-style-default',
						},
						{
							old: 'is-style-icon-and-text',
							new: 'is-style-default',
						},
						{
							old: 'is-style-circular',
							new: 'is-style-default',
						},
					].forEach( ( className ) => {
						attributes.className = attributes.className.replace( className.old, className.new );
					} );
				}

				return createBlock( 'core/social-links', {
					className: attributes.className,
					align: attributes.textAlign,
					size: sizeValueTransform[ attributes.size ] ?? 'normal',
					openInNewTab: true,
					iconColor: attributes.textColor,
					customIconColor: attributes.customTextColor,
					iconColorValue: attributes.customTextColor,
					iconBackgroundColor: attributes.backgroundColor,
					customIconBackgroundColor: attributes.customBackgroundColor,
					iconBackgroundColorValue: attributes.customBackgroundColor,
				}, innerBlocks );
			},
		},
	],
};

export default transforms;
