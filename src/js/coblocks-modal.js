"use strict";

var coblocks_frame = false;
var coblocks_trigger = false;
var coblocks_modal = {
	init: function() {
		var self 		= this;
		self.elem 		= jQuery('.blockcoblocks-default-ui');

		self.appendModal();
		self.navClick();
		self.closeModal();
		self.createTemplate();
		self.typeSelection();
		// self.liveSearch();

		if( jQuery( '.blockcoblocks-default-ui' ).hasClass( 'coblocks-autoOpen' ) ){
			jQuery( '.split-page-title-action a' ).click();
		}
    },

	appendModal: function(e) {
		var self = this;
		if( self.elem.length > 0 ){
			self.elem.find('.selected').removeClass('details selected');
        	self.elem.appendTo('.blockcoblocks-default-ui-wrapper').hide();
		}

        coblocks_trigger = coblocks_frame = false;
	},

	navClick: function(){
		var self = this;
		jQuery( document ).on( 'click', '.blockcoblocks-default-ui .media-router a', function(e){
			e.preventDefault();
		} );
	},

	closeModal: function(){
		var self = this;

		jQuery(document).on('click', '.media-modal-close, .media-modal-backdrop, .coblocks-cancel-insertion', function(e){
        	e.preventDefault();
        	self.appendModal();
        });
        jQuery(document).on('keydown', function(e){
            if ( 27 == e.keyCode && coblocks_frame ) {
                self.appendModal(e);
            }
        });
	},

	createTemplate: function(){
		var self 	= this;
		jQuery(document).on('click', '.wp-admin.edit-php.post-type-coblocks .split-page-title-action a, #wp-admin-bar-new-coblocks a, .coblocks-saver, .coblocks-dashboard-widget__create .button', function(e){
			e.preventDefault();

			if( jQuery(this).hasClass('coblocks-saver') ){
				e.stopImmediatePropagation();
			}
			
			if( !jQuery(this).hasClass('disabled') ){
				// display modal
		        coblocks_frame = true;

				//hide media modal unnecessary elements
				self.elem.find( '.coblocks-predesigned, .coblocks-templates, .coblocks-theme, .media-router a, .coblocks-spinner' ).hide();
				self.elem.find( '.coblocks-new, .coblocks-create, .media-sidebar, .coblocks-meta-sidebar' ).show();
				self.elem.find( '.media-frame-title h1' ).text( CoBlocksVars.create );
				self.elem.addClass( 'creating-blocktemplate' );

				//if saving as template
				if( jQuery( this ).hasClass( 'coblocks-saver' ) ){
					jQuery( '.coblocks-creation [name="coblocks_action"]' ).val( 'save_template' );
				}else{
					jQuery( '.coblocks-creation [name="coblocks_action"]' ).val( 'create_template' );
				}
				
				self.elem.appendTo('body').show();
			}

		});

		//on form submit
		self.submitCreation();
	},

	submitCreation: function(){
		var self = this;
		var valid = true;
		jQuery(document).on( 'submit', '.coblocks-creation', function(e){
			e.preventDefault();

			if( self.elem.find('.coblocks-create .button-primary').hasClass( 'disabled' ) ){
				return false;
			}

			jQuery(this).find( '.blocktemplate-required' ).each(function () {
		        if ( jQuery(this).val() === '' ){
		        	valid = false;
		            jQuery(this).css({ border : '1px solid red' });
		            return false;
		        }else{
		        	valid = true;
		        }
		    });

		    if( valid ){
		    	jQuery( this ).find('.button').val( CoBlocksVars.creating ).attr('disabled','disabled');

		    	var postData = {
	        		'action'	: 'coblocks_ajax_inserter',
					'nonce'		:  CoBlocksVars.nonce,
					'method'	: jQuery( '.coblocks-creation [name="coblocks_action"]' ).val(),
					'formdata' 	: jQuery( this ).serialize()
				};

				jQuery.post( ajaxurl, postData )
				.always(function( a, status, b ) {
					a = jQuery.parseJSON( a );
					// console.log(a.raw_html);
					if ( 'undefined' !== a.response ) {
						if( typeof a.redirect != 'undefined' ){
							window.location.href = a.redirect;
						}else if( typeof a.templateid !== 'undefined' ){
							self.elem.find( '.coblocks-creation' ).hide();
							jQuery( '<span class="coblocks-saved">'+ CoBlocksVars.saved +'</span>' ).insertAfter('.coblocks-creation');
						}
					}
				});
		    }

			return false;
		});
	},

	typeSelection: function(){
		var self = this;
		self.elem.find( '#blocktemplate-type' ).on( 'change',function(){
			switch( jQuery( this ).val() ){
				case 'section':
					jQuery( 'label[for="blocktemplate-name"]' ).text( CoBlocksVars.name_section );
					jQuery( '.coblocks-creation .button-primary' ).val( CoBlocksVars.create_section );
				break;
				default:
					jQuery( 'label[for="blocktemplate-name"]' ).text( CoBlocksVars.name_template );
					jQuery( '.coblocks-creation .button-primary' ).val( CoBlocksVars.create_template );
				break;
			}
		});
	},

    search_filter: function( el, val ){
		return jQuery(el).text().toUpperCase().indexOf(val.toUpperCase()) >= 0;
	},

    liveSearch: function(){
		var self = this;
		jQuery(document).on('keyup change', '.blockcoblocks-modal-component .blockcoblocks__modal-controls--search, .blockcoblocks-modal-component .blockcoblocks__modal-controls--category select', function(){
			var s 		= jQuery( this ).val();
			var el 		= jQuery( this ).closest('.components-tab-panel__tab-content').find( 'ul li' );
			var results = el.filter(function(){
				return self.search_filter( this, s );
			});
			var not_res = el.not( results );
			results.show();
			not_res.hide();
		});
	},
}

jQuery(document).ready(function() {
	coblocks_modal.init();
});