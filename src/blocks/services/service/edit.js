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
import { Fragment, useEffect } from '@wordpress/element';
import {
	__experimentalImageURLInputUI as ImageURLInputUI,
	BlockControls,
	InnerBlocks,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { DropZone, Button, Spinner, ButtonGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { mediaUpload } from '@wordpress/editor';
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
		updateInnerAttributes( 'core/heading', { textAlign: attributes.alignment } );
		updateInnerAttributes( 'core/paragraph', { align: attributes.alignment } );
		updateInnerAttributes( 'core/buttons', { contentJustification: attributes.alignment } );
	}, [ attributes.alignment ] );

	/* istanbul ignore next */
	useEffect( () => {
		manageInnerBlock( 'core/buttons', { contentJustification: attributes.alignment }, attributes.showCta );
	}, [ attributes.showCta ] );

	const toggleCta = () => {
		setAttributes( { showCta: ! showCta } );
	};

	const replaceImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) =>
				setAttributes( { imageUrl: media.url, imageAlt: media.alt, imageId: media.id } ),
		} );
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
			<Fragment>
				<figure className={ classes }>
					{ isSelected && (
						<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
							<Button
								icon={ closeSmall }
								onClick={ () => setAttributes( { imageUrl: '', imageAlt: '', imageId: null } ) }
								className="coblocks-gallery-item__button"
								label={ __( 'Remove image', 'coblocks' ) }
								disabled={ ! isSelected }
							/>
						</ButtonGroup>
					) }
					{ dropZone }
					{ isBlobURL( attributes.imageUrl ) && <Spinner /> }
					<img src={ attributes.imageUrl } alt={ attributes.imageAlt } style={ { objectPosition: attributes.focalPoint ? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y * 100 }%` : undefined } } />
				</figure>
			</Fragment>
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

	const onSetHref = ( ) => setAttributes( props );

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
		<Fragment>
			<BlockControls>
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
		</Fragment>
	);
};

export default Edit;
