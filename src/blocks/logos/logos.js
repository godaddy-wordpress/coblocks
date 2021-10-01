/**
 * External dependencies
 */
import classnames from 'classnames';
import { chunk, flatten } from 'lodash';

/**
 * WordPress dependencies
 */
import { useState, useEffect, forwardRef } from '@wordpress/element';
import { usePrevious, useViewportMatch } from '@wordpress/compose';
import { ResizableBox } from '@wordpress/components';
import { BACKSPACE } from '@wordpress/keycodes';

const Logos = ( props, ref ) => {
	const {
		isSelected,
		attributes,
		images: propsImages,
		setAttributes,
	} = props;

	const [ selectedImage, setSelectedImage ] = useState( null );

	const prevIsSelected = usePrevious( isSelected );

	useEffect( () => {
		if ( isSelected && prevIsSelected ) {
			setSelectedImage( null );
		}
	}, [ prevIsSelected, isSelected ] );

	let count;

	switch ( attributes.align ) {
		case 'wide':
			count = 4;
			break;
		case 'full':
			count = 5;
			break;
		default:
			count = 3;
			break;
	}

	const imageChunks = chunk( propsImages, count );

	return (
		<>
			{ Object.keys( imageChunks ).map( ( keyOuter ) => {
				const images = imageChunks[ keyOuter ];
				return (
					<div className="wp-block-coblocks-logos__row" key={ 'wrapper-' + keyOuter }>
						{ images.map( ( img, index ) => {
							return (
								<ResizableBoxContainer
									axis="x"
									ref={ ref }
									key={ img.id + '-' + keyOuter + '-' + index }
									minWidth="10%"
									maxWidth={ ( 100 / images.length ) + '%' }
									className={ classnames( 'resize', {
										'is-selected': img.id === selectedImage,
									} ) }
									size={ { width: img.width || ( 100 / images.length ) + '%' } }
									enable={ {
										top: false,
										right: true,
										bottom: false,
										left: true,
										topRight: false,
										bottomRight: false,
										bottomLeft: false,
										topLeft: false,
									} }
									onResizeStop={ ( event, direction, elt ) => {
										const elementWidth = elt.style.width;
										imageChunks[ keyOuter ][ index ].width = elementWidth;

										const totalWidth = imageChunks[ keyOuter ].reduce(
											( acc, image ) => acc + parseFloat( image.width ),
											0.0
										);

										if ( totalWidth > 100 ) {
											const widthDifference = parseFloat( 100 - totalWidth );

											imageChunks[ keyOuter ].map( ( image, thisIndex ) => {
												if ( thisIndex !== index ) {
													image.width =
															parseFloat( image.width ) +
															parseFloat( widthDifference / ( imageChunks[ keyOuter ].length - 1 ) ) + '%';

													return image;
												}

												return image;
											} );
										}

										setAttributes( {
											images: flatten( imageChunks ),
										} );
									} }
									onClick={ () => {
										setSelectedImage( img.id );
									} }
									onKeyDown={ ( event ) => {
										if ( BACKSPACE === event.keyCode ) {
											const remainingImages = images.filter( ( image ) => image.id !== img.id );
											setSelectedImage( null );
											setAttributes( { images: remainingImages } );
										}
									} }
									showHandle={ isSelected }
								>
									<img
										src={ img.url }
										alt={ img.alt }
										data-id={ img.id }
										data-width={ img.width || ( 100 / images.length ) + '%' }
										tabIndex="0"
									/>
								</ResizableBoxContainer>
							);
						} ) }
					</div>
				);
			} ) }
		</>
	);
};

const ResizableBoxContainer = forwardRef(
	( { isSelected, isStackedOnMobile, ...props }, ref ) => {
		const isMobile = useViewportMatch( 'small', '<' );
		return (
			<ResizableBox
				ref={ ref }
				showHandle={
					isSelected && ( ! isMobile || ! isStackedOnMobile )
				}
				{ ...props }
			/>
		);
	}
);

export default forwardRef( Logos );
