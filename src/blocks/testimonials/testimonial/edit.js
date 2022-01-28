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
import { BlockIcon, getColorClassName, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, ButtonGroup, DropZone, Spinner } from '@wordpress/components';
import { closeSmall, image } from '@wordpress/icons';
import { useEffect, useState } from '@wordpress/element';

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
		isSelected,
		setAttributes,
	} = props;

	const {
		customBackgroundColor,
		customBubbleBackgroundColor,
		customBubbleTextColor,
		customTextColor,
		backgroundColor,
		bubbleBackgroundColor,
		bubbleTextColor,
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

	useEffect( () => {
		setAttributes( {
			backgroundColor: backgroundColor ?? null,
			bubbleBackgroundColor: bubbleBackgroundColor ?? null,
			bubbleTextColor: bubbleTextColor ?? null,
			customBackgroundColor: customBackgroundColor ?? null,
			customBubbleBackgroundColor: customBubbleBackgroundColor ?? null,
			customBubbleTextColor: customBubbleTextColor ?? null,
			customTextColor: customTextColor ?? null,
			textColor: textColor ?? null,
		} );
	}, [ backgroundColor, bubbleBackgroundColor, bubbleTextColor, customBackgroundColor, customBubbleBackgroundColor, customBubbleTextColor, customTextColor, textColor ] );

	useEffect( () => {
		setAttributes( {
			role: showRole ? role : '',
			url: showImage ? url : '',
		} );

		if ( !! url && url !== attributes.url ) {
			setAttributes( { url } );
		}
	}, [ role, showImage, showRole, url ] );

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

	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const textClass = getColorClassName( 'color', textColor );
	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
	};

	const bubbleBackgroundClass = getColorClassName( 'background-color', bubbleBackgroundColor );
	const bubbleTextClass = getColorClassName( 'color', bubbleTextColor );
	const bubbleStyles = {
		backgroundColor: bubbleBackgroundClass ? undefined : customBubbleBackgroundColor,
		color: bubbleTextClass ? undefined : customBubbleTextColor,
	};

	const classes = classnames(
		'wp-block-coblocks-testimonial', {
			[ backgroundClass ]: backgroundClass,
			[ textClass ]: textClass,
		}
	);

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

		const imageClasses = classnames( 'wp-block-coblocks-testimonial__image', {
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
			<div className="wp-block-coblocks-testimonial__image-container" style={ styles }>
				<figure className={ imageClasses } style={ imageStyles }>
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
			/>
			{ !! showRole && (
				<RichText
					className={ `${ className }__heading__role` }
					onChange={ ( newRole ) => setAttributes( { role: newRole } ) }
					placeholder={ __( 'Who are they?', 'coblocks' ) }
					tagName="p"
					value={ role }
				/>
			) }
		</div>
	);

	const renderText = () => (
		<RichText
			className={ classnames(
				`${ className }__text`, {
					[ bubbleBackgroundClass ]: bubbleBackgroundClass && styleName === 'conversation',
					[ bubbleTextClass ]: bubbleTextClass && styleName === 'conversation',
				}
			) }
			identifier="text"
			onChange={ ( newText ) => setAttributes( { text: newText } ) }
			placeholder={ __( 'Testimonial goes here…', 'coblocks' ) }
			style={ styleName === 'conversation' ? bubbleStyles : null }
			tagName="p"
			value={ text }
		/>
	);

	const renderTextBubble = () => (
		<div className={ `${ className }__text-bubble` }>
			{ renderText() }
			<span className={ classnames(
				`${ className }__text-bubble__tip-back`, {
					[ bubbleBackgroundClass ]: bubbleBackgroundClass,
				}
			) } style={ { backgroundColor: bubbleBackgroundClass ? undefined : customBubbleBackgroundColor } }></span>
			<span className={ classnames(
				`${ className }__text-bubble__tip-front`, {
					[ backgroundClass ]: backgroundClass,
				}
			) } style={ { backgroundColor: backgroundClass ? undefined : customBackgroundColor } }></span>
		</div>
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
				className={ classes }
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
						{ renderTextBubble() }
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
