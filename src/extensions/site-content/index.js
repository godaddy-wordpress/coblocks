/* global coblocksLabs */
/**
 * External dependencies
 */
import { ContentIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { sortBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { useEffect } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import { compose, ifCondition } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Local dependencies
 */
import { CoBlocksMenuIcon } from '../../components/common';
import PostTypePanel from './post-type-panel';
import { PLUGIN_NAME, SITE_CONTENT_FEATURE_ENABLED_KEY } from './constant';
import './site-content-control';

export const CoBlocksSiteContent = ( props ) => {
	useEffect( () => {
		const { currentPageMeta, editPost } = props;

		if ( currentPageMeta && currentPageMeta.hide_page_title === 'enabled' ) {
			wp.domReady( () => {
				const titleNode = document.getElementsByClassName( 'edit-post-visual-editor__post-title-wrapper' )[ 0 ];

				if ( titleNode ) {
					document.getElementsByClassName( 'edit-post-visual-editor__post-title-wrapper' )[ 0 ].style.display = 'none';
					editPost( { meta: { hide_page_title: 'enabled' } } );
				}
			} );
		}
	}, [] );

	const loadPostIntoEditor = ( postType, postId ) => {
		window.location.href = `/wp-admin/post.php?post=${ postId }&action=edit`;
	};

	const { postTypes } = props;

	return (
		<>
			<PluginSidebar
				className="content-management"
				icon={
					<CoBlocksMenuIcon
						icon={ icon }
						label={ __( 'Site content', 'coblocks' ) }
						slug="site-content" />
				}
				title={ __( 'Site contents', 'coblocks' ) }>
				{ postTypes.map( ( postType ) => (
					<PostTypePanel
						data-test="post-type-panel"
						key={ postType.slug }
						loadPostIntoEditor={ loadPostIntoEditor }
						postType={ postType } />
				) ) }
			</PluginSidebar>
		</>
	);
};

/* istanbul ignore next */
registerPlugin( PLUGIN_NAME, {
	icon,
	render: compose( [
		ifCondition( () => {
			const [ siteContentEnabled ] = useEntityProp( 'root', 'site', SITE_CONTENT_FEATURE_ENABLED_KEY );
			const isLabsEnabled = !! coblocksLabs?.isLabsEnabled;
			return siteContentEnabled && isLabsEnabled;
		} ),
		withSelect( ( select ) => {
			const {
				getCurrentPostId,
				getEditedPostAttribute,
			} = select( 'core/editor' );

			const { getPostTypes } = select( 'core' );

			const thePostTypes = ( getPostTypes() || [] )
				.filter( ( postType ) =>
					postType.viewable === true &&
					[ 'post', 'page' ].includes( postType.slug )
				);

			return {
				currentPageMeta: getEditedPostAttribute( 'meta' ),
				currentPostId: getCurrentPostId(),
				postTypes: sortBy( thePostTypes, [ 'name' ] ),
			};
		} ),

		withDispatch( ( dispatch ) => {
			const {	editPost } = dispatch( 'core/editor' );
			return { editPost };
		} ),

	] )( CoBlocksSiteContent ),
} );
