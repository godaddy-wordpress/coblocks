/**
 * WordPress dependencies
 */
import { useRef, useState, useEffect, useCallback } from '@wordpress/element';

const Size = ( props ) => {
	const {
		children,
		src,
	} = props;

	const gif = useRef( null );
	const container = useRef( null );

	const [ height, setHeight ] = useState( undefined );
	const [ width, setWidth ] = useState( undefined );

	useEffect( () => {
		fetchImageSize();
	}, [ src ] );

	const fetchImageSize = useCallback( () => {
		gif.current = new window.Image();
		gif.current.onload = calculateSize;
		gif.current.src = src;
	}, [ src ] );

	const calculateSize = () => {
		const maxWidth = container?.current?.clientWidth;
		const exceedMaxWidth = gif?.current?.width > maxWidth;
		const ratio = gif?.current?.height / gif?.current?.width;
		const newWidth = exceedMaxWidth ? maxWidth : gif?.current?.width;
		const newHeight = exceedMaxWidth ? maxWidth * ratio : gif?.current?.height;
		setWidth( newWidth );
		setHeight( newHeight );
	};

	const sizes = {
		imageWidth: gif?.current?.width,
		imageHeight: gif?.current?.height,
		containerWidth: container?.current?.clientWidth,
		containerHeight: container?.current?.clientHeight,
		imageWidthWithinContainer: width,
		imageHeightWithinContainer: height,
	};

	return (
		<div ref={ container }>
			{ children( sizes ) }
		</div>
	);
};

export default Size;
