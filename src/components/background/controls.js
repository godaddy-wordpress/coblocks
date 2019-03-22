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
const { Toolbar, IconButton, Button, DropdownMenu, ButtonGroup, Dropdown, NavigableMenu, Popover, MenuItem } = wp.components;
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
		openPopover,
	} = attributes;

	return (
		<Fragment>
			<MediaUploadCheck>
				<Toolbar>
					{ openPopover && (
						<Popover
							position="bottom center"
						>
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( { backgroundImg: media.url, backgroundType: media.type, openPopover: !openPopover } );
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
									<MenuItem
										className="components-dropdown-menu__menu-item"
										icon={ icons.edit }
										role="menuitem"
										onClick={ open } >
											{ __( 'Edit Background' ) }
									</MenuItem>

								) }
							/>
							<MenuItem
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
										openPopover: !openPopover,
									} );
									// Remove padding when background image is removed.
									if ( BLOCKS_WITH_AUTOPADDING.includes( props.name ) ){
										if( attributes.paddingSize ){
											setAttributes( { paddingSize: 'no' } );
										}
									}
								} } >
									{ __( 'Remove Background' ) }
							</MenuItem>
						</Popover>
					) }
					{ backgroundImg ?
						<IconButton
							className="components-dropdown-menu__toggle"
							icon={ icons.backgroundImage }
							aria-haspopup="true"
							label={ 'Edit background' }
							tooltip={ 'Edit background' }
							onClick={ () => setAttributes( { openPopover: !openPopover } ) }
						>
						</IconButton>
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