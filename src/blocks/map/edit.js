/**
 * External dependencies
 */
import classnames from 'classnames';
import { MapIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GoogleMapIframeRender from './edit-gmaps-iframe-render';
import GoogleMapWithApiKey from './edit-gmaps-with-api-key';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import {
	Button,
	Icon,
	Placeholder,
	ResizableBox,
	TextControl,
	withNotices,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const Edit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
		setAttributes,
	} = props;

	const {
		address,
		hasApiKey,
		pinned,
		height,
	} = attributes;

	const [ apiKeyState, setApiKey ] = useState( '' );
	const [ addressState, setAddress ] = useState( address );

	const { __unstableMarkNextChangeAsNotPersistent } = useDispatch(
		blockEditorStore
	);

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( res ) => {
			setApiKey( res.coblocks_google_maps_api_key );
		} );
	}, [] );

	useEffect( () => {
		if ( !! apiKeyState && ! hasApiKey ) {
			// This side-effect should not create an undo level.
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( { hasApiKey: true } );
		}

		if ( ! isSelected && ! pinned && addressState && Object.keys( addressState ).length ) {
			// This side-effect should not create an undo level.
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( {
				address: addressState,
				pinned: true,
			} );
		}
	}, [ apiKeyState, hasApiKey, isSelected, pinned, addressState ] );

	const updateApiKey = ( apiKey = apiKeyState ) => {
		apiKey = apiKey.trim();

		saveApiKey( apiKey );

		if ( apiKey === '' ) {
			setAttributes( { hasApiKey: false } );

			if ( ! address ) {
				setAttributes( { pinned: false } );
			}

			return;
		}

		if ( address ) {
			setAttributes( { pinned: true } );
		}
	};

	const saveApiKey = ( apiKey = apiKeyState ) => {
		setApiKey( apiKey );

		apiFetch( {
			data: { coblocks_google_maps_api_key: apiKey },
			method: 'POST',
			path: '/wp/v2/settings',
		} );
	};

	const renderMap = ( event ) => {
		if ( event ) {
			event.preventDefault();
		}

		setAttributes( { address: addressState, pinned: true } );
	};

	return (
		<>
			{ isSelected && (
				<Inspector
					{ ...props }
					apiKey={ apiKeyState }
					updateApiKeyCallBack={ updateApiKey }
				/>
			) }
			{ isSelected && (
				<Controls { ...props } apiKey={ apiKeyState } />
			) }
			{ pinned ? (
				<ResizableBox
					className={ classnames( className, {
						'is-selected': isSelected,
					} ) }
					enable={ {
						bottom: true,
						bottomLeft: false,
						bottomRight: false,
						left: false,
						right: false,
						top: false,
						topLeft: false,
						topRight: false,
					} }
					minHeight="200"
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						setAttributes( {
							height: parseInt( height + delta.height, 10 ),
						} );
					} }
					showHandle={ isSelected }
					size={ {
						height,
						width: '100%',
					} }
				>
					{ !! apiKeyState
						? <GoogleMapWithApiKey apiKey={ apiKeyState } props={ props } /> : GoogleMapIframeRender( props ) }
				</ResizableBox>
			) : (
				<Placeholder
					icon={ <Icon icon={ icon } /> }
					instructions={ __(
						'Enter a location or address to drop a pin on a Google map.',
						'coblocks'
					) }
					label={ __( 'Map', 'coblocks' ) }
				>
					<form onSubmit={ renderMap }>
						<TextControl
							className="components-placeholder__input"
							onChange={ ( nextAddress ) =>
								setAddress( nextAddress )
							}
							placeholder={ __(
								'Search for a place or address…',
								'coblocks'
							) }
							value={ addressState || '' }
						/>
						<Button
							disabled={ ! addressState }
							isPrimary={ !! addressState }
							isSecondary={ ! addressState }
							type="submit"
						>
							{ __( 'Search', 'coblocks' ) }
						</Button>
						<div className="components-placeholder__learn-more">
							{ address && (
								<Button
									className="components-placeholder__cancel-button"
									disabled={ ! address }
									isTertiary
									onClick={ () => {
										setAttributes( { pinned: ! pinned } );
										setAddress( address );
									} }
									title={ __( 'Cancel', 'coblocks' ) }
								>
									{ __( 'Cancel', 'coblocks' ) }
								</Button>
							) }
						</div>
					</form>
					{ attributes.lng && attributes.hasError && (
						<span className="invalid-google-maps-api-key">
							{ attributes.hasError }
						</span>
					) }
				</Placeholder>
			) }
		</>
	);
};

export default compose( [ withNotices ] )( Edit );

