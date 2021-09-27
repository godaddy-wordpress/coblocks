// Disable issue: https://github.com/godaddy-wordpress/coblocks/issues/2000
// Disable note: This is a stand-alone script and may not be able to refactor.
// eslint-disable-next-line @wordpress/no-global-event-listener
document.addEventListener( 'DOMContentLoaded', function() {
	document.querySelectorAll( '.coblocks-form form' ).forEach( ( form ) => {
		const requiredErrorDiv = form.getElementsByClassName( 'required-error' )[ 0 ];

		// No required checkboxes
		if ( ! form.querySelectorAll( '.coblocks-field.checkbox.required' ).length ) {
			return;
		}

		// Form Submit Event Listener
		form.addEventListener( 'submit', ( event ) => {
			const selectedCheckboxes = form.querySelectorAll( '.coblocks-field.checkbox.required input[type="checkbox"]:checked' ).length;
			if ( selectedCheckboxes === 0 ) {
				requiredErrorDiv.style.display = 'block';
				event.preventDefault();
				return;
			}
			requiredErrorDiv.style.display = 'none';
		} );

		// Required Checkbox Event Listener
		form.querySelectorAll( '.coblocks-field.checkbox.required input[type="checkbox"]' ).forEach( ( requiredCheckbox ) => {
			requiredCheckbox.addEventListener( 'change', () => {
				requiredErrorDiv.style.display = 'none';
			} );
		} );
	} );
} );
