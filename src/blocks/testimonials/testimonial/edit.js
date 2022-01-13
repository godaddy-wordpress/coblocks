/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { mediaUpload } from '@wordpress/editor';
import { usePrevious } from '@wordpress/compose';
import { BlockIcon, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, ButtonGroup, DropZone, Spinner } from '@wordpress/components';
import { closeSmall, image } from '@wordpress/icons';
import { lazy, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import Controls from '../controls';
import Inspector from './inspector';

/**
 * Set and export block values.
 */
const MIN_IMAGE_SIZE = 50;
const MAX_IMAGE_SIZE = 250;

export { MIN_IMAGE_SIZE, MAX_IMAGE_SIZE };

const Edit = ( props ) => {
	const {
		attributes,
		className,
		clientId,
		isSelected,
		setAttributes,
	} = props;

	const {
		backgroundColor,
		headingLevel,
		name,
		role,
		showImage,
		showRole,
		styleName,
		text,
		textColor,
	} = attributes;

	const [ url, setUrl ] = useState( attributes.url || '' );

	const prevShowRole = usePrevious( showRole );
	const prevShowImage = usePrevious( showImage );
	const prevBackgroundColor = usePrevious( backgroundColor );
	const prevTextColor = usePrevious( textColor );

	useEffect( () => {
		if ( showRole !== prevShowRole ) {
			setAttributes( { role: showRole ? role : '' } );
		}

		if ( showImage !== prevShowImage ) {
			setAttributes( { url: showImage ? url : '' } );
		}

		if ( !! url && url !== attributes.url ) {
			setAttributes( { url } );
		}

		if ( backgroundColor !== prevBackgroundColor ) {
			setAttributes( { backgroundColor: backgroundColor ?? '' } );
		}

		if ( textColor !== prevTextColor ) {
			setAttributes( { textColor: textColor ?? '' } );
		}
	}, [ isSelected, clientId, showImage, showRole, role, url, attributes, backgroundColor, textColor ] );

	const onChangeHeadingLevel = ( newHeadingLevel ) => {
		setAttributes( { headingLevel: newHeadingLevel } );
	};

	const replaceImage = ( files ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => {
				setAttributes( {
					alt: media.alt,
					url: media.url,
				} );
				setUrl( media.url );
			},
		} );
	};

	const richTextAttributes = {
		allowedFormats: [ 'bold', 'italic' ],
	};

	const styles = {
		backgroundColor: backgroundColor?.color,
		color: textColor?.color,
	};

	const renderPlaceholder = () => (
		<figure className="wp-block-coblocks-testimonial__image wp-block-coblocks-testimonial__image--placeholder">
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ [ 'image' ] }
					onSelect={ ( imageEntity ) => {
						if ( isBlobURL( imageEntity?.url ) ) {
							return;
						}
						setAttributes( { alt: imageEntity?.alt } );
						setUrl( imageEntity?.url );
					} }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ ! url
								? <BlockIcon icon={ image } />
								: <img alt="" src={ url } />
							}
						</Button>
					) }
					value={ url }
				>
				</MediaUpload>
			</MediaUploadCheck>
		</figure>
	);

	const renderImage = () => {
		const {
			alt,
			focalPoint,
			imageHeight,
			imageWidth,
			url: attributeUrl,
		} = attributes;

		const classes = classnames( 'wp-block-coblocks-testimonial__image', {
			'is-selected': isSelected,
			'is-transient': isBlobURL( attributeUrl ),
		} );

		const dropZone = (
			<DropZone
				label={ __( 'Drop image to replace', 'coblocks' ) }
				onFilesDrop={ replaceImage }
			/>
		);

		const imageStyles = {
			height: imageHeight,
			width: imageWidth,
		};

		return (
			<div className="wp-block-coblocks-testimonial__image-container">
				<figure className={ classes } style={ imageStyles }>
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
				{ isSelected && (
					<ButtonGroup className="block-library-gallery-item__inline-menu wp-block-coblocks-testimonial__remove-image is-visible">
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
			</div>
		);
	};

	const renderHeading = () => (
		<div className={ `${ className }__heading` }>
			<RichText
				className={ `${ className }__heading__name` }
				onChange={ ( newName ) => setAttributes( { name: newName } ) }
				placeholder={ __( 'Enter Name', 'coblocks' ) }
				tagName={ `h${ headingLevel }` }
				value={ name }
				{ ...richTextAttributes }
			/>
			{ !! showRole && (
				<RichText
					className={ `${ className }__heading__role` }
					onChange={ ( newRole ) => setAttributes( { role: newRole } ) }
					placeholder={ __( 'Who are they?', 'coblocks' ) }
					tagName="p"
					value={ role }
					{ ...richTextAttributes }
				/>
			) }
		</div>
	);

	const renderText = () => (
		<RichText
			className={ `${ className }__text` }
			onChange={ ( newText ) => setAttributes( { text: newText } ) }
			placeholder={ __( 'Testimonial goes here…', 'coblocks' ) }
			tagName="p"
			value={ text }
			{ ...richTextAttributes }
		/>
	);

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
				className={ classnames( className ) }
				style={ styles }
			>
				{ styleName === 'boxy' && (
					<>
						{ !! showImage && ( url ? renderImage() : renderPlaceholder() ) }
						{ renderHeading() }
						{ renderText() }
					</>
				) }
				{ styleName === 'conversation' && (
					<>
						{ renderText() }
						<div className={ `${ className }__content` }>
							{ !! showImage && ( url ? renderImage() : renderPlaceholder() ) }
							{ renderHeading() }
						</div>
					</>
				) }
				{ styleName === 'horizontal' && (
					<>
						{ !! showImage && ( url ? renderImage() : renderPlaceholder() ) }
						<div className={ `${ className }__content` }>
							{ renderHeading() }
							{ renderText() }
						</div>
					</>
				) }
			</div>
		</>
	);
};

export default Edit;
