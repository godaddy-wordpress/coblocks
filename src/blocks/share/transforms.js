/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

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
						label: __( 'Share on Facebook', 'coblocks' ),
						slug: 'facebook',
						url: 'https://facebook.com/sharer/sharer.php?u=%s&title=%s',
					},
					{
						label: __( 'Share on Twitter', 'coblocks' ),
						slug: 'twitter',
						url: 'https://twitter.com/share?url=%s&link=%s',
					},
					{
						label: __( 'Share on Pinterest', 'coblocks' ),
						slug: 'pinterest',
						url: 'https://pinterest.com/pin/create/button/?url=%s&description=%s',
					},
					{
						label: __( 'Share on LinkedIn', 'coblocks' ),
						slug: 'linkedin',
						url: 'https://linkedin.com/shareArticle?url=%s&title=%s',
					},
					{
						label: __( 'Share via Email', 'coblocks' ),
						slug: 'email',
						url: 'mailto:?body=%s&subject=%s',
					},
					{
						label: __( 'Share on Tumblr', 'coblocks' ),
						slug: 'tumblr',
						url: 'https://tumblr.com/share/link?url=%s&name=%s',
					},
					{
						label: __( 'Share on Reddit', 'coblocks' ),
						slug: 'reddit',
						url: 'https://reddit.com/submit?url=%s&title=%s',
					},
				].forEach( ( { slug, label, url } ) => {
					if ( !! attributes[ slug ] ) {
						innerBlocks.push(
							createBlock( 'core/social-link', {
								label,
								service: slug,
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

				const iconBackgroundColorObj = find( colors, { slug: attributes.backgroundColor } );
				if ( iconBackgroundColorObj ) {
					attributes.customBackgroundColor = iconBackgroundColorObj.color;
				}

				// Convert old sizes into new size strings.
				const sizeValueTransform = {
					lrg: 'has-large-icon-size',
					med: 'has-normal-icon-size',
					sml: 'has-small-icon-size',
				};

				// Convert old styles into new style classNames.
				if ( !! attributes.className ) {
					[
						{
							new: 'is-style-logos-only',
							old: 'is-style-mask',
						},
						{
							new: 'is-style-pill-shape',
							old: 'is-style-icon',
						},
						{
							new: 'is-style-default',
							old: 'is-style-text',
						},
						{
							new: 'is-style-pill-shape',
							old: 'is-style-icon-and-text',
						},
						{
							new: 'is-style-default',
							old: 'is-style-circular',
						},
					].forEach( ( className ) => {
						attributes.className = attributes.className.replace( className.old, className.new );
					} );
				}

				return createBlock( 'core/social-links', {
					align: attributes.textAlign,
					className: attributes.className,
					customIconBackgroundColor: attributes.customBackgroundColor,
					customIconColor: attributes.customTextColor,
					iconBackgroundColor: attributes.backgroundColor,
					iconBackgroundColorValue: attributes.customBackgroundColor,
					iconColor: attributes.textColor,
					iconColorValue: attributes.customTextColor,
					openInNewTab: true,
					size: sizeValueTransform[ attributes.size ] ?? 'normal',
				}, innerBlocks );
			},
		},
	],
};

export default transforms;
