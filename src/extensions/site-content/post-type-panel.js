/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import {
	Button,
	Icon,
	PanelBody,
	PanelRow,
	Tooltip,
} from '@wordpress/components';
import { check, close, plus } from '@wordpress/icons';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * Local dependencies
 */
import * as ICONS from './icons';
import PostMenuActions from './post-menu-actions';
import './store';

export class PostTypePanel extends Component {
	constructor() {
		super( ...arguments );

		this.inputRefs = [];
	}

	onDelete( post ) {
		const { props } = this;

		// Delete the post.
		apiFetch( {
			method: 'DELETE',
			path: `/wp/v2/${ props.postType.rest_base }/${ post.id }`,
		} ).then( ( data ) => {
			// Remove deleted post from entities.
			const filteredEntitites = props.entities.filter( ( entity ) => entity.id !== post.id );

			// Select the first available entity if the selected entity was the deleted entity.
			if ( props.currentPostId === post.id ) {
				props.loadPostIntoEditor( props.postType.slug, filteredEntitites[ 0 ].id );
			}

			// Refresh the entity store.
			props.receiveEntityRecords( 'postType', props.postType.slug, props.entities, {}, true );

			// Display a notification.
			props.createSuccessNotice(
				sprintf(
					// translators: %s is the post title.
					__( '"%s" has been deleted.', 'coblocks' ),
					data.title.raw
				),
				{
					actions: [
						{
							label: __( 'Undo', 'coblocks' ),
							onClick: () => this.onUnDelete( post ),
						},
					],
					type: 'snackbar',
				}
			);
		} ).catch( () => {
			props.createErrorNotice( __( 'Trashing failed', 'coblocks' ) );
		} );
	}

	onUnDelete( post ) {
		const { props } = this;

		// Restore the post and trigger a save.
		props.editEntityRecord( 'postType', props.postType.slug, post.id, { status: 'draft' } );
		props.loadPostIntoEditor( props.postType.slug, post.id );
		props.savePost();

		// Refresh the entity store.
		props.receiveEntityRecords( 'postType', props.postType.slug, [ ...props.entities, post ], {}, true );
	}

	onDuplicate( post ) {
		const { props } = this;

		// Duplicate the post.
		props.saveEntityRecord( 'postType', props.postType.slug, {
			content: post.content.raw,
			excerpt: post.excerpt.raw,
			status: 'draft',
			title: post.title.raw,
		} )
			.then( ( newPost ) => {
				// Add duplicated post to the entity store.
				props.receiveEntityRecords( 'postType', props.postType.slug, [ ...props.entities, newPost ], {}, true );

				// Load the duplicate post and save it.
				props.loadPostIntoEditor( props.postType.slug, newPost.id );
				props.savePost();

				// Display a notification.
				props.createSuccessNotice(
					sprintf(
						// translators: %s is the post title.
						__( '"%s" has been duplicated.', 'coblocks' ),
						newPost.title.raw
					),
					{ type: 'snackbar' }
				);
			} )
			.catch( () => {
				props.createErrorNotice( __( 'Duplication failed', 'coblocks' ) );
			} );
	}

	onCreateNew( postType ) {
		const { props } = this;

		props.saveEntityRecord( 'postType', postType.slug, {
			status: 'draft',
		} )
			.then( ( newPost ) => {
				// Add new post to the entity store.
				props.receiveEntityRecords( 'postType', postType.slug, [ ...props.entities, newPost ], {}, true );

				// Load the new post into the editor.
				props.loadPostIntoEditor( postType.slug, newPost.id );
				props.savePost();

				// Display a notification.
				props.createSuccessNotice(
					sprintf(
					// translators: %s is the post type's name.
						__( 'A new %s has been created.', 'coblocks' ),
						postType.labels.singular_name
					),
					{ type: 'snackbar' }
				);

				if ( postType.slug === 'page' ) {
					// Open up the layout selector.
					props.openTemplateSelector();
				}
			} )
			.catch( () => {
				props.createErrorNotice(
					sprintf(
					// translators: %s is the post type's name.
						__( 'Could not create a new %s.', 'coblocks' ),
						postType.labels.singular_name
					)
				);
			} );
	}

	onActivateRename = ( post ) => {
		const { setRenameMode } = this.props;
		setRenameMode( post.id )
			.then( () => {
				// Set focus on the Site Content page title for the selected post
				this.inputRefs[ post.id ].focus();
				// Select the content where the focus is
				document.execCommand( 'selectAll', false, null );
				// Send selection at the end
				document.getSelection().collapseToEnd();
			} );
	};

