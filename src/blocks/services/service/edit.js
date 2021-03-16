/**
 * Internal dependencies
 */
import InspectorControls from './inspector';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Component, Fragment, useState, useEffect } from '@wordpress/element';
import {
	__experimentalImageURLInputUI as ImageURLInputUI,
	BlockControls,
	InnerBlocks,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	DropZone,
	Button,
	Spinner,
	ButtonGroup,
} from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';
import { closeSmall } from '@wordpress/icons';

/**
 * Constants
 */
const ALLOWED_BLOCKS = [ 'core/heading', 'core/button', 'core/paragraph' ];

const Edit = ( props ) => {
	const {
		attributes,
		clientId,
		getBlocksByClientId,
		insertBlocks,
		removeBlocks,
		setAttributes,
		updateBlockAttributes,
	} = props;

	const updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerItems = getBlocksByClientId( clientId )[ 0 ].innerBlocks;

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
		const innerItems = getBlocksByClientId( clientId )[ 0 ].innerBlocks;

		const targetBlock = innerItems.filter( ( item ) => item.name === blockName );

		if ( ! targetBlock.length && show ) {
			const newBlock = wp.blocks.createBlock( blockName, blockAttributes );
			insertBlocks( newBlock, innerItems.length, clientId, false );
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
		updateInnerAttributes( 'core/heading', { align: attributes.alignment } );
		updateInnerAttributes( 'core/paragraph', { align: attributes.alignment } );
		updateInnerAttributes( 'core/button', {	align: attributes.alignment } );
	}, [ attributes.alignment ] );

	/* istanbul ignore next */
	useEffect( () => {
		manageInnerBlock( 'core/button', { align: attributes.alignment }, attributes.showCta );
	}, [ attributes.showCta ] );

	const toggleCta = () => {
		const showCta = ! attributes.showCta;
		setAttributes( { showCta } );
		manageInnerBlock( 'core/button', {}, showCta );
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
		const { isSelected } = props;

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

	const onSetHref = ( ) => {
		setAttributes( props );
	};

	const { className, getMedia } = props;
	const {
		headingLevel,
		href,
		imageUrl,
		linkClass,
		linkDestination,
		linkTarget,
		rel,
		showCta,
		imageId,
	} = attributes;

	const image = getMedia( imageId );

	const TEMPLATE = [
		[
			'core/heading',
			{
				placeholder: /* translators: placeholder text for input box */ __( 'Write title…', 'coblocks' ),
				level: headingLevel,
			},
		],
		[
			'core/paragraph',
			{
				/* translators: content placeholder */
				placeholder: __( 'Write description…', 'coblocks' ),
			},
		],
	];

	if ( showCta ) {
		TEMPLATE.push( [ 'core/button', {} ] );
	}

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

export default compose( [

	withSelect( ( select, props ) => {
		const {
			getBlocksByClientId,
			getBlocks,
		} = select( 'core/block-editor' );

		const { getMedia } = select( 'core' );

		return {
			getBlocksByClientId,
			innerBlocks: getBlocks( props.clientId ),
			getMedia,
		};
	} ),

	withDispatch( ( dispatch ) => {
		const {
			updateBlockAttributes,
			insertBlocks,
			removeBlocks,
		} = dispatch( 'core/block-editor' );

		return {
			updateBlockAttributes,
			insertBlocks,
			removeBlocks,
		};
	} ),

] )( Edit );
