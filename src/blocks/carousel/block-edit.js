/**
 * External dependencies
 */
// import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js';
import TinySwiper from 'tiny-swiper';
// import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import './styles/editor.scss';

export default function BlockEdit( { clientId, isSelected } ) {
	const tinyswiperRef = useRef();
	const carouselRef = useRef();
	const blockProps = useBlockProps( { ref: carouselRef } );
	const innerBlocksProps = useInnerBlocksProps( {}, {
		__experimentalCaptureToolbars: true,
		allowedBlocks: [ 'core/image', 'core/paragraph', 'core/query' ],
		orientation: 'horizontal',
		renderAppender: false,
	} );

	const {
		hasInnerBlocks,
		innerBlocks,
		isInserterOpened,
		isListViewOpened,
		selectedBlock,
		sidebarIsOpened,
	} = useSelect( ( select ) => {
		const { getSelectedBlock, getBlock } = select( 'core/block-editor' );
		const block = getBlock( clientId );

		return {
			hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			innerBlocks: block.innerBlocks,
			isInserterOpened: select( 'core/edit-post' ).isInserterOpened(),
			isListViewOpened: select( 'core/edit-post' ).isListViewOpened(),
			selectedBlock: getSelectedBlock(),
			sidebarIsOpened: !! (
				select( 'core/interface' ).getActiveComplementaryArea( 'core/edit-post' ) ||
				select( 'core/edit-post' ).isPublishSidebarOpened()
			),
		};
	}, [ clientId ],
	);

	// console.debug( { hasInnerBlocks, innerBlocks, selectedBlock } );

	useEffect( () => {
		try {
			tinyswiperRef.current = new TinySwiper( carouselRef.current, {
				// * classnames for making any child block a slide.
				// slideClass: 'block-editor-block-list__block',
				// wrapperClass: 'block-editor-block-list__layout',

				// * classnames for making a core/query block into slides.
				slideClass: 'wp-block-post',
				wrapperClass: 'wp-block-post-template',
				touchStartPreventDefault: false,

				// pagination: {
				// 	el: '.swiper-plugin-pagination',
				// 	clickable: true,
				// 	bulletClass: 'swiper-plugin-pagination__item',
				// 	bulletActiveClass: 'is-active',
				// },
				// plugins: [ SwiperPluginPagination ],
			} );
		} catch ( error ) {
			console.debug( 'swiper init error', error );
		}

		return () => tinyswiperRef.current.destroy();
	}, [] );

	// Update tinyswiper when the innerBlocks change and slide to the selected block.
	useEffect( () => {
		const innerBlockSelected = innerBlocks.findIndex( ( block ) => block === selectedBlock );
		if ( innerBlockSelected !== null && innerBlockSelected !== -1 ) {
			tinyswiperRef.current.slideTo( innerBlockSelected );
		}
		tinyswiperRef.current.update();
	}, [ innerBlocks, selectedBlock, isSelected ] );

	// Update the size when the various sidebars are toggled.
	useEffect( () => {
		tinyswiperRef.current.updateSize();
	}, [
		isInserterOpened,
		isListViewOpened,
		sidebarIsOpened,
	] );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
			<ul>
				<li><Button className="swiper-slide-prev" variant="secondary">Prev</Button></li>
				<li><Button className="swiper-slide-next" variant="secondary">Next</Button></li>
			</ul>
		</div>
	);
}
