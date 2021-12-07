/**
 * Internal dependencies.
 */
import * as helpers from '../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

const variations = {
	images: [
		[],
		[ { url: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', id: 1, link: 'https://wordpress.com/wp-content/uploads/1234/56/image-1.jpg', alt: '', caption: 'image-1 caption' } ],
	],
	linkTo: [ undefined, 'none', 'media', 'attachment', 'custom' ],
	target: [ '', '_blank', '_self', '_parent' ],
	rel: [ '', 'alternate', 'author', 'preload' ],
	align: [ '', 'wide', 'full', 'left', 'center', 'right' ],
	gutter: [ 0, 10, 100 ],
	gutterMobile: [ 0, 10, 100 ],
	radius: [ undefined, 0, 20 ],
	shadow: [ undefined, 'none', 'sml', 'med', 'lrg', 'xlrg' ],
	filter: [ 'none', 'grayscale', 'sepia', 'saturation', 'dim', 'vintage' ],
	captions: [ undefined, true, false ],
	captionStyle: [ 'none', 'dark', 'light' ],
	captionColor: [ undefined, 'primary' ],
	customCaptionColor: [ undefined, '#123456' ],
	fontSize: [ undefined, 'small', 'large' ],
	customFontSize: [ undefined, 0, 16, '0', '16' ],
	primaryCaption: [ undefined, '', 'caption text' ],
	backgroundRadius: [ undefined, 0, 20 ],
	backgroundPadding: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	backgroundPaddingMobile: [ undefined, 'none', 'small', 'medium', 'large', 'xlarge' ],
	lightbox: [ undefined, true, false ],
	backgroundType: [ undefined, '', 'image', 'video' ],
	backgroundImg: [ undefined, '', 'https://website.com/wp-content/uploads/1234/56/image.jpg', 'https://website.com/wp-content/uploads/1234/56/video.mp4' ],
	backgroundPosition: [ undefined, '' ],
	backgroundRepeat: [ 'no-repeat', 'repeat', 'repeat-x', 'repeat-y' ],
	backgroundSize: [ 'cover', 'contain' ],
	backgroundOverlay: [ 0, 100 ],
	backgroundColor: [ undefined, 'primary' ],
	customBackgroundColor: [ '#123456' ],
	hasParallax: [ undefined, true, false ],
	focalPoint: [ undefined, { x: 0, y: 0 }, { x: 0.33663366336633666, y: 0.8335193452380952 } ],
	videoMuted: [ undefined, true, false ],
	videoLoop: [ undefined, true, false ],
	openPopover: [ undefined, true, false ],
	gridSize: [ 'none', 'sml', 'med', 'lrg', 'xlrg' ],
	height: [ undefined, 0, 400 ],
	pageDots: [ undefined, true, false ],
	prevNextButtons: [ undefined, true, false ],
	autoPlay: [ undefined, true, false ],
	autoPlaySpeed: [ undefined, 0, 1000, 3000 ],
	draggable: [ undefined, true, false ],
	alignCells: [ undefined, true, false ],
	pauseHover: [ undefined, true, false ],
	freeScroll: [ undefined, true, false ],
	thumbnails: [ undefined, true, false ],
	responsiveHeight: [ undefined, true, false ],
	className: [ undefined, '', 'random classes' ],
	noBottomMargin: [ undefined, true, false ],
	noTopMargin: [ undefined, true, false ],
	navForClass: [ undefined, '', 'has-nav-abc123'],
	loop: [ true, false, ]
};

helpers.testDeprecatedBlockVariations( name, settings, variations );
