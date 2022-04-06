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
import './site-content-control';

export const CoBlocksSiteContent = ( props ) => {
	useEffect( () => {
		const { currentPageMeta, editPost } = props;
	}, [] );

	const loadPostIntoEditor = ( postType, postId ) => {
		window.location.href = `/wp-admin/post.php?post=${ postId }&action=edit`;
	};

	const { postTypes } = props;

	return null;
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
