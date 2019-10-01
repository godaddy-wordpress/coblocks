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

			jQuery.post( global.ajaxurl, {
				action: 'coblocks_crop_settings_original_image',
				id: id,
			}, function( response ) {
				if ( ! response.success ) {
					reject();
					return;
				}

				const data = response.data;

				if ( ! data || ! data.url ) {
					reject();
					return;
				}

				self.originalImageCache[ id ] = data.id;
				resolve( data );
			} );
		} );

		return self.urlsInProgress[ id ];
	}
}

export const originalImage = new OriginalImage();
