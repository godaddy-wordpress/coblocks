/**
 * Internal dependencies
 */
import InspectorControls from './inspector';
import { SERVICE_ALLOWED_BLOCKS as ALLOWED_BLOCKS } from '../utilities';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	// Disable reason: We choose to use unsafe APIs in our codebase.
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalImageURLInputUI as ImageURLInputUI,
	BlockControls,
	InnerBlocks,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { DropZone, Button, Spinner, ButtonGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { isBlobURL } from '@wordpress/blob';
import { closeSmall } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';

const Edit = ( props ) => {
	const {	attributes, clientId, setAttributes } = props;

	const innerItems = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks( clientId ), [] );
	const image = useSelect( ( select ) => select( 'core' ).getMedia( attributes.imageId ), [] );

	/**
	 * This functional components `props.isSelected` value does not detect when nested children blocks are selected.
	 * Here we re-declare isSelected as a local variable with improved logic to detect when nested children have been selected.
	 *
	 * @type {boolean} Whether or not this Service block or one of its nested children are selected.
	 */
	const isSelected = useSelect( ( select ) => {
		const {	getBlockHierarchyRootClientId, getSelectedBlockClientId } = select( 'core/block-editor' );

		// Get clientID of the parent block.
		const rootClientId = getBlockHierarchyRootClientId( clientId );
		const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );

		return props.isSelected || rootClientId === selectedRootClientId;
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
		setAttributes( { imageUrl: file.url, imageAlt: file.alt, imageId: file.id } );
	};

	const renderImage = () => {
		const classes = classnames( 'wp-block-coblocks-service__figure', {
			'is-transient': isBlobURL( attributes.imageUrl ),
			'is-selected': isSelected,
		} );

		const dropZone = (
			<DropZone
				onFilesDrop={ replaceImage }
				label={ __( 'Drop image to replace', 'coblocks' ) }
			/>
		);

		return (
			<>
				<figure className={ classes }>
					{ isSelected && (
						<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									onSelect={ ( img ) => replaceImage( img ) }
									value={ image?.url }
									render={ ( { open } ) => (
										<>
											<Button
												icon={ closeSmall }
												onClick={ () => setAttributes( { imageUrl: '', imageAlt: '', imageId: null } ) }
												className="coblocks-gallery-item__button"
												label={ __( 'Remove image', 'coblocks' ) }
												disabled={ ! isSelected }
											/>
											<Button
												className="coblocks-gallery-item__button-replace"
												onClick={ open }
												label={ __( 'Replace Image', 'coblocks' ) }
											>
												{ __( 'Replace', 'coblocks' ) }
											</Button>
										</>
									) }
								>
								</MediaUpload>
							</MediaUploadCheck>
						</ButtonGroup>
					) }
					{ dropZone }
					{ isBlobURL( attributes.imageUrl ) && <Spinner /> }
					<img src={ attributes.imageUrl } alt={ attributes.imageAlt } style={ { objectPosition: attributes.focalPoint ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined } } />
				</figure>
			</>
		);
	};

	const renderPlaceholder = () => {
		return (
			<MediaPlaceholder
				className="wp-block-coblocks-service__figure"
				allowedTypes={ [ 'image' ] }
				multiple={ false }
				icon="format-image"
				labels={ {
					title: ' ',
				} }
				onSelect={ ( el ) => setAttributes( { imageUrl: el.url, imageAlt: el.alt, imageId: el.id } ) }
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
				placeholder: /* translators: placeholder text for input box */ __( 'Write title…', 'coblocks' ),
				level: headingLevel,
				textAlign: alignment,
			},
		],
		[
			'core/paragraph',
			{
				/* translators: content placeholder */
				placeholder: __( 'Write description…', 'coblocks' ),
				align: alignment,
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
						url={ href || '' }
						onChangeUrl={ onSetHref }
						linkDestination={ linkDestination }
						mediaUrl={ imageUrl }
						mediaLink={ image && image.link }
						linkTarget={ linkTarget }
						linkClass={ linkClass }
						rel={ rel }
					/>
				) }
			</BlockControls>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				onToggleCta={ toggleCta }
			/>
			<div className={ className }>
				{ imageUrl ? renderImage() : renderPlaceholder() }
				<div className="wp-block-coblocks-service__content">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
