class AttachmentOriginalImage {
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
				action: 'coblocks_system_original_image',
				id: id,
			}, function( response ) {
				if ( ! response ) {
					reject();
					return;
				}

				const data = JSON.parse( response );

				if ( ! data || ! data.url ) {
					reject();
					return;
				}

				self.originalImageCache[ id ] = data.url;
				resolve( data.url );
			} );
		} );

		return self.urlsInProgress[ id ];
	}
}

export const attachmentOriginalImage = new AttachmentOriginalImage();
