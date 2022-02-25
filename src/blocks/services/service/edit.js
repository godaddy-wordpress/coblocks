/**
 * Internal dependencies
 */
import { SERVICE_ALLOWED_BLOCKS as ALLOWED_BLOCKS } from '../utilities';
import InspectorControls from './inspector';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';
import { isBlobURL } from '@wordpress/blob';
import { useEffect } from '@wordpress/element';
import {
	BlockControls,
	// Disable reason: We choose to use unsafe APIs in our codebase.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalImageURLInputUI as ImageURLInputUI,
	InnerBlocks,
	MediaPlaceholder,
	MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button, ButtonGroup, DropZone, Spinner } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

const Edit = ( props ) => {
	const {
		attributes,
		clientId,
		isSelected,
		setAttributes,
	} = props;

	const innerItems = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks( clientId ), [] );
	const image = useSelect( ( select ) => select( 'core' ).getMedia( attributes.imageId ), [] );

	/**
	 * This functional components `props.isSelected` value does not detect when nested children blocks are selected.
	 * Here we declare isBlockSelected as a local variable with improved logic to detect when nested children have been selected.
	 *
	 * @type {boolean} Whether or not this Service block or one of its nested children are selected.
	 */
	const isBlockSelected = useSelect( ( select ) => {
		const {	getBlockHierarchyRootClientId, getSelectedBlockClientId } = select( 'core/block-editor' );

		// Get clientID of the parent block.
		const rootClientId = getBlockHierarchyRootClientId( clientId );
		const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );

		return isSelected || rootClientId === selectedRootClientId;
	} );

	const { updateBlockAttributes, insertBlock, removeBlocks } = useDispatch( 'core/block-editor' );

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		innerItems.forEach( ( item ) => {
			if ( item.name === blockName ) {
				updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	const manageInnerBlock = ( blockName, blockAttributes, show = true ) => {
		const migrateButton = innerItems.filter( ( item ) => item.name === 'core/button' );

		// Migrate core/button to core/buttons block
		if ( !! migrateButton.length ) {
			removeBlocks( migrateButton.map( ( item ) => item.clientId ),	false );
			const newBlock = createBlock( blockName, blockAttributes, migrateButton );
			insertBlock( newBlock, innerItems.length, clientId, false );
			return;
		}

		const targetBlock = innerItems.filter( ( item ) => item.name === blockName );

		if ( ! targetBlock.length && show ) {
			const newButton = createBlock( 'core/button', {} );
			const newBlock = createBlock( blockName, blockAttributes, [ newButton ] );
			insertBlock( newBlock, innerItems.length, clientId, false );
		}

		if ( targetBlock.length && ! show ) {
			removeBlocks( targetBlock.map( ( item ) => item.clientId ),	false );
		}
	};

	/* istanbul ignore next */
	useEffect( () => {
		updateInnerAttributes( 'core/heading', { level: attributes.headingLevel } );
	}, [ attributes.headingLevel ] );

	/* istanbul ignore next */
	useEffect( () => {
		updateInnerAttributes( 'core/buttons', { contentJustification: attributes.alignment } );
	}, [ attributes.alignment ] );

	/* istanbul ignore next */
	useEffect( () => {
		manageInnerBlock( 'core/buttons', { contentJustification: attributes.alignment }, attributes.showCta );
	}, [ attributes.showCta ] );

	const toggleCta = () => {
		setAttributes( { showCta: ! showCta } );
	};

	const replaceImage = ( file ) => {
		setAttributes( { imageAlt: file.alt, imageId: file.id, imageUrl: file.url } );
	};

	const renderImage = () => {
		const classes = classnames( 'wp-block-coblocks-service__figure', {
			'is-selected': isBlockSelected,
			'is-transient': isBlobURL( attributes.imageUrl ),
		} );

		const dropZone = (
			<DropZone
				label={ __( 'Drop image to replace', 'coblocks' ) }
				onFilesDrop={ replaceImage }
			/>
		);

		return (
			<>
				<figure className={ classes }>
					{ isBlockSelected && (
						<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									onSelect={ ( img ) => replaceImage( img ) }
									render={ ( { open } ) => (
										<>
											<Button
												className="coblocks-gallery-item__button"
												disabled={ ! isBlockSelected }
												icon={ closeSmall }
												label={ __( 'Remove image', 'coblocks' ) }
												onClick={ () => setAttributes( { imageAlt: '', imageId: null, imageUrl: '' } ) }
											/>
											<Button
												className="coblocks-gallery-item__button-replace"
												label={ __( 'Replace Image', 'coblocks' ) }
												onClick={ open }
											>
												{ __( 'Replace', 'coblocks' ) }
											</Button>
										</>
									) }
									value={ image?.url }
								>
								</MediaUpload>
							</MediaUploadCheck>
						</ButtonGroup>
					) }
					{ dropZone }
					{ isBlobURL( attributes.imageUrl ) && <Spinner /> }
					<img alt={ attributes.imageAlt } src={ attributes.imageUrl } style={ { objectPosition: attributes.focalPoint ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined } } />
				</figure>
			</>
		);
	};

	const renderPlaceholder = () => {
		return (
			<MediaPlaceholder
				accept={ 'image/*' }
				allowedTypes={ [ 'image' ] }
				className="wp-block-coblocks-service__figure"
				icon="format-image"
				labels={ {
					title: ' ',
				} }
				multiple={ false }
				onSelect={ ( el ) => setAttributes( { imageAlt: el.alt, imageId: el.id, imageUrl: el.url } ) }
			/>
		);
	};

	const { className } = props;
	const {
		headingLevel,
		href,
		imageUrl,
		linkClass,
		linkDestination,
		linkTarget,
		rel,
		showCta,
		alignment,
	} = attributes;

	const onSetHref = ( { href: newHref, ...restArgs } ) => {
		const newAttributes = { ...restArgs };

		if ( newHref !== undefined ) {
			newAttributes.href = newHref;
		}

		setAttributes( newAttributes );
	};

	const TEMPLATE = [
		[
			'core/heading',
			{
				level: headingLevel,
				placeholder: /* translators: placeholder text for input box */ __( 'Write title…', 'coblocks' ),
				textAlign: alignment,
			},
		],
		[
			'core/paragraph',
			{
				align: alignment,
				/* translators: content placeholder */
				placeholder: __( 'Write description…', 'coblocks' ),
			},
		],
	];

	return (
		<>
			<BlockControls>
				<MediaReplaceFlow
					allowedTypes={ [ 'image' ] }
					mediaUrl={ null }
					onSelect={ ( img ) => {
						replaceImage( img );
					} }
				/>
				{ imageUrl && (
					<ImageURLInputUI
						linkClass={ linkClass }
						linkDestination={ linkDestination }
						linkTarget={ linkTarget }
						mediaLink={ image && image.link }
						mediaUrl={ imageUrl }
						onChangeUrl={ onSetHref }
						rel={ rel }
						url={ href || '' }
					/>
				) }
			</BlockControls>
			<InspectorControls
				attributes={ attributes }
				onToggleCta={ toggleCta }
				setAttributes={ setAttributes }
			/>
			<div className={ className }>
				{ imageUrl ? renderImage() : renderPlaceholder() }
				<div className="wp-block-coblocks-service__content">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
