/**
 * Internal dependencies.
 */
import Controls from '../controls';
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import Inspector from './inspector';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';
import { isBlobURL } from '@wordpress/blob';
import { mediaUpload } from '@wordpress/editor';
import { Button, ButtonGroup, DropZone, Spinner } from '@wordpress/components';
import { compose, usePrevious } from '@wordpress/compose';
import { MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'url', 'title', 'description', 'name' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

const Edit = ( props ) => {
	const {
		attributes,
		className,
		clientId,
		getBlockRootClientId,
		getBlocksByClientId,
		insertBlocks,
		isSelected,
		removeBlocks,
		setAttributes,
	} = props;

	const {
		description,
		headingLevel,
		name,
		showImage,
		showTitle,
		title,
	} = attributes;

	const [ url, setUrl ] = useState( attributes.url || '' );

	const prevShowTitle = usePrevious( showTitle );
	const prevShowImage = usePrevious( showImage );
	const prevSelected = usePrevious( isSelected );

	useEffect( () => {
		// Handle placeholder
		if (
			prevShowImage !== showImage ||
			( ! prevSelected && isSelected )
		) {
			handlePlaceholderPlacement( clientId, 'coblocks/testimonial', {
				showImage,
				showTitle,
			} );
		}

		if ( showTitle !== prevShowTitle ) {
			setAttributes( { price: showTitle ? title : '' } );
		}

		if ( showImage !== prevShowTitle ) {
			setAttributes( { url: showImage ? url : '' } );
		}

		if ( !! url && url !== attributes.url ) {
			setAttributes( { url } );
		}
	}, [ prevShowTitle, isSelected, prevSelected, prevShowImage, clientId, showImage, showTitle, title, url, attributes ] );

	/**
	 * Handle creation and removal of placeholder elements so that we always have one available to use.
	 *
	 * @param {number} childClientId   The child block's ClientId.
	 * @param {string} blockName       The block to insert.
	 * @param {Object} blockAttributes The attributes for the placeholder block.
	 */
	const handlePlaceholderPlacement = ( childClientId, blockName, blockAttributes = {} ) => {
		const itemClientId = getBlockRootClientId( childClientId );
		const foodItems = getBlocksByClientId( itemClientId )[ 0 ].innerBlocks;

		const filledFoodItems = foodItems.filter(
			( item ) => item.name === 'coblocks/food-item' && ! isEmpty( item.attributes )
		);
		const placeholders = foodItems.filter(
			( item ) => item.name === blockName && isEmpty( item.attributes )
		);

		// Remove trailing placeholders if there are more than two.
		removeBlocks(
			placeholders
				.filter( ( item, index ) => item.clientId !== childClientId && index !== 0 && filledFoodItems.length >= 1 )
				.map( ( item ) => item.clientId ),
			false
		);

		// Add a placeholder if there are none.
		if ( placeholders.length === 0 ) {
			const newFoodItem = createBlock( blockName, blockAttributes );
			insertBlocks(
				newFoodItem,
				foodItems.length,
				itemClientId,
				false
			);
		}
	};

	const onChangeHeadingLevel = ( newHeadingLevel ) => {
		setAttributes( { headingLevel: newHeadingLevel } );
	};

	const replaceImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => {
				setUrl( media.url );
				setAttributes( {
					alt: media.alt,
					url: media.url,
				} );
			},
		} );
	};

	const renderImage = () => {
		const {
			url: attributeUrl,
			alt,
			focalPoint,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-testimonial__figure', {
			'is-selected': isSelected,
			'is-transient': isBlobURL( attributeUrl ),
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
					{ isSelected && (
						<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
							<Button
								className="coblocks-gallery-item__button"
								disabled={ ! isSelected }
								icon={ closeSmall }
								label={ __( 'Remove image', 'coblocks' ) }
								onClick={ () => {
									setAttributes( { url: '' } );
									setUrl( '' );
								} }
							/>
						</ButtonGroup>
					) }
					{ dropZone }
					{ isBlobURL( attributeUrl ) && <Spinner /> }
					<img
						alt={ alt }
						src={ attributeUrl }
						style={ {
							objectPosition: focalPoint
								? `${ focalPoint.x * 100 }% ${ focalPoint.y *
										100 }%`
								: undefined,
						} }
					/>
				</figure>
			</>
		);
	};

	const renderPlaceholder = () => {
		return (
			<div className="wp-block-coblocks-testimonial__figure">
				<MediaPlaceholder
					allowedTypes={ [ 'image' ] }
					icon="format-image"
					labels={ {
						title: ' ',
					} }
					multiple={ false }
					onSelect={ ( imageEntity ) => {
						if ( isBlobURL( imageEntity?.url ) ) {
							return;
						}

						setUrl( imageEntity?.url );
						setAttributes( { alt: imageEntity?.alt } );
					}
					}
				/>
			</div>
		);
	};

	const richTextAttributes = {
		allowedFormats: [ 'bold', 'italic' ],
	};

	return (
		<>
			<Controls
				{ ...props }
				onChangeHeadingLevel={ onChangeHeadingLevel }
			/>
			<Inspector
				{ ...props }
			/>
			<div
				className={ classnames( className, {
					'is-empty': isEmpty( attributes ),
				} ) }
			>
				{ !! showImage &&
					( url ? renderImage() : renderPlaceholder() ) }
				<div className="wp-block-coblocks-testimonial__content">
					<div className="wp-block-coblocks-testimonial__heading-wrapper">
						<RichText
							onChange={ ( newName ) => setAttributes( { name: newName } ) }
							placeholder={ __( 'Add name…', 'coblocks' ) }
							tagName={ `h${ headingLevel }` }
							value={ name }
							wrapperClassName="wp-block-coblocks-testimonial__heading"
							{ ...richTextAttributes }
						/>
						{ !! showTitle && ( title || isSelected ) && (
							<RichText
								onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
								placeholder={ __( 'Add title…', 'coblocks' ) }
								tagName={ `h${ headingLevel }` }
								value={ title }
								wrapperClassName="wp-block-coblocks-testimonial__heading"
								{ ...richTextAttributes }
							/>
						) }
					</div>
					<RichText
						onChange={ ( newDescription ) => setAttributes( { description: newDescription } ) }
						placeholder={ __( 'Add description…', 'coblocks' ) }
						tagName="p"
						value={ description }
						wrapperClassName="wp-block-coblocks-testimonial__description"
						{ ...richTextAttributes }
					/>
				</div>
			</div>
		</>
	);
};

const applyWithSelect = withSelect( ( select, props ) => {
	const {
		getBlockRootClientId,
		getBlockSelectionStart,
		getBlocksByClientId,
	} = select( 'core/block-editor' );

	const selectedClientId = getBlockSelectionStart();
	const parentClientId = getBlockRootClientId( selectedClientId );
	const innerItems = getBlocksByClientId( props.clientId )[ 0 ].innerBlocks;

	return {
		getBlockRootClientId,
		getBlockSelectionStart,
		getBlocksByClientId,
		innerItems,
		selectedParentClientId: parentClientId,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const {
		insertBlocks,
		removeBlocks,
		updateBlockAttributes,
	} = dispatch( 'core/block-editor' );

	return {
		insertBlocks,
		removeBlocks,
		updateBlockAttributes,
	};
} );

export default compose( [ applyWithSelect, applyWithDispatch ] )( Edit );