	onCompleteRename = ( post ) => {
		const { props } = this;
		const textValue = this.inputRefs[ post.id ].textContent;

		if ( post.title.raw !== textValue ) {
			apiFetch( {
				data: { title: textValue },
				method: 'POST',
				path: `/wp/v2/${ props.postType.rest_base }/${ post.id }`,
			} ).then( ( data ) => {
				props.receiveEntityRecords( 'postType', props.postType.slug, data, {}, true );
			} );
		}

		this.onResetRename();
	};

	onResetRename = ( post ) => {
		const { cancelRenameMode } = this.props;
		if ( post ) {
			this.inputRefs[ post.id ].textContent = post.title.raw;
		}

		cancelRenameMode();
	};

	onPin( post ) {
		const { props } = this;

		apiFetch( {
			data: { sticky: ! post.sticky },
			method: 'POST',
			path: `/wp/v2/${ props.postType.rest_base }/${ post.id }`,
		} ).then( ( data ) => {
			props.receiveEntityRecords( 'postType', props.postType.slug, data, {}, true );
		} );
	}

	onSetAsHome = ( post ) => {
		const { props } = this;

		apiFetch( {
			data: {
				page_on_front: post.id,
			},
			method: 'POST',
			path: props.settingsEntity.baseURL,
		} ).then( ( data ) => {
			props.receiveEntityRecords( 'root', 'site', data, {}, true );

			props.createSuccessNotice(
				sprintf(
					// translators: %s is the page title.
					__( '"%s" set as the homepage.', 'coblocks' ),
					post.title.raw
				),
				{ type: 'snackbar' }
			);
		} );
	};

	handleInputKeys = ( event, post ) => {
		switch ( event.key ) {
			case 'Enter':
				event.preventDefault();
				this.onCompleteRename( post );
				break;

			case 'Escape':
				this.onResetRename( post );
				break;

			case ' ':
				event.stopPropagation();
				event.preventDefault();
				break;

			default:
				break;
		}
	};

	getOrderedPublishedPages = () => {
		const { entities, homepageId, homepostId } = this.props;
		const pages = entities.filter( ( entity ) => ( entity.status !== 'draft' && entity.id !== homepostId ) );

		// If there's a Homepage, set it as first item in array
		pages.sort( ( a, b ) => {
			if ( a.id === homepageId ) {
				return -1;
			}
			return b.id === homepageId ? 1 : 0;
		} );

		return pages;
	};

	getOrderedPublishedPosts = () => {
		const { entities } = this.props;
		const postsPinned = entities.filter( ( entity ) => entity.status !== 'draft' && entity.sticky );
		const postsUnpinned = entities.filter( ( entity ) => entity.status !== 'draft' && ! entity.sticky );

		return [ ...postsPinned, ...postsUnpinned ];
	};

	getOrderedDrafts = () => {
		const { entities } = this.props;
		const drafts = entities.filter( ( entity ) => entity.status === 'draft' );

		return drafts.reverse();
	};

	renderIcon = ( post ) => {
		const { homepageId, homepageType } = this.props;

		if ( post.sticky ) {
			return ICONS.ICON_STICKY;
		}

		if ( post.id === homepageId && homepageType === 'page' ) {
			return ICONS.ICON_HOME;
		}

		if ( post.type === 'post' ) {
			return ICONS.ICON_POST;
		}

		return ICONS.ICON_PAGE;
	};

	renderPageTitle = ( post ) => {
		const { isInRenameMode } = this.props;

		if ( post.id === isInRenameMode ) {
			return this.inputRefs[ post.id ]?.textContent !== __( '(no title)', 'coblocks' )
				? this.inputRefs[ post.id ].textContent
				: '';
		}

		return post.title.raw ? post.title.raw : __( '(no title)', 'coblocks' );
	};

