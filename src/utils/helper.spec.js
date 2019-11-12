/**
 * Internal dependencies.
 */
import { overlayToClass, pickRelevantMediaFiles } from './helper';

describe( 'utils/helper', () => {
	describe( 'overlayToClass', () => {
		it( 'returns null if the ratio is equal to 0', () => {
			expect( overlayToClass( 0 ) ).toBe( null );
		} );

		it( 'returns null if the ratio is equal to 50', () => {
			expect( overlayToClass( 0 ) ).toBe( null );
		} );

		it( 'returns a css class prefixed with has-background-overlay-', () => {
			expect( overlayToClass( 25 ) ).toMatch( /^has-background-overlay-/ );
		} );

		it( 'rounds the ratio to the closest multiple of 10', () => {
			expect( overlayToClass( 20 ) ).toBe( 'has-background-overlay-20' );
			expect( overlayToClass( 24 ) ).toBe( 'has-background-overlay-20' );
			expect( overlayToClass( 25 ) ).toBe( 'has-background-overlay-30' );
		} );
	} );

	describe( 'pickRelevantMediaFiles', () => {
		it( 'returns the image alt, id, link, caption, and url', () => {
			const imageObject = {
				alt: '',
				caption: '',
				id: 123,
				link: 'http://wordpress.local/?attachment_id=123',
				mime: 'image/jpeg',
				sizes: {
					full: {
						height: 1024,
						orientation: 'landscape',
						url: 'http://wordpress.local/wp-content/uploads/2019/06/123.jpg',
						width: 1024,
					},
					thumbnail: {
						height: 150,
						orientation: 'landscape',
						url: 'http://wordpress.local/wp-content/uploads/2019/06/123-150x150.jpg',
						width: 150,
					},
				},
				subtype: 'jpeg',
				type: 'image',
				url: 'http://wordpress.local/wp-content/uploads/2019/06/123.jpg',
			};
			const imageProps = pickRelevantMediaFiles( imageObject );
			const expected = {
				alt: imageObject.alt,
				id: imageObject.id,
				link: imageObject.link,
				caption: imageObject.caption,
			};
			expect( imageProps ).toMatchObject( expected );
		} );

		it( 'returns image.url if sizes or media_details property does not exist', () => {
			const imageObject = {
				url: 'http://wordpress.local/wp-content/uploads/2019/06/123.jpg',
			};
			const imageProps = pickRelevantMediaFiles( imageObject );
			const expected = {
				url: imageObject.url,
			};
			expect( imageProps ).toMatchObject( expected );
		} );

		it( 'returns image.media_details.sizes.large.source_url if it exists', () => {
			const imageObject = {
				media_details: {
					sizes: {
						large: {
							source_url: 'http://wordpress.local/wp-content/uploads/2019/06/image_media_details_sizes_large_source_url.jpg',
						},
					},
				},
				url: 'http://wordpress.local/wp-content/uploads/2019/06/image_url.jpg',
			};
			const imageProps = pickRelevantMediaFiles( imageObject );
			const expected = {
				url: imageObject.media_details.sizes.large.source_url,
			};
			expect( imageProps ).toMatchObject( expected );
		} );
	} );

	it( 'returns image.sizes.large.url if it exists', () => {
		const imageObject = {
			sizes: {
				large: {
					url: 'http://wordpress.local/wp-content/uploads/2019/06/image_media_details_sizes_large_source_url.jpg',
				},
			},
			url: 'http://wordpress.local/wp-content/uploads/2019/06/image_url.jpg',
		};
		const imageProps = pickRelevantMediaFiles( imageObject );
		const expected = {
			url: imageObject.sizes.large.url,
		};
		expect( imageProps ).toMatchObject( expected );
	} );
} );
