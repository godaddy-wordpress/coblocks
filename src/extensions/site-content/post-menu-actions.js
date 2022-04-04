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
	const [ isConfirming, setIsConfirming ] = useState( null );

	const handleInputKeys = ( event, onToggle ) => {
		if ( 'Escape' === event.key ) {
			onToggle();
		}
	};

	const PostMenuAction = ( { label, icon, onClickAction, modifierClass = null } ) => (
		<MenuItem
			className={ `content-management-actions__item${ modifierClass ? ` ${ modifierClass }` : '' }` }
			onClick={ onClickAction }>
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
							props.onRenamePost();
							onClose();
						} } />

					{ props.shouldDisplayHomepageAction && (
						<>
							{ isConfirming && isConfirming === 'homepage' ? (
								<PostMenuAction
									icon={ ICONS.ICON_HOME }
									label={ __( 'Really set as homepage?', 'coblocks' ) }
									modifierClass="is-confirming"
									onClickAction={ () => {
										props.onSetAsHomePost();
										setIsConfirming( null );
										onClose();
									} } />
							) : (
								<PostMenuAction
									icon={ ICONS.ICON_HOME }
									label={ __( 'Set as homepage', 'coblocks' ) }
									onClickAction={ () => setIsConfirming( 'homepage' ) } />
							) }
						</>
					) }

					{ props.shouldDiplayPinAction &&
						<PostMenuAction
							icon={ ICONS.ICON_PIN }
							label={ props.isSticky ? __( 'Unpin post', 'coblocks' ) : __( 'Pin post', 'coblocks' ) }
							onClickAction={ () => {
								props.onPinPost();
								onClose();
							} } />
					}

					<PostMenuAction
						icon={ <Icon icon={ PageDuplicateIcon } /> }
						label={ __( 'Duplicate', 'coblocks' ) }
						onClickAction={ () => {
							props.onDuplicatePost();
							setIsConfirming( false );
							onClose();
						} } />

					{ isConfirming && isConfirming === 'delete' ? (
						<PostMenuAction
							icon={ <Icon icon={ TrashConfirmIcon } /> }
							label={ __( 'Really delete?', 'coblocks' ) }
							modifierClass="is-destructive"
							onClickAction={ () => {
								props.onDeletePost();
								setIsConfirming( null );
								onClose();
							} } />
					) : (
						<PostMenuAction
							icon={ <Icon icon={ TrashIcon } /> }
							label={ props.postType === 'page' ? __( 'Delete Page', 'coblocks' ) : __( 'Delete Post', 'coblocks' ) }
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
