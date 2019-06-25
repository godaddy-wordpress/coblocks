( function( $ ) {
	"use strict";

	$(document).ready(function() {

		observer.observe(document.body, {
			childList: true
			, subtree: true
			, attributes: false
			, characterData: false
		})
	});
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (!mutation.addedNodes) return

			for (var i = 0; i < mutation.addedNodes.length; i++) {
				// do things to your newly added nodes here
				var node = mutation.addedNodes[i];

				if (node.className === "coblocks-slick") {
					var carousel = $('.carousel-container');

					if(carousel) {
						carousel.slick();
					}
				}
			}
		})
	})
} )( jQuery );
