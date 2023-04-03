/**
 * External dependencies
 */
import {
	PageDuplicateIcon,
	TrashConfirmIcon,
	TrashIcon,
} from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	Button,
	Dropdown,
	Icon,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import * as ICONS from './icons';
import classnames from 'classnames';

const PostMenuActions = ( props ) => {
	const {
		isSticky,
		onDeletePost,
		onDuplicatePost,
		onPinPost,
		onRenamePost,
		onSetAsHomePost,
		postType,
		shouldDiplayPinAction,
		shouldDisplayHomepageAction,
	} = props;

	const [ isConfirming, setIsConfirming ] = useState( null );

	const handleInputKeys = ( event, onToggle ) => {
		if ( 'Escape' === event.key ) {
			onToggle();
		}
	};

	const PostMenuAction = ( { label, icon, onClickAction, modifierClass = null } ) => (
		<MenuItem
			className={ `content-management-actions__item${ modifierClass ? ` ${ modifierClass }` : '' }` }
			data-testid="post-menu-action__container"
			onClick={ onClickAction }
		>
			{ icon }
			{ label }
		</MenuItem>
	);

	return (
		<Dropdown
			className="content-management__panel__actions"
			contentClassName="content-management-actions"
			icon={ ICONS.ICON_COG }
			label={ __( 'Select an action', 'coblocks' ) }
			onKeyUp={ ( event, { onToggle } ) => handleInputKeys( event, onToggle ) }
			renderContent={ ( { onClose } ) => (
				<MenuGroup>
					<PostMenuAction
						icon={ ICONS.ICON_RENAME }
						label={ __( 'Rename', 'coblocks' ) }
						onClickAction={ () => {
							onRenamePost();
							onClose();
						} } />

					{ shouldDisplayHomepageAction && (
						<>
							{ isConfirming && isConfirming === 'homepage' ? (
								<PostMenuAction
									icon={ ICONS.ICON_HOME }
									label={ __( 'Really set as homepage?', 'coblocks' ) }
									modifierClass="is-confirming"
									onClickAction={ () => {
										onSetAsHomePost();
										setIsConfirming( null );
										onClose();
									} } />
							) : (
								<PostMenuAction
									icon={ ICONS.ICON_HOME }
									label={ __( 'Set as homepage', 'coblocks' ) }
									modifierClass="set-home-post"
									onClickAction={ () => setIsConfirming( 'homepage' ) } />
							) }
						</>
					) }

					{ shouldDiplayPinAction &&
						<PostMenuAction
							icon={ ICONS.ICON_PIN }
							label={ isSticky ? __( 'Unpin post', 'coblocks' ) : __( 'Pin post', 'coblocks' ) }
							modifierClass="pin-action"
							onClickAction={ () => {
								onPinPost();
								onClose();
							} } />
					}

					<PostMenuAction
						icon={ <Icon icon={ PageDuplicateIcon } /> }
						label={ __( 'Duplicate', 'coblocks' ) }
						modifierClass="duplicate-post"
						onClickAction={ () => {
							onDuplicatePost();
							setIsConfirming( false );
							onClose();
						} } />

					{ isConfirming && isConfirming === 'delete' ? (
						<PostMenuAction
							icon={ <Icon icon={ TrashConfirmIcon } /> }
							label={ __( 'Really delete?', 'coblocks' ) }
							modifierClass="is-destructive"
							onClickAction={ () => {
								onDeletePost();
								setIsConfirming( null );
								onClose();
							} } />
					) : (
						<PostMenuAction
							icon={ <Icon icon={ TrashIcon } /> }
							label={ postType === 'page' ? __( 'Delete Page', 'coblocks' ) : __( 'Delete Post', 'coblocks' ) }
							modifierClass="is-destructive"
							onClickAction={ () => setIsConfirming( 'delete' ) } />
					) }
				</MenuGroup>
			) }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					aria-expanded={ isOpen }
					className={ classnames( 'content-management__panel__actions__button', { 'is-open': isOpen } ) }
					onClick={ () => {
						onToggle();
						setIsConfirming( null );
					} }>
					{ ICONS.ICON_COG }
				</Button>
			) }>
		</Dropdown>
	);
};

export default PostMenuActions;
