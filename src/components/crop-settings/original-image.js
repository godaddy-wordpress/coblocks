/* global coblocksBlockData */

class OriginalImage {
	constructor() {
		this.originalImageCache = {};
		this.urlsInProgress = {};
	}

	get( id ) {
		const self = this;

		if ( self.urlsInProgress[ id ] ) {
			return self.urlsInProgress[ id ];
		}

		self.urlsInProgress[ id ] = new Promise( ( resolve, reject ) => {
			if ( self.originalImageCache[ id ] ) {
				resolve( self.originalImageCache[ id ] );
				return;
			}

			fetch( global.ajaxurl,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
					body: [ `action=${ 'coblocks_crop_settings_original_image' }`, `nonce=${ coblocksBlockData.cropSettingsOriginalImageNonce }`, `id=${ id }` ].join( '&' ),
				}
			)
				.then( ( response ) => {
					return response.json();
				} )
				.then( ( response ) => {
					const data = response.data;

					if ( ! data || ! data.url ) {
						reject();
						return;
					}

					self.originalImageCache[ id ] = data.id;
					resolve( data );
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );

		return self.urlsInProgress[ id ];
	}
}

export const originalImage = new OriginalImage();
