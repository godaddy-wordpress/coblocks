/**
 * External dependencies
 */
import { ContentIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { sortBy } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ComplementaryArea } from '@wordpress/interface';
import { compose } from '@wordpress/compose';
import { registerPlugin } from '@wordpress/plugins';
import { useEffect } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Local dependencies
 */
import { CoBlocksMenuIcon } from '../../components/common';
import PostTypePanel from './post-type-panel';
import { PLUGIN_NAME, SIDEBAR_NAME } from './constant';

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
			<ComplementaryArea
				className="content-management"
				icon={
					<CoBlocksMenuIcon
						icon={ icon }
						label={ __( 'Site', 'coblocks' ) }
						slug="site-content" />
				}
				identifier={ `${ PLUGIN_NAME }/${ SIDEBAR_NAME }` }
				scope="core/edit-post"
				smallScreenTitle={ __( 'Site contents', 'coblocks' ) }
				title={ __( 'Site contents', 'coblocks' ) }>

				{ postTypes.map( ( postType ) => (
					<PostTypePanel
						data-test="post-type-panel"
						key={ postType.slug }
						loadPostIntoEditor={ loadPostIntoEditor }
						postType={ postType } />
				) ) }
			</ComplementaryArea>
		</>
	);
};

/* istanbul ignore next */
registerPlugin( PLUGIN_NAME, {
	icon,
	render: compose( [

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
