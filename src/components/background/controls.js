/**
 * External dependencies
 */
import map from 'lodash/map';
import classnames from 'classnames';
import flatMap from 'lodash/flatMap';

/**
 * Internal dependencies
 */
import icons from './../../utils/icons';
import { ALLOWED_BG_MEDIA_TYPES, BLOCKS_WITH_AUTOPADDING } from './';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { AlignmentToolbar, MediaUpload, MediaUploadCheck } = wp.editor;
const { Toolbar, IconButton, Button, DropdownMenu, ButtonGroup, Dropdown, NavigableMenu } = wp.components;
const { DOWN } = wp.keycodes;

/**
 * Background image block toolbar controls
 */
function BackgroundImageToolbarControls( props, options ) {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		backgroundImg,
	} = attributes;

	return (
		<Fragment>
			<MediaUploadCheck>
				<Toolbar>
					{ backgroundImg ?
						<Dropdown
							className={ classnames( 'components-dropdown-menu', 'components-coblocks-icon-dropdown' ) }
							contentClassName="components-dropdown-menu__popover"
							renderToggle={ ( { isOpen, onToggle } ) => {
								const openOnArrowDown = ( event ) => {
									if ( ! isOpen && event.keyCode === DOWN ) {
										event.preventDefault();
										event.stopPropagation();
										onToggle();
									}
								};
								return (
									<IconButton
										className="components-dropdown-menu__toggle"
										icon={ icons.backgroundImage }
										onClick={ onToggle }
										onKeyDown={ openOnArrowDown }
										aria-haspopup="true"
										aria-expanded={ isOpen }
										label={ 'Edit background' }
										tooltip={ 'Edit background' }
									>
										<span className="components-dropdown-menu__indicator" />
									</IconButton>
								);
							} }
							renderContent={ ( { onClose } ) => {
								return (
									<NavigableMenu
										className="components-dropdown-menu__menu"
										role="menu"
										aria-label={ __( 'Edit background' ) }
									>
										<MediaUpload
											onSelect={ ( media ) => {
												setAttributes( { backgroundImg: media.url, backgroundType: media.type } );
												// Set padding when background image is added.
												if ( BLOCKS_WITH_AUTOPADDING.includes( props.name ) ){
													if ( ! attributes.paddingSize || attributes.paddingSize == 'no' ) {
														setAttributes( { paddingSize: 'medium' } );
													}
												}
											} }
											allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
											value={ backgroundImg }
											render={ ( { open } ) => (
												<IconButton
													className="components-dropdown-menu__menu-item"
													icon={ icons.edit }
													role="menuitem"
													onClick={ open } >
														{ __( 'Edit Background' ) }
												</IconButton>

											) }
										/>
										<IconButton
											className="components-dropdown-menu__menu-item"
											icon={ icons.trash }
											role="menuitem"
											onClick={ () => {
												setAttributes( {
													backgroundImg: '',
													backgroundOverlay: 0,
													backgroundRepeat: 'no-repeat',
													backgroundPosition: '',
													backgroundSize: 'cover',
													hasParallax: false,
												} );
												// Remove padding when background image is removed.
												if ( BLOCKS_WITH_AUTOPADDING.includes( props.name ) ){
													if( attributes.paddingSize ){
														setAttributes( { paddingSize: 'no' } );
													}
												}
											} } >
												{ __( 'Remove Background' ) }
										</IconButton>
									</NavigableMenu>
								);
							} }
						/>
					:
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( { backgroundImg: media.url, backgroundType: media.type  } );
								// Set padding when background image is added.
								if ( BLOCKS_WITH_AUTOPADDING.includes( props.name ) ){
									if ( ! attributes.paddingSize || attributes.paddingSize == 'no' ) {
										setAttributes( { paddingSize: 'medium' } );
									}
								}
							} }
							allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
							value={ backgroundImg }
							render={ ( { open } ) => (
								<IconButton
									className="components-toolbar__control"
									label={ __( 'Add background' ) }
									icon={ icons.backgroundImage }
									onClick={ open }
								/>
							) }
						/>

					}
				</Toolbar>
			</MediaUploadCheck>
		</Fragment>
	);

}

export default BackgroundImageToolbarControls;