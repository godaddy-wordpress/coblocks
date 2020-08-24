import jQuery from 'jquery';

jQuery( function( $ ) {
	/**
	 * Prevent the form from being submitted when no checkbox is selected, when one is required
	 */
	$( 'body' ).on( 'click', '.coblocks-form__submit button[type="submit"]', function( e ) {
		if ( ! $( '.coblocks-field.checkbox.required' ).length ) {
			return;
		}

		var submittedForm      = $( this ).closest( 'form' );
		var selectedCheckboxes = submittedForm.find( '.coblocks-field.checkbox.required input[type="checkbox"]:checked' ).length;

		if ( selectedCheckboxes === 0 ) {
			submittedForm.find( '.required-error' ).show();
			e.preventDefault();
			return;
		}

		submittedForm.find( '.required-error' ).hide();
	} );

	/**
	 * Toggle the `.required-error` visibility when a checkbox is selected
	 */
	$( 'body' ).on( 'change', '.coblocks-field.checkbox.required input[type="checkbox"]', function() {
		$( this ).closest( '.coblocks-field.checkbox.required' ).find( '.required-error' ).hide();
	} );
} );
