( function( ) {
	'use strict';

	const lightboxModals = document.getElementsByClassName( 'has-lightbox' );

	Array.from(lightboxModals).forEach( ( lightbox, index ) => {
		lightbox.className += ' lightbox-' + index + ' ';
		renderLightboxModal( index );
	});

	function renderLightboxModal( lightboxIndex ) {
		const wrapper = document.createElement('div');
		wrapper.setAttribute('class','coblocks-lightbox');

		const wrapperBackground = document.createElement('div');
		wrapperBackground.setAttribute('class', 'coblocks-lightbox__background');

		const modalHeading = document.createElement('div');
		modalHeading.setAttribute('class','coblocks-lightbox__heading');

		const close = document.createElement('button');
		close.setAttribute('class','coblocks-lightbox__close');

		const counter = document.createElement('span');
		counter.setAttribute('class','coblocks-lightbox__count');

		const imageContainer = document.createElement('div');
		imageContainer.setAttribute('class', 'coblocks-lightbox__image')

		const image = document.createElement('img');

		const caption = document.createElement('figcaption');
		caption.setAttribute('class', 'coblocks-lightbox__caption')

		const arrowLeftContainer = document.createElement('button');
		arrowLeftContainer.setAttribute('class', 'coblocks-lightbox__arrow coblocks-lightbox__arrow--left');

		const arrowRightContainer = document.createElement('button');
		arrowRightContainer.setAttribute('class', 'coblocks-lightbox__arrow coblocks-lightbox__arrow--right');

		const arrowRight = document.createElement('div');
		arrowRight.setAttribute('class', 'arrow-right');

		const arrowLeft = document.createElement('div');
		arrowLeft.setAttribute('class', 'arrow-left');

		const images = document.querySelectorAll( `.has-lightbox.lightbox-${ lightboxIndex } > :not(.carousel-nav) figure img` );
		const captions = document.querySelectorAll( `.has-lightbox.lightbox-${ lightboxIndex } > :not(.carousel-nav) figure figcaption` )
		let index;

		modalHeading.append( counter, close );

		imageContainer.append( image, caption );
		arrowLeftContainer.append( arrowLeft );
		arrowRightContainer.append( arrowRight );

		wrapper.append( wrapperBackground, modalHeading, imageContainer, arrowLeftContainer, arrowRightContainer );

		if ( images.length > 0 ) {
			document.getElementsByTagName("BODY")[0].append( wrapper );
		}

		if ( captions.length > 0 ) {
			Array.from(captions).forEach( function( captionElem, captionIndex ) {
				captionElem.addEventListener('click',function(){
					changeImage( captionIndex );
				})
			} );
		}

		const imagePreloader = {};

		Array.from(images).forEach( function( img, imgIndex ) {
			imagePreloader[ `img-${ imgIndex }` ] = new window.Image();
			imagePreloader[ `img-${ imgIndex }` ].src = img.attributes.src.value;
			imagePreloader[ `img-${ imgIndex }` ]['data-caption'] = 
				( images[ imgIndex ] && images[ imgIndex ].nextElementSibling ) ? 
					images[ imgIndex ].nextElementSibling.innerHTML : '';

			img.addEventListener('click', function(){
				changeImage( imgIndex );
			})
		} );

		arrowLeftContainer.addEventListener('click', function() {
			index = ( index === 0 ) ? ( images.length - 1 ) : ( index - 1 );
			changeImage( index );
		})
		
		arrowRightContainer.addEventListener('click', function() {
			index = ( index === ( images.length - 1 ) ) ? 0 : ( index + 1 );
			changeImage( index );
		})

		wrapperBackground.addEventListener('click', function() {
			wrapper.style.display = 'none';
		})

		close.addEventListener('click', function() {
			wrapper.style.display = 'none';
		})


		function changeImage( imageIndex ) {
			index = imageIndex;
			wrapper.style.display = 'flex';
			wrapperBackground.style.backgroundImage = `url(${imagePreloader[ `img-${ index }` ].src})`;
			image.src = imagePreloader[ `img-${ index }` ].src;
			caption.textContent = imagePreloader[ `img-${ index }` ]['data-caption'];
			counter.textContent = `${( index + 1 )} / ${images.length}`;
		}

		document.onkeydown = function(e) {
			const lightboxDisplayValue = wrapper.style.display;
			const lightboxIsOpen = ( typeof lightboxDisplayValue !== typeof undefined && lightboxDisplayValue !== 'none' );
			if ( lightboxIsOpen ) {
				e = e || window.event;
				switch ( e.keyCode ) {
					case 27 : // Esc key
						close.trigger( 'click' );
						break;
					case 37 : // Arrow left or 'A' key.
						arrowLeftContainer.click();
						break;
					case 65 : // 'A' key.
						arrowLeftContainer.click();
						break;
					case 39 : // Arrow right.
						arrowRightContainer.click();
						break;
					case 68 : // 'D' key.
						arrowRightContainer.click();
						break;
				}
			}
		};
	}
}() );