	renderRow = ( post, index ) => {
		const { currentPostId, homepageId, homepageType, loadPostIntoEditor, isInRenameMode } = this.props;

		const pageTitle = this.renderPageTitle( post );
		const isRenaming = post.id === isInRenameMode;

		return (
			<PanelRow
				className={ classnames( 'content-management__panel__row', {
					current: currentPostId === post.id,
					'is-renaming': isRenaming,
				} ) }
				key={ index }>
				<Button
					className={ classnames( 'content-management__panel__button' ) }
					isLink
					onClick={ () => ! isInRenameMode && loadPostIntoEditor( post.type, post.id ) }>
					<>
						{ this.renderIcon( post ) }
						<span /* eslint-disable-line jsx-a11y/interactive-supports-focus */
							contentEditable={ isRenaming }
							onKeyUp={ ( event ) => this.handleInputKeys( event, post ) }
							ref={ ( currentInput ) => this.inputRefs[ post.id ] = currentInput }
							role="textbox">
							{ pageTitle }
						</span>
					</>
				</Button>

				<PostMenuActions
					isSticky={ post.sticky }
					onDeletePost={ () => this.onDelete( post ) }
					onDuplicatePost={ () => this.onDuplicate( post ) }
					onPinPost={ () => this.onPin( post ) }
					onRenamePost={ () => this.onActivateRename( post, index ) }
					onSetAsHomePost={ () => this.onSetAsHome( post ) }
					postType={ post.type }
					shouldDiplayPinAction={ post.type === 'post' && post.status === 'publish' }
					shouldDisplayHomepageAction={ homepageType === 'page' && post.type === 'page' && post.status === 'publish' && post.id !== homepageId } />

				{ isRenaming && (
					<div className="content-management__panel__rename-actions">
						<Button
							className="content-management__panel__rename-action content-management__panel__rename-action--confirm"
							onClick={ () => this.onCompleteRename( post ) }>
							<Icon icon={ check } size={ 22 } />
						</Button>
						<Button
							className="content-management__panel__rename-action content-management__panel__rename-action--cancel"
							onClick={ () => this.onResetRename( post ) }>
							<Icon icon={ close } size={ 20 } />
						</Button>
					</div>
				) }
			</PanelRow>
		);
	};

	render() {
		const { props } = this;

		const publishPosts = props.postType.slug === 'page' ? this.getOrderedPublishedPages() : this.getOrderedPublishedPosts();
		const draftPosts = this.getOrderedDrafts();

		return (
			<PanelBody
				className={ classnames( 'content-management__panel', {
					'is-renaming': props.isInRenameMode,
				} ) }
				initialOpen={ props.postType.slug === props.currentPostType }
				key={ props.postType.slug }
				title={ props.postType.name }>

				{ publishPosts && publishPosts.map( this.renderRow ) }

				{ ( draftPosts && draftPosts.length > 0 ) && (
					<>
						<h3 className="content-management__panel__separator">
							<span>{ __( 'Drafts', 'coblocks' ) }</span>
						</h3>

						{ draftPosts.map( this.renderRow ) }
					</>
				) }

				<Tooltip
					text={ props.postType.labels.add_new_item }>
					<Button
						className="content-management__add-new-button"
						onClick={ () => this.onCreateNew( props.postType ) }
					>
						<Icon icon={ plus } size={ 28 } />
					</Button>
				</Tooltip>
			</PanelBody>
		);
	}
}

/* istanbul ignore next */
export default compose( [

	withSelect( ( select, props ) => {
		const {
			getCurrentPostId,
			getCurrentPostType,
		} = select( 'core/editor' );

		const {
			getEntityRecords,
			getEntityRecord,
			getEntityConfig,
		} = select( 'core' );

		const filteredPosts = {};
		( getEntityRecords( 'postType', props.postType.slug, { per_page: -1, status: [ 'publish', 'future', 'pending', 'private', 'draft' ] } ) || [] ).forEach( ( post ) => filteredPosts[ post.id ] = post );

		const {
			page_on_front: homepageId,
			page_for_posts: homepostId,
			show_on_front: homepageType,
		} = getEntityRecord( 'root', 'site' ) || {};

		const { isInRenameMode } = select( 'coblocks/site-content' );

		return {
			currentPostId: getCurrentPostId(),
			currentPostType: getCurrentPostType(),
			entities: Object.values( filteredPosts ),
			homepageId,
			homepageType,
			homepostId,
			isInRenameMode: isInRenameMode(),
			settingsEntity: getEntityConfig( 'root', 'site' ),
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			editEntityRecord,
			receiveEntityRecords,
			saveEntityRecord,
		} = dispatch( 'core' );

		const {
			savePost,
		} = dispatch( 'core/editor' );

		const {
			createErrorNotice,
			createSuccessNotice,
		} = dispatch( 'core/notices' );

		const {
			cancelRenameMode,
			setRenameMode,
		} = dispatch( 'coblocks/site-content' );

		const {
			openTemplateSelector,
		} = dispatch( 'coblocks/template-selector' );

		return {
			cancelRenameMode,
			createErrorNotice,
			createSuccessNotice,
			editEntityRecord,
			openTemplateSelector,
			receiveEntityRecords,
			saveEntityRecord,
			savePost,
			setRenameMode,
		};
	} ),

] )( PostTypePanel );
