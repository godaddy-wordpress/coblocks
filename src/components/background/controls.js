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

	/**
	 * Map styles
	 */
	const styleOptions = [
		{
			icon: icons.edit,
			label: __( 'Edit Background' ),
		},
		{
			icon: icons.trash,
			label: __( 'Remove Background' ),
			onclick: { backgroundImg: '', backgroundOverlay: 0, backgroundRepeat: 'no-repeat', backgroundPosition: '', backgroundSize: 'cover', hasParallax: false, },
		},
	];

	return (
		<Fragment>
			<MediaUploadCheck>
				<Toolbar>
					{ backgroundImg ?
						<Dropdown
							className={ classnames( 'components-dropdown-menu', 'components-coblocks-icon-dropdown' ) }
							contentClassName="components-dropdown-menu__popover components-coblocks-icon-dropdown__popover"
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
										label={ __( 'Edit background' ) }
										tooltip={ __( 'Background' ) }
									>
										<span className="components-dropdown-menu__indicator" />
									</IconButton>
								);
							} }
							renderContent={ ( { onClose } ) => {
								return (
									<NavigableMenu
										className="components-coblocks-icon-dropdown"
										role="menu"
										aria-label={ __( 'Edit Background' ) }
									>
										<div className="components-button-group">
											<MediaUpload
												onSelect={ ( media ) => {
													setAttributes( { backgroundImg: media.url } );
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
														label={ __( 'Edit' ) }
														icon={ icons.edit }
														onClick={ open }
													/>
												) }
											/>
											<IconButton
												className="components-toolbar__control"
												label={ __( 'Remove' ) }
												icon={ icons.trash }
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
												} }
											>
											</IconButton>
										</div>
									</NavigableMenu>
								);
							} }
						/>
					:
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( { backgroundImg: media.url } );
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
									label={ __( 'Background' ) }
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