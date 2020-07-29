/**
 * CoBlocks Globals
 */
window.coblocksBlockData = {};
window.coblocksSettings = {};

import '../src/blocks.js';
import '../src/styles/style.scss';
import '../src/styles/editor.scss';
import { registerBlockType } from 'blockbook-api';

registerBlockType( 'coblocks/accordion' );
registerBlockType( 'coblocks/alert' );
registerBlockType( 'coblocks/author' );
registerBlockType( 'coblocks/click-to-tweet' );
registerBlockType( 'coblocks/dynamic-separator' );
registerBlockType( 'coblocks/events' );
registerBlockType( 'coblocks/features' );
registerBlockType( 'coblocks/food-and-drinks' );
registerBlockType( 'coblocks/gallery-carousel' );
registerBlockType( 'coblocks/gallery-collage' );
registerBlockType( 'coblocks/gallery-masonry' );
registerBlockType( 'coblocks/gallery-offset' );
registerBlockType( 'coblocks/gallery-stacked' );
registerBlockType( 'coblocks/gif' );
registerBlockType( 'coblocks/gist' );
registerBlockType( 'coblocks/hero' );
registerBlockType( 'coblocks/highlight' );
registerBlockType( 'coblocks/icon' );
registerBlockType( 'coblocks/logos' );
registerBlockType( 'coblocks/map' );
registerBlockType( 'coblocks/media-card' );
registerBlockType( 'coblocks/post-carousel' );
registerBlockType( 'coblocks/posts' );
registerBlockType( 'coblocks/pricing-table' );
registerBlockType( 'coblocks/row' );
registerBlockType( 'coblocks/services' );
registerBlockType( 'coblocks/shape-divider' );
registerBlockType( 'coblocks/social' );
registerBlockType( 'coblocks/social-profiles' );
