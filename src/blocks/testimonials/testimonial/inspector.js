/**
 * Internal dependencies
 */
import { DEFAULT_IMAGE_SIZE } from '.';
import ImageSizeSelect from './image-size-select';
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from './edit';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, Button, ExternalLink, FocalPointPicker, PanelBody, RangeControl, TextareaControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		clientId,
		label,
		setAttributes,
	} = props;

	const {
		alt,
		focalPoint,
		imageSize,
		imageWidth,
		showImage,
		showRole,
		url,
	} = attributes;

	const onChangeSize = ( value, size ) => {
		setAttributes( { imageSize: value } );
		if ( size ) {
			if ( size < 0 ) {
				size = '';
			}
			setAttributes( { imageHeight: size, imageWidth: size } );
		}
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Item settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					checked={ showImage }
					help={
						showImage
							? __( 'Showing an image for this item.', 'coblocks' )
							: __( 'Toggle to show an image for this item.', 'coblocks' )
					}
					label={ __( 'Customer Image', 'coblocks' ) }
					onChange={ () => setAttributes( { showImage: ! showImage } ) }
				/>
				<ToggleControl
					checked={ showRole }
					help={
						showRole
							? __( 'Showing the role of each reviewer.', 'coblocks' )
							: __( 'Toggle to show the role for this item.', 'coblocks' )
					}
					label={ __( 'Customer Role', 'coblocks' ) }
					onChange={ () => setAttributes( { showRole: ! showRole } ) }
				/>
			</PanelBody>
			{ url &&
				<PanelBody
					initialOpen={ false }
					title={ __( 'Image settings', 'coblocks' ) }>
					{ imageSize === 'advanced'
						? <div className="components-base-control components-coblocks-icon-block--advanced-size">
							<Button
								aria-label={ __( 'Reset image size', 'coblocks' ) }
								isSecondary
								isSmall
								onClick={ () => {
									document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-testimonial__image' )[ 0 ].style.height = 'auto';
									onChangeSize( 'medium', DEFAULT_IMAGE_SIZE );
								} }
								type="button"
							>
								{ __( 'Reset', 'coblocks' ) }
							</Button>
							<RangeControl
								label={ __( 'Size', 'coblocks' ) }
								max={ MAX_IMAGE_SIZE }
								min={ MIN_IMAGE_SIZE }
								onChange={ ( nextWidth ) => {
									document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-testimonial__image' )[ 0 ].style.height = 'auto';
									setAttributes( {
										imageHeight: nextWidth,
										imageWidth: nextWidth,
									} );
								} }
								step={ 1 }
								value={ imageWidth }
							/>
						</div>
						: <BaseControl id={ `icon-size-control-${ clientId }` } label={ label }>
							<div className="components-coblocks-icon-size__controls">
								<ImageSizeSelect
									imageSize={ imageSize }
									setAttributes={ setAttributes }
									width={ imageWidth }
								/>
								<Button
									aria-label={ __( 'Apply custom size', 'coblocks' ) }
									isPrimary={ imageSize === 'advanced' }
									isSecondary
									isSmall
									onClick={ () => onChangeSize( 'advanced', '' ) }
									type="button"
								>
									{ __( 'Custom', 'coblocks' ) }
								</Button>
							</div>
						</BaseControl>
					}
					<TextareaControl
						help={
							<Fragment>
								<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
									{ __( 'Describe the purpose of the image', 'coblocks' ) }
								</ExternalLink>
								{ __( 'Leave empty if the image is purely decorative.', 'coblocks' ) }
							</Fragment>
						}
						label={ __( 'Alt text (alternative text)', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { alt: value } ) }
						value={ alt }
					/>
					<FocalPointPicker
						label={ __( 'Focal point', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
						url={ url }
						value={ focalPoint }
					/>
				</PanelBody>
			}
		</InspectorControls>
	);
};

export default Inspector;
