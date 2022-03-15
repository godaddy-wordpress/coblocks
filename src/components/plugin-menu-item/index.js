/**
 * WordPress dependencies
 */
import { ActionItem } from '@wordpress/interface';
import { compose } from '@wordpress/compose';
import { MenuItem } from '@wordpress/components';
import { withPluginContext } from '@wordpress/plugins';

/**
 * This is an implementation that works to resolve a bug found with the PluginMoreMenuItem implementation
 * Issue: https://github.com/WordPress/gutenberg/issues/39474.
 */
export default compose(
	withPluginContext( ( context, ownProps ) => {
		return {
			as: MenuItem,
			icon: ownProps.icon || context.icon,
			name: 'core/edit-post/plugin-more-menu',
		};
	} )
)( ActionItem );

