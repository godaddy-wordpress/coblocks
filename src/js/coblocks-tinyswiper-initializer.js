// import jQuery from 'jquery';
import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

let swiper = null;
let activeIndex = 0;
let isHovering = false;

const swiperContainer = document.querySelector('.swiper-container');

const updateThumbnails = ( newIndex ) => {
  const currentActiveThumbnail = document.getElementById(`wp-block-coblocks-gallery-carousel-thumbnail-${activeIndex}`);

  if (currentActiveThumbnail ) {
      currentActiveThumbnail.classList.remove('is-active');

      const nextActiveThumbnail = document.getElementById(`wp-block-coblocks-gallery-carousel-thumbnail-${newIndex}`);
      
      nextActiveThumbnail.classList.add("is-active");
  }
};

const handleThumbnailClick = (newIndex) => {
    swiper?.slideTo( newIndex );
    updateThumbnails(newIndex);
    activeIndex = newIndex;
}

const handleSwipe = (newIndex, state) => {
  if ( newIndex !== activeIndex ) {
      updateThumbnails( newIndex );
      activeIndex = newIndex;
  }
}

( function() {
    'use strict';

    if ( swiperContainer ) {
      const swiperOptions = swiperContainer.getAttribute('data-swiper');

      if ( swiperOptions ) {
        const parsedSwiperOptions = JSON.parse( swiperOptions );

        const swiperBackButton = document.getElementById(`${parsedSwiperOptions.uuid}-prev`);
        const swiperNextButton = document.getElementById(`${parsedSwiperOptions.uuid}-next`);

        const swiperConfig = {
          loop: true,
          centeredSlides: true,
          passiveListeners: true,
          longSwipesRatio: 0.8,
          touchable: false,
          plugins: [],
          freeMode: true,
        };

        // add button navigation
        if ( parsedSwiperOptions.navigation ) {
            swiperConfig.plugins = [ ...swiperConfig.plugins, TinySwiperPluginNavigation ];

            swiperConfig.navigation = {
              prevEl: swiperBackButton,
              nextEl: swiperNextButton
            }
        }

        swiper = new TinySwiper(swiperContainer, swiperConfig);

        // register swiper resize observer
        const resizeObserver = new ResizeObserver(entries => {        
          swiper.update();
        });
        
        resizeObserver.observe(swiperContainer);

        // add thumbnail pagination
        if ( parsedSwiperOptions.thumbnails ) {
          const paginationThumbnails = document.getElementsByClassName('wp-block-coblocks-gallery-carousel-thumbnail');

          for (const [index, thumbnail] of Object.entries(paginationThumbnails)) {
            thumbnail.addEventListener('click', e => handleThumbnailClick(index))
          }

          const firstThumbnailImage = document.getElementById(`wp-block-coblocks-gallery-carousel-thumbnail-${0}`);

          firstThumbnailImage.classList.add('is-active');
        }

        // add draggable functionality
        if ( parsedSwiperOptions.draggable !== true ) {
          const swiperWrapper = document.getElementById('swiper-wrapper');

          swiperWrapper?.addEventListener('mousedown', e => {
            e.stopPropagation()
          });
        }

        // add autoplay functionality
        if ( parsedSwiperOptions.autoPlay === true  && parsedSwiperOptions.autoPlaySpeed ) {
          
          // add pause on hover functionality
          if ( parsedSwiperOptions.pauseHover === true ) {
              swiperContainer.addEventListener('mouseenter', () => {
                isHovering = true;
              });

              swiperContainer.addEventListener('mouseleave', () => {
                isHovering = false;
              });
          }  
          
          setInterval(() => {
              if ( parsedSwiperOptions.pauseHover === true  && isHovering === true) {
                return;
              }
              
              swiper?.slideTo( swiper.state.index + 1 );
            }, parsedSwiperOptions.autoPlaySpeed);
        }

        // register the swipe callback
        swiper.on('after-slide', handleSwipe);
      }
    }
}());
