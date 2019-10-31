/* eslint-disable no-mixed-operators */
/*!
 * Flickity PACKAGED v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
	// universal module definition
	/*jshint strict: false */ /* globals define, module, require */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'jquery-bridget/jquery-bridget', [ 'jquery' ], function( jQuery ) {
			return factory( window, jQuery );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'jquery' )
		);
	} else {
		// browser global
		window.jQueryBridget = factory(
			window,
			window.jQuery
		);
	}
}( window, function factory( window, jQuery ) {
	'use strict';

	// ----- utils ----- //

	const arraySlice = Array.prototype.slice;

	// helper function for logging errors
	// $.error breaks jQuery chaining
	const console = window.console;
	const logError = typeof console === 'undefined' ? function() { } :
		function( message ) {
			console.error( message );
		};

	// ----- jQueryBridget ----- //

	function jQueryBridget( namespace, PluginClass, $ ) {
		$ = $ || jQuery || window.jQuery;
		if ( ! $ ) {
			return;
		}

		// add option method -> $().plugin('option', {...})
		if ( ! PluginClass.prototype.option ) {
			// option setter
			PluginClass.prototype.option = function( opts ) {
				// bail out if not an object
				if ( ! $.isPlainObject( opts ) ) {
					return;
				}
				this.options = $.extend( true, this.options, opts );
			};
		}

		// make jQuery plugin
		$.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
			if ( typeof arg0 === 'string' ) {
				// method call $().plugin( 'methodName', { options } )
				// shift arguments by 1
				const args = arraySlice.call( arguments, 1 );
				return methodCall( this, arg0, args );
			}
			// just $().plugin({ options })
			plainCall( this, arg0 );
			return this;
		};

		// $().plugin('methodName')
		function methodCall( $elems, methodName, args ) {
			let returnValue;
			const pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

			$elems.each( function( i, elem ) {
				// get instance
				const instance = $.data( elem, namespace );
				if ( ! instance ) {
					logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
                        pluginMethodStr );
					return;
				}

				const method = instance[ methodName ];
				if ( ! method || methodName.charAt( 0 ) === '_' ) {
					logError( pluginMethodStr + ' is not a valid method' );
					return;
				}

				// apply method, get return value
				const value = method.apply( instance, args );
				// set return value if value is returned, use only first value
				returnValue = returnValue === undefined ? value : returnValue;
			} );

			return returnValue !== undefined ? returnValue : $elems;
		}

		function plainCall( $elems, options ) {
			$elems.each( function( i, elem ) {
				let instance = $.data( elem, namespace );
				if ( instance ) {
					// set options & init
					instance.option( options );
					instance._init();
				} else {
					// initialize new instance
					instance = new PluginClass( elem, options );
					$.data( elem, namespace, instance );
				}
			} );
		}

		updateJQuery( $ );
	}

	// ----- updateJQuery ----- //

	// set $.bridget for v1 backwards compatibility
	function updateJQuery( $ ) {
		if ( ! $ || ( $ && $.bridget ) ) {
			return;
		}
		$.bridget = jQueryBridget;
	}

	updateJQuery( jQuery || window.jQuery );

	// -----  ----- //

	return jQueryBridget;
} ) );

/**
   * EvEmitter v1.1.0
   * Lil' event emitter
   * MIT License
   */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
	// universal module definition
	/* jshint strict: false */ /* globals define, module, window */
	if ( typeof define === 'function' && define.amd ) {
		// AMD - RequireJS
		define( 'ev-emitter/ev-emitter', factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS - Browserify, Webpack
		module.exports = factory();
	} else {
		// Browser globals
		global.EvEmitter = factory();
	}
}( typeof window !== 'undefined' ? window : this, function() {
	function EvEmitter() { }

	const proto = EvEmitter.prototype;

	proto.on = function( eventName, listener ) {
		if ( ! eventName || ! listener ) {
			return;
		}
		// set events hash
		const events = this._events = this._events || {};
		// set listeners array
		const listeners = events[ eventName ] = events[ eventName ] || [];
		// only add once
		if ( listeners.indexOf( listener ) === -1 ) {
			listeners.push( listener );
		}

		return this;
	};

	proto.once = function( eventName, listener ) {
		if ( ! eventName || ! listener ) {
			return;
		}
		// add event
		this.on( eventName, listener );
		// set once flag
		// set onceEvents hash
		const onceEvents = this._onceEvents = this._onceEvents || {};
		// set onceListeners object
		const onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
		// set flag
		onceListeners[ listener ] = true;

		return this;
	};

	proto.off = function( eventName, listener ) {
		const listeners = this._events && this._events[ eventName ];
		if ( ! listeners || ! listeners.length ) {
			return;
		}
		const index = listeners.indexOf( listener );
		if ( index !== -1 ) {
			listeners.splice( index, 1 );
		}

		return this;
	};

	proto.emitEvent = function( eventName, args ) {
		let listeners = this._events && this._events[ eventName ];
		if ( ! listeners || ! listeners.length ) {
			return;
		}
		// copy over to avoid interference if .off() in listener
		listeners = listeners.slice( 0 );
		args = args || [];
		// once stuff
		const onceListeners = this._onceEvents && this._onceEvents[ eventName ];

		for ( let i = 0; i < listeners.length; i++ ) {
			const listener = listeners[ i ];
			const isOnce = onceListeners && onceListeners[ listener ];
			if ( isOnce ) {
				// remove listener
				// remove before trigger to prevent recursion
				this.off( eventName, listener );
				// unset once flag
				delete onceListeners[ listener ];
			}
			// trigger listener
			listener.apply( this, args );
		}

		return this;
	};

	proto.allOff = function() {
		delete this._events;
		delete this._onceEvents;
	};

	return EvEmitter;
} ) );

/*!
   * getSize v2.0.3
   * measure size of elements
   * MIT license
   */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
	/* jshint strict: false */ /* globals define, module */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'get-size/get-size', factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory();
	} else {
		// browser global
		window.getSize = factory();
	}
}( window, function factory() {
	'use strict';

	// -------------------------- helpers -------------------------- //

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
		const num = parseFloat( value );
		// not a percent like '100%', and a number
		const isValid = value.indexOf( '%' ) === -1 && ! isNaN( num );
		return isValid && num;
	}

	function noop() { }

	const logError = typeof console === 'undefined' ? noop :
		function( message ) {
			// eslint-disable-next-line no-console
			console.error( message );
		};

	// -------------------------- measurements -------------------------- //

	const measurements = [
		'paddingLeft',
		'paddingRight',
		'paddingTop',
		'paddingBottom',
		'marginLeft',
		'marginRight',
		'marginTop',
		'marginBottom',
		'borderLeftWidth',
		'borderRightWidth',
		'borderTopWidth',
		'borderBottomWidth',
	];

	const measurementsLength = measurements.length;

	function getZeroSize() {
		const size = {
			width: 0,
			height: 0,
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0,
		};
		for ( let i = 0; i < measurementsLength; i++ ) {
			const measurement = measurements[ i ];
			size[ measurement ] = 0;
		}
		return size;
	}

	// -------------------------- getStyle -------------------------- //
	function getStyle( elem ) {
		// eslint-disable-next-line no-undef
		const style = getComputedStyle( elem );
		if ( ! style ) {
			logError( 'Style returned ' + style +
                '. Are you running this code in a hidden iframe on Firefox? ' +
                'See https://bit.ly/getsizebug1' );
		}
		return style;
	}

	// -------------------------- setup -------------------------- //

	let isSetup = false;

	let isBoxSizeOuter;

	/**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */
	function setup() {
		// setup once
		if ( isSetup ) {
			return;
		}
		isSetup = true;

		// -------------------------- box sizing -------------------------- //

		/**
     * Chrome & Safari measure the outer-width on style.width on border-box elems
     * IE11 & Firefox<29 measures the inner-width
     */
		const div = document.createElement( 'div' );
		div.style.width = '200px';
		div.style.padding = '1px 2px 3px 4px';
		div.style.borderStyle = 'solid';
		div.style.borderWidth = '1px 2px 3px 4px';
		div.style.boxSizing = 'border-box';

		const body = document.body || document.documentElement;
		body.appendChild( div );
		const style = getStyle( div );
		// round value for browser zoom. desandro/masonry#928
		isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) === 200;
		getSize.isBoxSizeOuter = isBoxSizeOuter;

		body.removeChild( div );
	}

	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
		setup();

		// use querySeletor if elem is string
		if ( typeof elem === 'string' ) {
			elem = document.querySelector( elem );
		}

		// do not proceed on non-objects
		if ( ! elem || typeof elem !== 'object' || ! elem.nodeType ) {
			return;
		}

		const style = getStyle( elem );

		// if hidden, everything is 0
		if ( style.display === 'none' ) {
			return getZeroSize();
		}

		const size = {};
		size.width = elem.offsetWidth;
		size.height = elem.offsetHeight;

		const isBorderBox = size.isBorderBox = style.boxSizing === 'border-box';

		// get all measurements
		for ( let i = 0; i < measurementsLength; i++ ) {
			const measurement = measurements[ i ];
			const value = style[ measurement ];
			const num = parseFloat( value );
			// any 'auto', 'medium' value will be 0
			size[ measurement ] = ! isNaN( num ) ? num : 0;
		}

		const paddingWidth = size.paddingLeft + size.paddingRight;
		const paddingHeight = size.paddingTop + size.paddingBottom;
		const marginWidth = size.marginLeft + size.marginRight;
		const marginHeight = size.marginTop + size.marginBottom;
		const borderWidth = size.borderLeftWidth + size.borderRightWidth;
		const borderHeight = size.borderTopWidth + size.borderBottomWidth;

		const isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

		// overwrite width and height if we can get it from style
		const styleWidth = getStyleSize( style.width );
		if ( styleWidth !== false ) {
			size.width = styleWidth +
                // add padding and border unless it's already including it
                ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
		}

		const styleHeight = getStyleSize( style.height );
		if ( styleHeight !== false ) {
			size.height = styleHeight +
                // add padding and border unless it's already including it
                ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
		}

		size.innerWidth = size.width - ( paddingWidth + borderWidth );
		size.innerHeight = size.height - ( paddingHeight + borderHeight );

		size.outerWidth = size.width + marginWidth;
		size.outerHeight = size.height + marginHeight;

		return size;
	}

	return getSize;
} ) );

/**
   * matchesSelector v2.0.2
   * matchesSelector( element, '.selector' )
   * MIT license
   */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
	/*global define: false, module: false */
	'use strict';
	// universal module definition
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'desandro-matches-selector/matches-selector', factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory();
	} else {
		// browser global
		window.matchesSelector = factory();
	}
}( window, function factory() {
	'use strict';

	const matchesMethod = ( function() {
		const ElemProto = window.Element.prototype;
		// check for the standard method name first
		if ( ElemProto.matches ) {
			return 'matches';
		}
		// check un-prefixed
		if ( ElemProto.matchesSelector ) {
			return 'matchesSelector';
		}
		// check vendor prefixes
		const prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

		for ( let i = 0; i < prefixes.length; i++ ) {
			const prefix = prefixes[ i ];
			const method = prefix + 'MatchesSelector';
			if ( ElemProto[ method ] ) {
				return method;
			}
		}
	}() );

	return function matchesSelector( elem, selector ) {
		return elem[ matchesMethod ]( selector );
	};
} ) );

/**
   * Fizzy UI utils v2.0.7
   * MIT license
   */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
	// universal module definition
	/*jshint strict: false */ /*globals define, module, require */

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'fizzy-ui-utils/utils', [
			'desandro-matches-selector/matches-selector',
		], function( matchesSelector ) {
			return factory( window, matchesSelector );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'desandro-matches-selector' )
		);
	} else {
		// browser global
		window.fizzyUIUtils = factory(
			window,
			window.matchesSelector
		);
	}
}( window, function factory( window, matchesSelector ) {
	const utils = {};

	// ----- extend ----- //

	// extends objects
	utils.extend = function( a, b ) {
		for ( const prop in b ) {
			a[ prop ] = b[ prop ];
		}
		return a;
	};

	// ----- modulo ----- //

	utils.modulo = function( num, div ) {
		return ( ( num % div ) + div ) % div;
	};

	// ----- makeArray ----- //

	const arraySlice = Array.prototype.slice;

	// turn element or nodeList into an array
	utils.makeArray = function( obj ) {
		if ( Array.isArray( obj ) ) {
			// use object if already an array
			return obj;
		}
		// return empty array if undefined or null. #6
		if ( obj === null || obj === undefined ) {
			return [];
		}

		const isArrayLike = typeof obj === 'object' && typeof obj.length === 'number';
		if ( isArrayLike ) {
			// convert nodeList to array
			return arraySlice.call( obj );
		}

		// array of single index
		return [ obj ];
	};

	// ----- removeFrom ----- //

	utils.removeFrom = function( ary, obj ) {
		const index = ary.indexOf( obj );
		if ( index !== -1 ) {
			ary.splice( index, 1 );
		}
	};

	// ----- getParent ----- //

	utils.getParent = function( elem, selector ) {
		while ( elem.parentNode && elem !== document.body ) {
			elem = elem.parentNode;
			if ( matchesSelector( elem, selector ) ) {
				return elem;
			}
		}
	};

	// ----- getQueryElement ----- //

	// use element as selector string
	utils.getQueryElement = function( elem ) {
		if ( typeof elem === 'string' ) {
			return document.querySelector( elem );
		}
		return elem;
	};

	// ----- handleEvent ----- //

	// enable .ontype to trigger from .addEventListener( elem, 'type' )
	utils.handleEvent = function( event ) {
		const method = 'on' + event.type;
		if ( this[ method ] ) {
			this[ method ]( event );
		}
	};

	// ----- filterFindElements ----- //

	utils.filterFindElements = function( elems, selector ) {
		// make array of elems
		elems = utils.makeArray( elems );
		const ffElems = [];

		elems.forEach( function( elem ) {
			// check that elem is an actual element
			// eslint-disable-next-line no-undef
			if ( ! ( elem instanceof HTMLElement ) ) {
				return;
			}
			// add elem if no selector
			if ( ! selector ) {
				ffElems.push( elem );
				return;
			}
			// filter & find items if we have a selector
			// filter
			if ( matchesSelector( elem, selector ) ) {
				ffElems.push( elem );
			}
			// find children
			const childElems = elem.querySelectorAll( selector );
			// concat childElems to filterFound array
			for ( let i = 0; i < childElems.length; i++ ) {
				ffElems.push( childElems[ i ] );
			}
		} );

		return ffElems;
	};

	// ----- debounceMethod ----- //

	utils.debounceMethod = function( _class, methodName, threshold ) {
		threshold = threshold || 100;
		// original method
		const method = _class.prototype[ methodName ];
		const timeoutName = methodName + 'Timeout';

		_class.prototype[ methodName ] = function() {
			const timeout = this[ timeoutName ];
			clearTimeout( timeout );

			const args = arguments;
			const _this = this;
			this[ timeoutName ] = setTimeout( function() {
				method.apply( _this, args );
				delete _this[ timeoutName ];
			}, threshold );
		};
	};

	// ----- docReady ----- //

	utils.docReady = function( callback ) {
		const readyState = document.readyState;
		if ( readyState === 'complete' || readyState === 'interactive' ) {
			// do async to allow for other scripts to run. metafizzy/flickity#441
			setTimeout( callback );
		} else {
			document.addEventListener( 'DOMContentLoaded', callback );
		}
	};

	// ----- htmlInit ----- //

	// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	utils.toDashed = function( str ) {
		return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
			return $1 + '-' + $2;
		} ).toLowerCase();
	};

	const console = window.console;

	utils.htmlInit = function( WidgetClass, namespace ) {
		utils.docReady( function() {
			const dashedNamespace = utils.toDashed( namespace );
			const dataAttr = 'data-' + dashedNamespace;
			const dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
			const jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
			const elems = utils.makeArray( dataAttrElems )
				.concat( utils.makeArray( jsDashElems ) );
			const dataOptionsAttr = dataAttr + '-options';
			const jQuery = window.jQuery;

			elems.forEach( function( elem ) {
				const attr = elem.getAttribute( dataAttr ) ||
                    elem.getAttribute( dataOptionsAttr );
				let options;
				try {
					options = attr && JSON.parse( attr );
				} catch ( error ) {
					// log error, do not initialize
					if ( console ) {
						console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
                            ': ' + error );
					}
					return;
				}
				// initialize
				const instance = new WidgetClass( elem, options );
				// make available via $().data('namespace')
				if ( jQuery ) {
					jQuery.data( elem, namespace, instance );
				}
			} );
		} );
	};

	// -----  ----- //

	return utils;
} ) );

// Flickity.Cell
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/cell', [
			'get-size/get-size',
		], function( getSize ) {
			return factory( window, getSize );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'get-size' )
		);
	} else {
		// browser global
		window.Flickity = window.Flickity || {};
		window.Flickity.Cell = factory(
			window,
			window.getSize
		);
	}
}( window, function factory( window, getSize ) {
	function Cell( elem, parent ) {
		this.element = elem;
		this.parent = parent;

		this.create();
	}

	const proto = Cell.prototype;

	proto.create = function() {
		this.element.style.position = 'absolute';
		this.element.setAttribute( 'aria-hidden', 'true' );
		this.x = 0;
		this.shift = 0;
	};

	proto.destroy = function() {
		// reset style
		this.unselect();
		this.element.style.position = '';
		const side = this.parent.originSide;
		this.element.style[ side ] = '';
	};

	proto.getSize = function() {
		this.size = getSize( this.element );
	};

	proto.setPosition = function( x ) {
		this.x = x;
		this.updateTarget();
		this.renderPosition( x );
	};

	// setDefaultTarget v1 method, backwards compatibility, remove in v3
	proto.updateTarget = proto.setDefaultTarget = function() {
		const marginProperty = this.parent.originSide === 'left' ? 'marginLeft' : 'marginRight';
		this.target = this.x + this.size[ marginProperty ] +
            this.size.width * this.parent.cellAlign;
	};

	proto.renderPosition = function( x ) {
		// render position of cell with in slider
		const side = this.parent.originSide;
		this.element.style[ side ] = this.parent.getPositionValue( x );
	};

	proto.select = function() {
		this.element.classList.add( 'is-selected' );
		this.element.removeAttribute( 'aria-hidden' );
	};

	proto.unselect = function() {
		this.element.classList.remove( 'is-selected' );
		this.element.setAttribute( 'aria-hidden', 'true' );
	};

	proto.wrapShift = function( shift ) {
		this.shift = shift;
		this.renderPosition( this.x + this.parent.slideableWidth * shift );
	};

	proto.remove = function() {
		this.element.parentNode.removeChild( this.element );
	};

	return Cell;
} ) );

// slide
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/slide', factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory();
	} else {
		// browser global
		window.Flickity = window.Flickity || {};
		window.Flickity.Slide = factory();
	}
}( window, function factory() {
	'use strict';

	function Slide( parent ) {
		this.parent = parent;
		this.isOriginLeft = parent.originSide === 'left';
		this.cells = [];
		this.outerWidth = 0;
		this.height = 0;
	}

	const proto = Slide.prototype;

	proto.addCell = function( cell ) {
		this.cells.push( cell );
		this.outerWidth += cell.size.outerWidth;
		this.height = Math.max( cell.size.outerHeight, this.height );
		// first cell stuff
		if ( this.cells.length === 1 ) {
			this.x = cell.x; // x comes from first cell
			const beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
			this.firstMargin = cell.size[ beginMargin ];
		}
	};

	proto.updateTarget = function() {
		const endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
		const lastCell = this.getLastCell();
		const lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
		const slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
		this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
	};

	proto.getLastCell = function() {
		return this.cells[ this.cells.length - 1 ];
	};

	proto.select = function() {
		this.cells.forEach( function( cell ) {
			cell.select();
		} );
	};

	proto.unselect = function() {
		this.cells.forEach( function( cell ) {
			cell.unselect();
		} );
	};

	proto.getCellElements = function() {
		return this.cells.map( function( cell ) {
			return cell.element;
		} );
	};

	return Slide;
} ) );

// animate
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/animate', [
			'fizzy-ui-utils/utils',
		], function( utils ) {
			return factory( window, utils );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		window.Flickity = window.Flickity || {};
		window.Flickity.animatePrototype = factory(
			window,
			window.fizzyUIUtils
		);
	}
}( window, function factory( window, utils ) {
	// -------------------------- animate -------------------------- //

	const proto = {};

	proto.startAnimation = function() {
		if ( this.isAnimating ) {
			return;
		}

		this.isAnimating = true;
		this.restingFrames = 0;
		this.animate();
	};

	proto.animate = function() {
		this.applyDragForce();
		this.applySelectedAttraction();

		const previousX = this.x;

		this.integratePhysics();
		this.positionSlider();
		this.settle( previousX );
		// animate next frame
		if ( this.isAnimating ) {
			const _this = this;
			// eslint-disable-next-line no-undef
			requestAnimationFrame( function animateFrame() {
				_this.animate();
			} );
		}
	};

	proto.positionSlider = function() {
		let x = this.x;
		// wrap position around
		if ( this.options.wrapAround && this.cells.length > 1 ) {
			x = utils.modulo( x, this.slideableWidth );
			x = x - this.slideableWidth;
			this.shiftWrapCells( x );
		}

		this.setTranslateX( x, this.isAnimating );
		this.dispatchScrollEvent();
	};

	proto.setTranslateX = function( x, is3d ) {
		x += this.cursorPosition;
		// reverse if right-to-left and using transform
		x = this.options.rightToLeft ? -x : x;
		const translateX = this.getPositionValue( x );
		// use 3D tranforms for hardware acceleration on iOS
		// but use 2D when settled, for better font-rendering
		this.slider.style.transform = is3d ?
			'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
	};

	proto.dispatchScrollEvent = function() {
		const firstSlide = this.slides[ 0 ];
		if ( ! firstSlide ) {
			return;
		}
		const positionX = -this.x - firstSlide.target;
		const progress = positionX / this.slidesWidth;
		this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
	};

	proto.positionSliderAtSelected = function() {
		if ( ! this.cells.length ) {
			return;
		}
		this.x = -this.selectedSlide.target;
		this.velocity = 0; // stop wobble
		this.positionSlider();
	};

	proto.getPositionValue = function( position ) {
		if ( this.options.percentPosition ) {
			// percent position, round to 2 digits, like 12.34%
			return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 ) + '%';
		}
		// pixel positioning
		return Math.round( position ) + 'px';
	};

	proto.settle = function( previousX ) {
		// keep track of frames where x hasn't moved
		if ( ! this.isPointerDown && Math.round( this.x * 100 ) === Math.round( previousX * 100 ) ) {
			this.restingFrames++;
		}
		// stop animating if resting for 3 or more frames
		if ( this.restingFrames > 2 ) {
			this.isAnimating = false;
			delete this.isFreeScrolling;
			// render position with translateX when settled
			this.positionSlider();
			this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
		}
	};

	proto.shiftWrapCells = function( x ) {
		// shift before cells
		const beforeGap = this.cursorPosition + x;
		this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
		// shift after cells
		const afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
		this._shiftCells( this.afterShiftCells, afterGap, 1 );
	};

	proto._shiftCells = function( cells, gap, shift ) {
		for ( let i = 0; i < cells.length; i++ ) {
			const cell = cells[ i ];
			const cellShift = gap > 0 ? shift : 0;
			cell.wrapShift( cellShift );
			gap -= cell.size.outerWidth;
		}
	};

	proto._unshiftCells = function( cells ) {
		if ( ! cells || ! cells.length ) {
			return;
		}
		for ( let i = 0; i < cells.length; i++ ) {
			cells[ i ].wrapShift( 0 );
		}
	};

	// -------------------------- physics -------------------------- //

	proto.integratePhysics = function() {
		this.x += this.velocity;
		this.velocity *= this.getFrictionFactor();
	};

	proto.applyForce = function( force ) {
		this.velocity += force;
	};

	proto.getFrictionFactor = function() {
		return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
	};

	proto.getRestingPosition = function() {
		// my thanks to Steven Wittens, who simplified this math greatly
		return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
	};

	proto.applyDragForce = function() {
		if ( ! this.isDraggable || ! this.isPointerDown ) {
			return;
		}
		// change the position to drag position by applying force
		const dragVelocity = this.dragX - this.x;
		const dragForce = dragVelocity - this.velocity;
		this.applyForce( dragForce );
	};

	proto.applySelectedAttraction = function() {
		// do not attract if pointer down or no slides
		const dragDown = this.isDraggable && this.isPointerDown;
		if ( dragDown || this.isFreeScrolling || ! this.slides.length ) {
			return;
		}
		const distance = this.selectedSlide.target * -1 - this.x;
		const force = distance * this.options.selectedAttraction;
		this.applyForce( force );
	};

	return proto;
} ) );

// Flickity main
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/flickity', [
			'ev-emitter/ev-emitter',
			'get-size/get-size',
			'fizzy-ui-utils/utils',
			'./cell',
			'./slide',
			'./animate',
		], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
			return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'ev-emitter' ),
			require( 'get-size' ),
			require( 'fizzy-ui-utils' ),
			require( './cell' ),
			require( './slide' ),
			require( './animate' )
		);
	} else {
		// browser global
		const _Flickity = window.Flickity;

		window.Flickity = factory(
			window,
			window.EvEmitter,
			window.getSize,
			window.fizzyUIUtils,
			_Flickity.Cell,
			_Flickity.Slide,
			_Flickity.animatePrototype
		);
	}
}( window, function factory( window, EvEmitter, getSize,
	utils, Cell, Slide, animatePrototype ) {
	// vars
	let jQuery = window.jQuery;
	const getComputedStyle = window.getComputedStyle;
	const console = window.console;

	function moveElements( elems, toElem ) {
		elems = utils.makeArray( elems );
		while ( elems.length ) {
			toElem.appendChild( elems.shift() );
		}
	}

	// -------------------------- Flickity -------------------------- //

	// globally unique identifiers
	let GUID = 0;
	// internal store of all Flickity intances
	const instances = {};

	function Flickity( element, options ) {
		const queryElement = utils.getQueryElement( element );
		if ( ! queryElement ) {
			if ( console ) {
				console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
			}
			return;
		}
		this.element = queryElement;
		// do not initialize twice on same element
		if ( this.element.flickityGUID ) {
			const instance = instances[ this.element.flickityGUID ];
			instance.option( options );
			return instance;
		}

		// add jQuery
		if ( jQuery ) {
			this.$element = jQuery( this.element );
		}
		// options
		this.options = utils.extend( {}, this.constructor.defaults );
		this.option( options );

		// kick things off
		this._create();
	}

	Flickity.defaults = {
		accessibility: true,
		// adaptiveHeight: false,
		cellAlign: 'center',
		// cellSelector: undefined,
		// contain: false,
		freeScrollFriction: 0.075, // friction when free-scrolling
		friction: 0.28, // friction when selecting
		namespaceJQueryEvents: true,
		// initialIndex: 0,
		percentPosition: true,
		resize: true,
		selectedAttraction: 0.025,
		setGallerySize: true,
		// watchCSS: false,
		// wrapAround: false
	};

	// hash of methods triggered on _create()
	Flickity.createMethods = [];

	const proto = Flickity.prototype;
	// inherit EventEmitter
	utils.extend( proto, EvEmitter.prototype );

	proto._create = function() {
		// add id for Flickity.data
		const id = this.guid = ++GUID;
		this.element.flickityGUID = id; // expando
		instances[ id ] = this; // associate via id
		// initial properties
		this.selectedIndex = 0;
		// how many frames slider has been in same position
		this.restingFrames = 0;
		// initial physics properties
		this.x = 0;
		this.velocity = 0;
		this.originSide = this.options.rightToLeft ? 'right' : 'left';
		// create viewport & slider
		this.viewport = document.createElement( 'div' );
		this.viewport.className = 'flickity-viewport';
		this._createSlider();

		if ( this.options.resize || this.options.watchCSS ) {
			window.addEventListener( 'resize', this );
		}

		// add listeners from on option
		for ( const eventName in this.options.on ) {
			const listener = this.options.on[ eventName ];
			this.on( eventName, listener );
		}

		Flickity.createMethods.forEach( function( method ) {
			this[ method ]();
		}, this );

		if ( this.options.watchCSS ) {
			this.watchCSS();
		} else {
			this.activate();
		}
	};

	proto.option = function( opts ) {
		utils.extend( this.options, opts );
	};

	proto.activate = function() {
		if ( this.isActive ) {
			return;
		}
		this.isActive = true;
		this.element.classList.add( 'flickity-enabled' );
		if ( this.options.rightToLeft ) {
			this.element.classList.add( 'flickity-rtl' );
		}

		this.getSize();
		// move initial cell elements so they can be loaded as cells
		const cellElems = this._filterFindCellElements( this.element.children );
		moveElements( cellElems, this.slider );
		this.viewport.appendChild( this.slider );
		this.element.appendChild( this.viewport );
		// get cells from children
		this.reloadCells();

		if ( this.options.accessibility ) {
			// allow element to focusable
			this.element.tabIndex = 0;
			// listen for key presses
			this.element.addEventListener( 'keydown', this );
		}

		this.emitEvent( 'activate' );
		this.selectInitialIndex();
		// flag for initial activation, for using initialIndex
		this.isInitActivated = true;
		// ready event. #493
		this.dispatchEvent( 'ready' );
	};

	// slider positions the cells
	proto._createSlider = function() {
		// slider element does all the positioning
		const slider = document.createElement( 'div' );
		slider.className = 'flickity-slider';
		slider.style[ this.originSide ] = 0;
		this.slider = slider;
	};

	proto._filterFindCellElements = function( elems ) {
		return utils.filterFindElements( elems, this.options.cellSelector );
	};

	// goes through all children
	proto.reloadCells = function() {
		// collection of item elements
		this.cells = this._makeCells( this.slider.children );
		this.positionCells();
		this._getWrapShiftCells();
		this.setGallerySize();
	};

	proto._makeCells = function( elems ) {
		const cellElems = this._filterFindCellElements( elems );

		// create new Flickity for collection
		const cells = cellElems.map( function( cellElem ) {
			return new Cell( cellElem, this );
		}, this );

		return cells;
	};

	proto.getLastCell = function() {
		return this.cells[ this.cells.length - 1 ];
	};

	proto.getLastSlide = function() {
		return this.slides[ this.slides.length - 1 ];
	};

	// positions all cells
	proto.positionCells = function() {
		// size all cells
		this._sizeCells( this.cells );
		// position all cells
		this._positionCells( 0 );
	};

	proto._positionCells = function( index ) {
		index = index || 0;
		// also measure maxCellHeight
		// start 0 if positioning all cells
		this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
		let cellX = 0;
		// get cellX
		if ( index > 0 ) {
			const startCell = this.cells[ index - 1 ];
			cellX = startCell.x + startCell.size.outerWidth;
		}
		const len = this.cells.length;
		for ( let i = index; i < len; i++ ) {
			const cell = this.cells[ i ];
			cell.setPosition( cellX );
			cellX += cell.size.outerWidth;
			this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
		}
		// keep track of cellX for wrap-around
		this.slideableWidth = cellX;
		// slides
		this.updateSlides();
		// contain slides target
		this._containSlides();
		// update slidesWidth
		this.slidesWidth = len ? this.getLastSlide().target - this.slides[ 0 ].target : 0;
	};

	proto._sizeCells = function( cells ) {
		cells.forEach( function( cell ) {
			cell.getSize();
		} );
	};

	// --------------------------  -------------------------- //

	proto.updateSlides = function() {
		this.slides = [];
		if ( ! this.cells.length ) {
			return;
		}

		let slide = new Slide( this );
		this.slides.push( slide );
		const isOriginLeft = this.originSide === 'left';
		const nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

		const canCellFit = this._getCanCellFit();

		this.cells.forEach( function( cell, i ) {
			// just add cell if first cell in slide
			if ( ! slide.cells.length ) {
				slide.addCell( cell );
				return;
			}

			const slideWidth = ( slide.outerWidth - slide.firstMargin ) +
                ( cell.size.outerWidth - cell.size[ nextMargin ] );

			if ( canCellFit.call( this, i, slideWidth ) ) {
				slide.addCell( cell );
			} else {
				// doesn't fit, new slide
				slide.updateTarget();

				slide = new Slide( this );
				this.slides.push( slide );
				slide.addCell( cell );
			}
		}, this );
		// last slide
		slide.updateTarget();
		// update .selectedSlide
		this.updateSelectedSlide();
	};

	proto._getCanCellFit = function() {
		const groupCells = this.options.groupCells;
		if ( ! groupCells ) {
			return function() {
				return false;
			};
		} else if ( typeof groupCells === 'number' ) {
			// group by number. 3 -> [0,1,2], [3,4,5], ...
			const number = parseInt( groupCells, 10 );
			return function( i ) {
				return ( i % number ) !== 0;
			};
		}
		// default, group by width of slide
		// parse '75%
		const percentMatch = typeof groupCells === 'string' &&
            groupCells.match( /^(\d+)%$/ );
		const percent = percentMatch ? parseInt( percentMatch[ 1 ], 10 ) / 100 : 1;
		return function( i, slideWidth ) {
			return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
		};
	};

	// alias _init for jQuery plugin .flickity()
	proto._init = proto.reposition = function() {
		this.positionCells();
		this.positionSliderAtSelected();
	};

	proto.getSize = function() {
		this.size = getSize( this.element );
		this.setCellAlign();
		this.cursorPosition = this.size.innerWidth * this.cellAlign;
	};

	const cellAlignShorthands = {
		// cell align, then based on origin side
		center: {
			left: 0.5,
			right: 0.5,
		},
		left: {
			left: 0,
			right: 1,
		},
		right: {
			right: 0,
			left: 1,
		},
	};

	proto.setCellAlign = function() {
		const shorthand = cellAlignShorthands[ this.options.cellAlign ];
		this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
	};

	proto.setGallerySize = function() {
		if ( this.options.setGallerySize ) {
			const height = this.options.adaptiveHeight && this.selectedSlide ?
				this.selectedSlide.height : this.maxCellHeight;
			this.viewport.style.height = height + 'px';
		}
	};

	proto._getWrapShiftCells = function() {
		// only for wrap-around
		if ( ! this.options.wrapAround ) {
			return;
		}
		// unshift previous cells
		this._unshiftCells( this.beforeShiftCells );
		this._unshiftCells( this.afterShiftCells );
		// get before cells
		// initial gap
		let gapX = this.cursorPosition;
		const cellIndex = this.cells.length - 1;
		this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
		// get after cells
		// ending gap between last cell and end of gallery viewport
		gapX = this.size.innerWidth - this.cursorPosition;
		// start cloning at first cell, working forwards
		this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
	};

	proto._getGapCells = function( gapX, cellIndex, increment ) {
		// keep adding cells until the cover the initial gap
		const cells = [];
		while ( gapX > 0 ) {
			const cell = this.cells[ cellIndex ];
			if ( ! cell ) {
				break;
			}
			cells.push( cell );
			cellIndex += increment;
			gapX -= cell.size.outerWidth;
		}
		return cells;
	};

	// ----- contain ----- //

	// contain cell targets so no excess sliding
	proto._containSlides = function() {
		if ( ! this.options.contain || this.options.wrapAround || ! this.cells.length ) {
			return;
		}
		const isRightToLeft = this.options.rightToLeft;
		const beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
		const endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
		const contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
		// content is less than gallery size
		const isContentSmaller = contentWidth < this.size.innerWidth;
		// bounds
		const beginBound = this.cursorPosition + this.cells[ 0 ].size[ beginMargin ];
		const endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
		// contain each cell target
		this.slides.forEach( function( slide ) {
			if ( isContentSmaller ) {
				// all cells fit inside gallery
				slide.target = contentWidth * this.cellAlign;
			} else {
				// contain to bounds
				slide.target = Math.max( slide.target, beginBound );
				slide.target = Math.min( slide.target, endBound );
			}
		}, this );
	};

	// -----  ----- //

	proto.dispatchEvent = function( type, event, args ) {
		const emitArgs = event ? [ event ].concat( args ) : args;
		this.emitEvent( type, emitArgs );

		if ( jQuery && this.$element ) {
			// default trigger with type if no event
			type += this.options.namespaceJQueryEvents ? '.flickity' : '';
			let $event = type;
			if ( event ) {
				// create jQuery event
				const jQEvent = jQuery.Event( event );
				jQEvent.type = type;
				$event = jQEvent;
			}
			this.$element.trigger( $event, args );
		}
	};

	// -------------------------- select -------------------------- //

	proto.select = function( index, isWrap, isInstant ) {
		if ( ! this.isActive ) {
			return;
		}
		index = parseInt( index, 10 );
		this._wrapSelect( index );

		if ( this.options.wrapAround || isWrap ) {
			index = utils.modulo( index, this.slides.length );
		}
		// bail if invalid index
		if ( ! this.slides[ index ] ) {
			return;
		}
		const prevIndex = this.selectedIndex;
		this.selectedIndex = index;
		this.updateSelectedSlide();
		if ( isInstant ) {
			this.positionSliderAtSelected();
		} else {
			this.startAnimation();
		}
		if ( this.options.adaptiveHeight ) {
			this.setGallerySize();
		}
		// events
		this.dispatchEvent( 'select', null, [ index ] );
		// change event if new index
		if ( index !== prevIndex ) {
			this.dispatchEvent( 'change', null, [ index ] );
		}
		// old v1 event name, remove in v3
		this.dispatchEvent( 'cellSelect' );
	};

	// wraps position for wrapAround, to move to closest slide. #113
	proto._wrapSelect = function( index ) {
		const len = this.slides.length;
		const isWrapping = this.options.wrapAround && len > 1;
		if ( ! isWrapping ) {
			return index;
		}
		const wrapIndex = utils.modulo( index, len );
		// go to shortest
		const delta = Math.abs( wrapIndex - this.selectedIndex );
		const backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
		const forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
		if ( ! this.isDragSelect && backWrapDelta < delta ) {
			index += len;
		} else if ( ! this.isDragSelect && forewardWrapDelta < delta ) {
			index -= len;
		}
		// wrap position so slider is within normal area
		if ( index < 0 ) {
			this.x -= this.slideableWidth;
		} else if ( index >= len ) {
			this.x += this.slideableWidth;
		}
	};

	proto.previous = function( isWrap, isInstant ) {
		this.select( this.selectedIndex - 1, isWrap, isInstant );
	};

	proto.next = function( isWrap, isInstant ) {
		this.select( this.selectedIndex + 1, isWrap, isInstant );
	};

	proto.updateSelectedSlide = function() {
		const slide = this.slides[ this.selectedIndex ];
		// selectedIndex could be outside of slides, if triggered before resize()
		if ( ! slide ) {
			return;
		}
		// unselect previous selected slide
		this.unselectSelectedSlide();
		// update new selected slide
		this.selectedSlide = slide;
		slide.select();
		this.selectedCells = slide.cells;
		this.selectedElements = slide.getCellElements();
		// HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
		// Remove in v3?
		this.selectedCell = slide.cells[ 0 ];
		this.selectedElement = this.selectedElements[ 0 ];
	};

	proto.unselectSelectedSlide = function() {
		if ( this.selectedSlide ) {
			this.selectedSlide.unselect();
		}
	};

	proto.selectInitialIndex = function() {
		const initialIndex = this.options.initialIndex;
		// already activated, select previous selectedIndex
		if ( this.isInitActivated ) {
			this.select( this.selectedIndex, false, true );
			return;
		}
		// select with selector string
		if ( initialIndex && typeof initialIndex === 'string' ) {
			const cell = this.queryCell( initialIndex );
			if ( cell ) {
				this.selectCell( initialIndex, false, true );
				return;
			}
		}

		let index = 0;
		// select with number
		if ( initialIndex && this.slides[ initialIndex ] ) {
			index = initialIndex;
		}
		// select instantly
		this.select( index, false, true );
	};

	proto.selectCell = function( value, isWrap, isInstant ) {
		// get cell
		const cell = this.queryCell( value );
		if ( ! cell ) {
			return;
		}

		const index = this.getCellSlideIndex( cell );
		this.select( index, isWrap, isInstant );
	};

	proto.getCellSlideIndex = function( cell ) {
		// get index of slides that has cell
		for ( let i = 0; i < this.slides.length; i++ ) {
			const slide = this.slides[ i ];
			const index = slide.cells.indexOf( cell );
			if ( index !== -1 ) {
				return i;
			}
		}
	};

	// -------------------------- get cells -------------------------- //

	proto.getCell = function( elem ) {
		// loop through cells to get the one that matches
		for ( let i = 0; i < this.cells.length; i++ ) {
			const cell = this.cells[ i ];
			if ( cell.element === elem ) {
				return cell;
			}
		}
	};

	proto.getCells = function( elems ) {
		elems = utils.makeArray( elems );
		const cells = [];
		elems.forEach( function( elem ) {
			const cell = this.getCell( elem );
			if ( cell ) {
				cells.push( cell );
			}
		}, this );
		return cells;
	};

	/**
   * get cell elements
   * @returns {Array} cellElems
   */
	proto.getCellElements = function() {
		return this.cells.map( function( cell ) {
			return cell.element;
		} );
	};

	proto.getParentCell = function( elem ) {
		// first check if elem is cell
		const cell = this.getCell( elem );
		if ( cell ) {
			return cell;
		}
		// try to get parent cell elem
		elem = utils.getParent( elem, '.flickity-slider > *' );
		return this.getCell( elem );
	};

	proto.getAdjacentCellElements = function( adjCount, index ) {
		if ( ! adjCount ) {
			return this.selectedSlide.getCellElements();
		}
		index = index === undefined ? this.selectedIndex : index;

		const len = this.slides.length;
		if ( 1 + ( adjCount * 2 ) >= len ) {
			return this.getCellElements();
		}

		let cellElems = [];
		for ( let i = index - adjCount; i <= index + adjCount; i++ ) {
			const slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
			const slide = this.slides[ slideIndex ];
			if ( slide ) {
				cellElems = cellElems.concat( slide.getCellElements() );
			}
		}
		return cellElems;
	};

	proto.queryCell = function( selector ) {
		if ( typeof selector === 'number' ) {
			// use number as index
			return this.cells[ selector ];
		}
		if ( typeof selector === 'string' ) {
			// do not select invalid selectors from hash: #123, #/. #791
			if ( selector.match( /^[#\.]?[\d\/]/ ) ) {
				return;
			}
			// use string as selector, get element
			selector = this.element.querySelector( selector );
		}
		// get cell from element
		return this.getCell( selector );
	};

	// -------------------------- events -------------------------- //

	proto.uiChange = function() {
		this.emitEvent( 'uiChange' );
	};

	// keep focus on element when child UI elements are clicked
	proto.childUIPointerDown = function( event ) {
		// HACK iOS does not allow touch events to bubble up?!
		if ( event.type !== 'touchstart' ) {
			event.preventDefault();
		}
		this.focus();
	};

	// ----- resize ----- //

	proto.onresize = function() {
		this.watchCSS();
		this.resize();
	};

	utils.debounceMethod( Flickity, 'onresize', 150 );

	proto.resize = function() {
		if ( ! this.isActive ) {
			return;
		}
		this.getSize();
		// wrap values
		if ( this.options.wrapAround ) {
			this.x = utils.modulo( this.x, this.slideableWidth );
		}
		this.positionCells();
		this._getWrapShiftCells();
		this.setGallerySize();
		this.emitEvent( 'resize' );
		// update selected index for group slides, instant
		// TODO: position can be lost between groups of various numbers
		const selectedElement = this.selectedElements && this.selectedElements[ 0 ];
		this.selectCell( selectedElement, false, true );
	};

	// watches the :after property, activates/deactivates
	proto.watchCSS = function() {
		const watchOption = this.options.watchCSS;
		if ( ! watchOption ) {
			return;
		}

		const afterContent = getComputedStyle( this.element, ':after' ).content;
		// activate if :after { content: 'flickity' }
		if ( afterContent.indexOf( 'flickity' ) !== -1 ) {
			this.activate();
		} else {
			this.deactivate();
		}
	};

	// ----- keydown ----- //

	// go previous/next if left/right keys pressed
	proto.onkeydown = function( event ) {
		// only work if element is in focus
		const isNotFocused = document.activeElement && document.activeElement !== this.element;
		if ( ! this.options.accessibility || isNotFocused ) {
			return;
		}

		const handler = Flickity.keyboardHandlers[ event.keyCode ];
		if ( handler ) {
			handler.call( this );
		}
	};

	Flickity.keyboardHandlers = {
		// left arrow
		37: function() {
			const leftMethod = this.options.rightToLeft ? 'next' : 'previous';
			this.uiChange();
			this[ leftMethod ]();
		},
		// right arrow
		39: function() {
			const rightMethod = this.options.rightToLeft ? 'previous' : 'next';
			this.uiChange();
			this[ rightMethod ]();
		},
	};

	// ----- focus ----- //

	proto.focus = function() {
		// TODO remove scrollTo once focus options gets more support
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
		const prevScrollY = window.pageYOffset;
		this.element.focus( { preventScroll: true } );
		// hack to fix scroll jump after focus, #76
		if ( window.pageYOffset !== prevScrollY ) {
			window.scrollTo( window.pageXOffset, prevScrollY );
		}
	};

	// -------------------------- destroy -------------------------- //

	// deactivate all Flickity functionality, but keep stuff available
	proto.deactivate = function() {
		if ( ! this.isActive ) {
			return;
		}
		this.element.classList.remove( 'flickity-enabled' );
		this.element.classList.remove( 'flickity-rtl' );
		this.unselectSelectedSlide();
		// destroy cells
		this.cells.forEach( function( cell ) {
			cell.destroy();
		} );
		this.element.removeChild( this.viewport );
		// move child elements back into element
		moveElements( this.slider.children, this.element );
		if ( this.options.accessibility ) {
			this.element.removeAttribute( 'tabIndex' );
			this.element.removeEventListener( 'keydown', this );
		}
		// set flags
		this.isActive = false;
		this.emitEvent( 'deactivate' );
	};

	proto.destroy = function() {
		this.deactivate();
		window.removeEventListener( 'resize', this );
		this.allOff();
		this.emitEvent( 'destroy' );
		if ( jQuery && this.$element ) {
			jQuery.removeData( this.element, 'flickity' );
		}
		delete this.element.flickityGUID;
		delete instances[ this.guid ];
	};

	// -------------------------- prototype -------------------------- //

	utils.extend( proto, animatePrototype );

	// -------------------------- extras -------------------------- //

	Flickity.data = function( elem ) {
		elem = utils.getQueryElement( elem );
		const id = elem && elem.flickityGUID;
		return id && instances[ id ];
	};

	utils.htmlInit( Flickity, 'flickity' );

	if ( jQuery && jQuery.bridget ) {
		jQuery.bridget( 'flickity', Flickity );
	}

	// set internal jQuery, for Webpack + jQuery v3, #478
	Flickity.setJQuery = function( jq ) {
		jQuery = jq;
	};

	Flickity.Cell = Cell;
	Flickity.Slide = Slide;

	return Flickity;
} ) );

/*!
   * Unipointer v2.3.0
   * base class for doing one thing with pointer event
   * MIT license
   */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */ /*global define, module, require */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'unipointer/unipointer', [
			'ev-emitter/ev-emitter',
		], function( EvEmitter ) {
			return factory( window, EvEmitter );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'ev-emitter' )
		);
	} else {
		// browser global
		window.Unipointer = factory(
			window,
			window.EvEmitter
		);
	}
}( window, function factory( window, EvEmitter ) {
	function noop() { }

	function Unipointer() { }

	// inherit EvEmitter
	const proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

	proto.bindStartEvent = function( elem ) {
		this._bindStartEvent( elem, true );
	};

	proto.unbindStartEvent = function( elem ) {
		this._bindStartEvent( elem, false );
	};

	proto._bindStartEvent = function( elem, isAdd ) {
		// munge isAdd, default to true
		isAdd = isAdd === undefined ? true : isAdd;
		const bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

		// default to mouse events
		let startEvent = 'mousedown';
		if ( window.PointerEvent ) {
			// Pointer Events
			startEvent = 'pointerdown';
		} else if ( 'ontouchstart' in window ) {
			// Touch Events. iOS Safari
			startEvent = 'touchstart';
		}
		elem[ bindMethod ]( startEvent, this );
	};

	// trigger handler methods for events
	proto.handleEvent = function( event ) {
		const method = 'on' + event.type;
		if ( this[ method ] ) {
			this[ method ]( event );
		}
	};

	// returns the touch that we're keeping track of
	proto.getTouch = function( touches ) {
		for ( let i = 0; i < touches.length; i++ ) {
			const touch = touches[ i ];
			if ( touch.identifier === this.pointerIdentifier ) {
				return touch;
			}
		}
	};

	// ----- start event ----- //

	proto.onmousedown = function( event ) {
		// dismiss clicks from right or middle buttons
		const button = event.button;
		if ( button && ( button !== 0 && button !== 1 ) ) {
			return;
		}
		this._pointerDown( event, event );
	};

	proto.ontouchstart = function( event ) {
		this._pointerDown( event, event.changedTouches[ 0 ] );
	};

	proto.onpointerdown = function( event ) {
		this._pointerDown( event, event );
	};

	proto._pointerDown = function( event, pointer ) {
		// dismiss right click and other pointers
		// button = 0 is okay, 1-4 not
		if ( event.button || this.isPointerDown ) {
			return;
		}

		this.isPointerDown = true;
		// save pointer identifier to match up touch events
		this.pointerIdentifier = pointer.pointerId !== undefined ?
		// pointerId for pointer events, touch.indentifier for touch events
			pointer.pointerId : pointer.identifier;

		this.pointerDown( event, pointer );
	};

	proto.pointerDown = function( event, pointer ) {
		this._bindPostStartEvents( event );
		this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// hash of events to be bound after start event
	const postStartEvents = {
		mousedown: [ 'mousemove', 'mouseup' ],
		touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
		pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
	};

	proto._bindPostStartEvents = function( event ) {
		if ( ! event ) {
			return;
		}
		// get proper events to match start event
		const events = postStartEvents[ event.type ];
		// bind events to node
		events.forEach( function( eventName ) {
			window.addEventListener( eventName, this );
		}, this );
		// save these arguments
		this._boundPointerEvents = events;
	};

	proto._unbindPostStartEvents = function() {
		// check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
		if ( ! this._boundPointerEvents ) {
			return;
		}
		this._boundPointerEvents.forEach( function( eventName ) {
			window.removeEventListener( eventName, this );
		}, this );

		delete this._boundPointerEvents;
	};

	// ----- move event ----- //

	proto.onmousemove = function( event ) {
		this._pointerMove( event, event );
	};

	proto.onpointermove = function( event ) {
		if ( event.pointerId === this.pointerIdentifier ) {
			this._pointerMove( event, event );
		}
	};

	proto.ontouchmove = function( event ) {
		const touch = this.getTouch( event.changedTouches );
		if ( touch ) {
			this._pointerMove( event, touch );
		}
	};

	proto._pointerMove = function( event, pointer ) {
		this.pointerMove( event, pointer );
	};

	// public
	proto.pointerMove = function( event, pointer ) {
		this.emitEvent( 'pointerMove', [ event, pointer ] );
	};

	// ----- end event ----- //

	proto.onmouseup = function( event ) {
		this._pointerUp( event, event );
	};

	proto.onpointerup = function( event ) {
		if ( event.pointerId === this.pointerIdentifier ) {
			this._pointerUp( event, event );
		}
	};

	proto.ontouchend = function( event ) {
		const touch = this.getTouch( event.changedTouches );
		if ( touch ) {
			this._pointerUp( event, touch );
		}
	};

	proto._pointerUp = function( event, pointer ) {
		this._pointerDone();
		this.pointerUp( event, pointer );
	};

	// public
	proto.pointerUp = function( event, pointer ) {
		this.emitEvent( 'pointerUp', [ event, pointer ] );
	};

	// ----- pointer done ----- //

	// triggered on pointer up & pointer cancel
	proto._pointerDone = function() {
		this._pointerReset();
		this._unbindPostStartEvents();
		this.pointerDone();
	};

	proto._pointerReset = function() {
		// reset properties
		this.isPointerDown = false;
		delete this.pointerIdentifier;
	};

	proto.pointerDone = noop;

	// ----- pointer cancel ----- //

	proto.onpointercancel = function( event ) {
		if ( event.pointerId === this.pointerIdentifier ) {
			this._pointerCancel( event, event );
		}
	};

	proto.ontouchcancel = function( event ) {
		const touch = this.getTouch( event.changedTouches );
		if ( touch ) {
			this._pointerCancel( event, touch );
		}
	};

	proto._pointerCancel = function( event, pointer ) {
		this._pointerDone();
		this.pointerCancel( event, pointer );
	};

	// public
	proto.pointerCancel = function( event, pointer ) {
		this.emitEvent( 'pointerCancel', [ event, pointer ] );
	};

	// -----  ----- //

	// utility function for getting x/y coords from event
	Unipointer.getPointerPoint = function( pointer ) {
		return {
			x: pointer.pageX,
			y: pointer.pageY,
		};
	};

	// -----  ----- //

	return Unipointer;
} ) );

/*!
   * Unidragger v2.3.0
   * Draggable base class
   * MIT license
   */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
	// universal module definition
	/*jshint strict: false */ /*globals define, module, require */

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'unidragger/unidragger', [
			'unipointer/unipointer',
		], function( Unipointer ) {
			return factory( window, Unipointer );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'unipointer' )
		);
	} else {
		// browser global
		window.Unidragger = factory(
			window,
			window.Unipointer
		);
	}
}( window, function factory( window, Unipointer ) {
	// -------------------------- Unidragger -------------------------- //

	function Unidragger() { }

	// inherit Unipointer & EvEmitter
	const proto = Unidragger.prototype = Object.create( Unipointer.prototype );

	// ----- bind start ----- //

	proto.bindHandles = function() {
		this._bindHandles( true );
	};

	proto.unbindHandles = function() {
		this._bindHandles( false );
	};

	proto._bindHandles = function( isAdd ) {
		// munge isAdd, default to true
		isAdd = isAdd === undefined ? true : isAdd;
		// bind each handle
		const bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
		const touchAction = isAdd ? this._touchActionValue : '';
		for ( let i = 0; i < this.handles.length; i++ ) {
			const handle = this.handles[ i ];
			this._bindStartEvent( handle, isAdd );
			handle[ bindMethod ]( 'click', this );
			// touch-action: none to override browser touch gestures. metafizzy/flickity#540
			if ( window.PointerEvent ) {
				handle.style.touchAction = touchAction;
			}
		}
	};

	// prototype so it can be overwriteable by Flickity
	proto._touchActionValue = 'none';

	// ----- start event ----- //

	proto.pointerDown = function( event, pointer ) {
		const isOkay = this.okayPointerDown( event );
		if ( ! isOkay ) {
			return;
		}
		// track start event position
		this.pointerDownPointer = pointer;

		event.preventDefault();
		this.pointerDownBlur();
		// bind move and end events
		this._bindPostStartEvents( event );
		this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// nodes that have text fields
	const cursorNodes = {
		TEXTAREA: true,
		INPUT: true,
		SELECT: true,
		OPTION: true,
	};

	// input types that do not have text fields
	const clickTypes = {
		radio: true,
		checkbox: true,
		button: true,
		submit: true,
		image: true,
		file: true,
	};

	// dismiss inputs with text fields. flickity#403, flickity#404
	proto.okayPointerDown = function( event ) {
		const isCursorNode = cursorNodes[ event.target.nodeName ];
		const isClickType = clickTypes[ event.target.type ];
		const isOkay = ! isCursorNode || isClickType;
		if ( ! isOkay ) {
			this._pointerReset();
		}
		return isOkay;
	};

	// kludge to blur previously focused input
	proto.pointerDownBlur = function() {
		const focused = document.activeElement;
		// do not blur body for IE10, metafizzy/flickity#117
		const canBlur = focused && focused.blur && focused !== document.body;
		if ( canBlur ) {
			focused.blur();
		}
	};

	// ----- move event ----- //

	proto.pointerMove = function( event, pointer ) {
		const moveVector = this._dragPointerMove( event, pointer );
		this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
		this._dragMove( event, pointer, moveVector );
	};

	// base pointer move logic
	proto._dragPointerMove = function( event, pointer ) {
		const moveVector = {
			x: pointer.pageX - this.pointerDownPointer.pageX,
			y: pointer.pageY - this.pointerDownPointer.pageY,
		};
		// start drag if pointer has moved far enough to start drag
		if ( ! this.isDragging && this.hasDragStarted( moveVector ) ) {
			this._dragStart( event, pointer );
		}
		return moveVector;
	};

	// condition if pointer has moved far enough to start drag
	proto.hasDragStarted = function( moveVector ) {
		return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
	};

	// ----- end event ----- //

	proto.pointerUp = function( event, pointer ) {
		this.emitEvent( 'pointerUp', [ event, pointer ] );
		this._dragPointerUp( event, pointer );
	};

	proto._dragPointerUp = function( event, pointer ) {
		if ( this.isDragging ) {
			this._dragEnd( event, pointer );
		} else {
			// pointer didn't move enough for drag to start
			this._staticClick( event, pointer );
		}
	};

	// -------------------------- drag -------------------------- //

	// dragStart
	proto._dragStart = function( event, pointer ) {
		this.isDragging = true;
		// prevent clicks
		this.isPreventingClicks = true;
		this.dragStart( event, pointer );
	};

	proto.dragStart = function( event, pointer ) {
		this.emitEvent( 'dragStart', [ event, pointer ] );
	};

	// dragMove
	proto._dragMove = function( event, pointer, moveVector ) {
		// do not drag if not dragging yet
		if ( ! this.isDragging ) {
			return;
		}

		this.dragMove( event, pointer, moveVector );
	};

	proto.dragMove = function( event, pointer, moveVector ) {
		event.preventDefault();
		this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
	};

	// dragEnd
	proto._dragEnd = function( event, pointer ) {
		// set flags
		this.isDragging = false;
		// re-enable clicking async
		setTimeout( function() {
			delete this.isPreventingClicks;
		}.bind( this ) );

		this.dragEnd( event, pointer );
	};

	proto.dragEnd = function( event, pointer ) {
		this.emitEvent( 'dragEnd', [ event, pointer ] );
	};

	// ----- onclick ----- //

	// handle all clicks and prevent clicks when dragging
	proto.onclick = function( event ) {
		if ( this.isPreventingClicks ) {
			event.preventDefault();
		}
	};

	// ----- staticClick ----- //

	// triggered after pointer down & up with no/tiny movement
	proto._staticClick = function( event, pointer ) {
		// ignore emulated mouse up clicks
		if ( this.isIgnoringMouseUp && event.type === 'mouseup' ) {
			return;
		}

		this.staticClick( event, pointer );

		// set flag for emulated clicks 300ms after touchend
		if ( event.type !== 'mouseup' ) {
			this.isIgnoringMouseUp = true;
			// reset flag after 300ms
			setTimeout( function() {
				delete this.isIgnoringMouseUp;
			}.bind( this ), 400 );
		}
	};

	proto.staticClick = function( event, pointer ) {
		this.emitEvent( 'staticClick', [ event, pointer ] );
	};

	// ----- utils ----- //

	Unidragger.getPointerPoint = Unipointer.getPointerPoint;

	// -----  ----- //

	return Unidragger;
} ) );

// drag
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/drag', [
			'./flickity',
			'unidragger/unidragger',
			'fizzy-ui-utils/utils',
		], function( Flickity, Unidragger, utils ) {
			return factory( window, Flickity, Unidragger, utils );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( './flickity' ),
			require( 'unidragger' ),
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		window.Flickity = factory(
			window,
			window.Flickity,
			window.Unidragger,
			window.fizzyUIUtils
		);
	}
}( window, function factory( window, Flickity, Unidragger, utils ) {
	// ----- defaults ----- //

	utils.extend( Flickity.defaults, {
		draggable: '>1',
		dragThreshold: 3,
	} );

	// ----- create ----- //

	Flickity.createMethods.push( '_createDrag' );

	// -------------------------- drag prototype -------------------------- //

	const proto = Flickity.prototype;
	utils.extend( proto, Unidragger.prototype );
	proto._touchActionValue = 'pan-y';

	// --------------------------  -------------------------- //

	const isTouch = 'createTouch' in document;
	let isTouchmoveScrollCanceled = false;

	proto._createDrag = function() {
		this.on( 'activate', this.onActivateDrag );
		this.on( 'uiChange', this._uiChangeDrag );
		this.on( 'deactivate', this.onDeactivateDrag );
		this.on( 'cellChange', this.updateDraggable );
		// TODO updateDraggable on resize? if groupCells & slides change
		// HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
		// #457, RubaXa/Sortable#973
		if ( isTouch && ! isTouchmoveScrollCanceled ) {
			window.addEventListener( 'touchmove', function() { } );
			isTouchmoveScrollCanceled = true;
		}
	};

	proto.onActivateDrag = function() {
		this.handles = [ this.viewport ];
		this.bindHandles();
		this.updateDraggable();
	};

	proto.onDeactivateDrag = function() {
		this.unbindHandles();
		this.element.classList.remove( 'is-draggable' );
	};

	proto.updateDraggable = function() {
		// disable dragging if less than 2 slides. #278
		if ( this.options.draggable === '>1' ) {
			this.isDraggable = this.slides.length > 1;
		} else {
			this.isDraggable = this.options.draggable;
		}
		if ( this.isDraggable ) {
			this.element.classList.add( 'is-draggable' );
		} else {
			this.element.classList.remove( 'is-draggable' );
		}
	};

	// backwards compatibility
	proto.bindDrag = function() {
		this.options.draggable = true;
		this.updateDraggable();
	};

	proto.unbindDrag = function() {
		this.options.draggable = false;
		this.updateDraggable();
	};

	proto._uiChangeDrag = function() {
		delete this.isFreeScrolling;
	};

	// -------------------------- pointer events -------------------------- //

	proto.pointerDown = function( event, pointer ) {
		if ( ! this.isDraggable ) {
			this._pointerDownDefault( event, pointer );
			return;
		}
		const isOkay = this.okayPointerDown( event );
		if ( ! isOkay ) {
			return;
		}

		this._pointerDownPreventDefault( event );
		this.pointerDownFocus( event );
		// blur
		if ( document.activeElement !== this.element ) {
			// do not blur if already focused
			this.pointerDownBlur();
		}

		// stop if it was moving
		this.dragX = this.x;
		this.viewport.classList.add( 'is-pointer-down' );
		// track scrolling
		this.pointerDownScroll = getScrollPosition();
		window.addEventListener( 'scroll', this );

		this._pointerDownDefault( event, pointer );
	};

	// default pointerDown logic, used for staticClick
	proto._pointerDownDefault = function( event, pointer ) {
		// track start event position
		// Safari 9 overrides pageX and pageY. These values needs to be copied. #779
		this.pointerDownPointer = {
			pageX: pointer.pageX,
			pageY: pointer.pageY,
		};
		// bind move and end events
		this._bindPostStartEvents( event );
		this.dispatchEvent( 'pointerDown', event, [ pointer ] );
	};

	const focusNodes = {
		INPUT: true,
		TEXTAREA: true,
		SELECT: true,
	};

	proto.pointerDownFocus = function( event ) {
		const isFocusNode = focusNodes[ event.target.nodeName ];
		if ( ! isFocusNode ) {
			this.focus();
		}
	};

	proto._pointerDownPreventDefault = function( event ) {
		const isTouchStart = event.type === 'touchstart';
		const isTouchPointer = event.pointerType === 'touch';
		const isFocusNode = focusNodes[ event.target.nodeName ];
		if ( ! isTouchStart && ! isTouchPointer && ! isFocusNode ) {
			event.preventDefault();
		}
	};

	// ----- move ----- //

	proto.hasDragStarted = function( moveVector ) {
		return Math.abs( moveVector.x ) > this.options.dragThreshold;
	};

	// ----- up ----- //

	proto.pointerUp = function( event, pointer ) {
		delete this.isTouchScrolling;
		this.viewport.classList.remove( 'is-pointer-down' );
		this.dispatchEvent( 'pointerUp', event, [ pointer ] );
		this._dragPointerUp( event, pointer );
	};

	proto.pointerDone = function() {
		window.removeEventListener( 'scroll', this );
		delete this.pointerDownScroll;
	};

	// -------------------------- dragging -------------------------- //

	proto.dragStart = function( event, pointer ) {
		if ( ! this.isDraggable ) {
			return;
		}
		this.dragStartPosition = this.x;
		this.startAnimation();
		window.removeEventListener( 'scroll', this );
		this.dispatchEvent( 'dragStart', event, [ pointer ] );
	};

	proto.pointerMove = function( event, pointer ) {
		const moveVector = this._dragPointerMove( event, pointer );
		this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
		this._dragMove( event, pointer, moveVector );
	};

	proto.dragMove = function( event, pointer, moveVector ) {
		if ( ! this.isDraggable ) {
			return;
		}
		event.preventDefault();

		this.previousDragX = this.dragX;
		// reverse if right-to-left
		const direction = this.options.rightToLeft ? -1 : 1;
		if ( this.options.wrapAround ) {
			// wrap around move. #589
			moveVector.x = moveVector.x % this.slideableWidth;
		}
		let dragX = this.dragStartPosition + moveVector.x * direction;

		if ( ! this.options.wrapAround && this.slides.length ) {
			// slow drag
			const originBound = Math.max( -this.slides[ 0 ].target, this.dragStartPosition );
			dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
			const endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
			dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
		}

		this.dragX = dragX;

		this.dragMoveTime = new Date();
		this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
	};

	proto.dragEnd = function( event, pointer ) {
		if ( ! this.isDraggable ) {
			return;
		}
		if ( this.options.freeScroll ) {
			this.isFreeScrolling = true;
		}
		// set selectedIndex based on where flick will end up
		let index = this.dragEndRestingSelect();

		if ( this.options.freeScroll && ! this.options.wrapAround ) {
			// if free-scroll & not wrap around
			// do not free-scroll if going outside of bounding slides
			// so bounding slides can attract slider, and keep it in bounds
			const restingX = this.getRestingPosition();
			this.isFreeScrolling = -restingX > this.slides[ 0 ].target &&
                -restingX < this.getLastSlide().target;
		} else if ( ! this.options.freeScroll && index === this.selectedIndex ) {
			// boost selection if selected index has not changed
			index += this.dragEndBoostSelect();
		}
		delete this.previousDragX;
		// apply selection
		// TODO refactor this, selecting here feels weird
		// HACK, set flag so dragging stays in correct direction
		this.isDragSelect = this.options.wrapAround;
		this.select( index );
		delete this.isDragSelect;
		this.dispatchEvent( 'dragEnd', event, [ pointer ] );
	};

	proto.dragEndRestingSelect = function() {
		const restingX = this.getRestingPosition();
		// how far away from selected slide
		const distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
		// get closet resting going up and going down
		const positiveResting = this._getClosestResting( restingX, distance, 1 );
		const negativeResting = this._getClosestResting( restingX, distance, -1 );
		// use closer resting for wrap-around
		const index = positiveResting.distance < negativeResting.distance ?
			positiveResting.index : negativeResting.index;
		return index;
	};

	proto._getClosestResting = function( restingX, distance, increment ) {
		let index = this.selectedIndex;
		let minDistance = Infinity;
		const condition = this.options.contain && ! this.options.wrapAround ?
		// if contain, keep going if distance is equal to minDistance
			function( d, md ) {
				return d <= md;
			} : function( d, md ) {
				return d < md;
			};
		while ( condition( distance, minDistance ) ) {
			// measure distance to next cell
			index += increment;
			minDistance = distance;
			distance = this.getSlideDistance( -restingX, index );
			if ( distance === null ) {
				break;
			}
			distance = Math.abs( distance );
		}
		return {
			distance: minDistance,
			// selected was previous index
			index: index - increment,
		};
	};

	proto.getSlideDistance = function( x, index ) {
		const len = this.slides.length;
		// wrap around if at least 2 slides
		const isWrapAround = this.options.wrapAround && len > 1;
		const slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
		const slide = this.slides[ slideIndex ];
		if ( ! slide ) {
			return null;
		}
		// add distance for wrap-around slides
		const wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
		return x - ( slide.target + wrap );
	};

	proto.dragEndBoostSelect = function() {
		// do not boost if no previousDragX or dragMoveTime
		if ( this.previousDragX === undefined || ! this.dragMoveTime ||
            // or if drag was held for 100 ms
            new Date() - this.dragMoveTime > 100 ) {
			return 0;
		}

		const distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
		const delta = this.previousDragX - this.dragX;
		if ( distance > 0 && delta > 0 ) {
			// boost to next if moving towards the right, and positive velocity
			return 1;
		} else if ( distance < 0 && delta < 0 ) {
			// boost to previous if moving towards the left, and negative velocity
			return -1;
		}
		return 0;
	};

	// ----- staticClick ----- //

	proto.staticClick = function( event, pointer ) {
		// get clickedCell, if cell was clicked
		const clickedCell = this.getParentCell( event.target );
		const cellElem = clickedCell && clickedCell.element;
		const cellIndex = clickedCell && this.cells.indexOf( clickedCell );
		this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
	};

	// ----- scroll ----- //

	proto.onscroll = function() {
		const scroll = getScrollPosition();
		const scrollMoveX = this.pointerDownScroll.x - scroll.x;
		const scrollMoveY = this.pointerDownScroll.y - scroll.y;
		// cancel click/tap if scroll is too much
		if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
			this._pointerDone();
		}
	};

	// ----- utils ----- //

	function getScrollPosition() {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset,
		};
	}

	// -----  ----- //

	return Flickity;
} ) );

// prev/next buttons
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/prev-next-button', [
			'./flickity',
			'unipointer/unipointer',
			'fizzy-ui-utils/utils',
		], function( Flickity, Unipointer, utils ) {
			return factory( window, Flickity, Unipointer, utils );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( './flickity' ),
			require( 'unipointer' ),
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		factory(
			window,
			window.Flickity,
			window.Unipointer,
			window.fizzyUIUtils
		);
	}
}( window, function factory( window, Flickity, Unipointer, utils ) {
	'use strict';

	// -------------------------- PrevNextButton -------------------------- //

	function PrevNextButton( direction, parent ) {
		this.direction = direction;
		this.parent = parent;
		this._create();
	}

	PrevNextButton.prototype = Object.create( Unipointer.prototype );

	PrevNextButton.prototype._create = function() {
		// properties
		this.isEnabled = true;
		this.isPrevious = this.direction === -1;
		const leftDirection = this.parent.options.rightToLeft ? 1 : -1;
		this.isLeft = this.direction === leftDirection;

		const element = this.element = document.createElement( 'button' );
		element.className = 'coblocks-lightbox__arrow coblocks-lightbox__arrow--';
		element.className += this.isLeft ? 'left' : 'right';
		// prevent button from submitting form http://stackoverflow.com/a/10836076/182183
		element.setAttribute( 'type', 'button' );
		// init as disabled
		this.disable();

		element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

		// create arrow
		const div = this.createDiv();
		element.appendChild( div );
		// events
		this.parent.on( 'select', this.update.bind( this ) );
		this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
	};

	PrevNextButton.prototype.activate = function() {
		this.bindStartEvent( this.element );
		this.element.addEventListener( 'click', this );
		// add to DOM
		this.parent.element.appendChild( this.element );
	};

	PrevNextButton.prototype.deactivate = function() {
		// remove from DOM
		this.parent.element.removeChild( this.element );
		// click events
		this.unbindStartEvent( this.element );
		this.element.removeEventListener( 'click', this );
	};

	PrevNextButton.prototype.createDiv = function() {
		const div = document.createElement( 'div' );
		div.setAttribute( 'class', 'arrow-left' );
		if ( ! this.isLeft ) {
			div.setAttribute( 'class', 'arrow-right' );
		}
		return div;
	};

	PrevNextButton.prototype.handleEvent = utils.handleEvent;

	PrevNextButton.prototype.onclick = function() {
		if ( ! this.isEnabled ) {
			return;
		}
		this.parent.uiChange();
		const method = this.isPrevious ? 'previous' : 'next';
		this.parent[ method ]();
	};

	PrevNextButton.prototype.enable = function() {
		if ( this.isEnabled ) {
			return;
		}
		this.element.disabled = false;
		this.isEnabled = true;
	};

	PrevNextButton.prototype.disable = function() {
		if ( ! this.isEnabled ) {
			return;
		}
		this.element.disabled = true;
		this.isEnabled = false;
	};

	PrevNextButton.prototype.update = function() {
		// index of first or last slide, if previous or next
		const slides = this.parent.slides;
		// enable is wrapAround and at least 2 slides
		if ( this.parent.options.wrapAround && slides.length > 1 ) {
			this.enable();
			return;
		}
		const lastIndex = slides.length ? slides.length - 1 : 0;
		const boundIndex = this.isPrevious ? 0 : lastIndex;
		const method = this.parent.selectedIndex === boundIndex ? 'disable' : 'enable';
		this[ method ]();
	};

	PrevNextButton.prototype.destroy = function() {
		this.deactivate();
		this.allOff();
	};

	// -------------------------- Flickity prototype -------------------------- //

	utils.extend( Flickity.defaults, {
		prevNextButtons: true,
	} );

	Flickity.createMethods.push( '_createPrevNextButtons' );
	const proto = Flickity.prototype;

	proto._createPrevNextButtons = function() {
		if ( ! this.options.prevNextButtons ) {
			return;
		}

		this.prevButton = new PrevNextButton( -1, this );
		this.nextButton = new PrevNextButton( 1, this );

		this.on( 'activate', this.activatePrevNextButtons );
	};

	proto.activatePrevNextButtons = function() {
		this.prevButton.activate();
		this.nextButton.activate();
		this.on( 'deactivate', this.deactivatePrevNextButtons );
	};

	proto.deactivatePrevNextButtons = function() {
		this.prevButton.deactivate();
		this.nextButton.deactivate();
		this.off( 'deactivate', this.deactivatePrevNextButtons );
	};

	// --------------------------  -------------------------- //

	Flickity.PrevNextButton = PrevNextButton;

	return Flickity;
} ) );

// page dots
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/page-dots', [
			'./flickity',
			'unipointer/unipointer',
			'fizzy-ui-utils/utils',
		], function( Flickity, Unipointer, utils ) {
			return factory( window, Flickity, Unipointer, utils );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( './flickity' ),
			require( 'unipointer' ),
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		factory(
			window,
			window.Flickity,
			window.Unipointer,
			window.fizzyUIUtils
		);
	}
}( window, function factory( window, Flickity, Unipointer, utils ) {
	// -------------------------- PageDots -------------------------- //

	function PageDots( parent ) {
		this.parent = parent;
		this._create();
	}

	PageDots.prototype = Object.create( Unipointer.prototype );

	PageDots.prototype._create = function() {
		// create holder element
		this.holder = document.createElement( 'ol' );
		this.holder.className = 'flickity-page-dots';
		// create dots, array of elements
		this.dots = [];
		// events
		this.handleClick = this.onClick.bind( this );
		this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
	};

	PageDots.prototype.activate = function() {
		this.setDots();
		this.holder.addEventListener( 'click', this.handleClick );
		this.bindStartEvent( this.holder );
		// add to DOM
		this.parent.element.appendChild( this.holder );
	};

	PageDots.prototype.deactivate = function() {
		this.holder.removeEventListener( 'click', this.handleClick );
		this.unbindStartEvent( this.holder );
		// remove from DOM
		this.parent.element.removeChild( this.holder );
	};

	PageDots.prototype.setDots = function() {
		// get difference between number of slides and number of dots
		const delta = this.parent.slides.length - this.dots.length;
		if ( delta > 0 ) {
			this.addDots( delta );
		} else if ( delta < 0 ) {
			this.removeDots( -delta );
		}
	};

	PageDots.prototype.addDots = function( count ) {
		const fragment = document.createDocumentFragment();
		const newDots = [];
		const length = this.dots.length;
		const max = length + count;

		for ( let i = length; i < max; i++ ) {
			const dot = document.createElement( 'li' );
			dot.className = 'dot';
			dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
			fragment.appendChild( dot );
			newDots.push( dot );
		}

		this.holder.appendChild( fragment );
		this.dots = this.dots.concat( newDots );
	};

	PageDots.prototype.removeDots = function( count ) {
		// remove from this.dots collection
		const removeDots = this.dots.splice( this.dots.length - count, count );
		// remove from DOM
		removeDots.forEach( function( dot ) {
			this.holder.removeChild( dot );
		}, this );
	};

	PageDots.prototype.updateSelected = function() {
		// remove selected class on previous
		if ( this.selectedDot ) {
			this.selectedDot.className = 'dot';
			this.selectedDot.removeAttribute( 'aria-current' );
		}
		// don't proceed if no dots
		if ( ! this.dots.length ) {
			return;
		}
		this.selectedDot = this.dots[ this.parent.selectedIndex ];
		this.selectedDot.className = 'dot is-selected';
		this.selectedDot.setAttribute( 'aria-current', 'step' );
	};

	PageDots.prototype.onTap = PageDots.prototype.onClick = function( event ) {
		const target = event.target;
		// only care about dot clicks
		if ( target.nodeName !== 'LI' ) {
			return;
		}
		this.parent.uiChange();
		const index = this.dots.indexOf( target );
		this.parent.select( index );
	};

	PageDots.prototype.destroy = function() {
		this.deactivate();
		this.allOff();
	};

	Flickity.PageDots = PageDots;

	// -------------------------- Flickity -------------------------- //

	utils.extend( Flickity.defaults, {
		pageDots: true,
	} );

	Flickity.createMethods.push( '_createPageDots' );

	const proto = Flickity.prototype;

	proto._createPageDots = function() {
		if ( ! this.options.pageDots ) {
			return;
		}
		this.pageDots = new PageDots( this );
		// events
		this.on( 'activate', this.activatePageDots );
		this.on( 'select', this.updateSelectedPageDots );
		this.on( 'cellChange', this.updatePageDots );
		this.on( 'resize', this.updatePageDots );
		this.on( 'deactivate', this.deactivatePageDots );
	};

	proto.activatePageDots = function() {
		this.pageDots.activate();
	};

	proto.updateSelectedPageDots = function() {
		this.pageDots.updateSelected();
	};

	proto.updatePageDots = function() {
		this.pageDots.setDots();
	};

	proto.deactivatePageDots = function() {
		this.pageDots.deactivate();
	};

	// -----  ----- //

	Flickity.PageDots = PageDots;

	return Flickity;
} ) );

// player & autoPlay
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/player', [
			'ev-emitter/ev-emitter',
			'fizzy-ui-utils/utils',
			'./flickity',
		], function( EvEmitter, utils, Flickity ) {
			return factory( EvEmitter, utils, Flickity );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			require( 'ev-emitter' ),
			require( 'fizzy-ui-utils' ),
			require( './flickity' )
		);
	} else {
		// browser global
		factory(
			window.EvEmitter,
			window.fizzyUIUtils,
			window.Flickity
		);
	}
}( window, function factory( EvEmitter, utils, Flickity ) {
	// -------------------------- Player -------------------------- //

	function Player( parent ) {
		this.parent = parent;
		this.state = 'stopped';
		// visibility change event handler
		this.onVisibilityChange = this.visibilityChange.bind( this );
		this.onVisibilityPlay = this.visibilityPlay.bind( this );
	}

	Player.prototype = Object.create( EvEmitter.prototype );

	// start play
	Player.prototype.play = function() {
		if ( this.state === 'playing' ) {
			return;
		}
		// do not play if page is hidden, start playing when page is visible
		const isPageHidden = document.hidden;
		if ( isPageHidden ) {
			document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
			return;
		}

		this.state = 'playing';
		// listen to visibility change
		document.addEventListener( 'visibilitychange', this.onVisibilityChange );
		// start ticking
		this.tick();
	};

	Player.prototype.tick = function() {
		// do not tick if not playing
		if ( this.state !== 'playing' ) {
			return;
		}

		let time = this.parent.options.autoPlay;
		// default to 3 seconds
		time = typeof time === 'number' ? time : 3000;
		const _this = this;
		// HACK: reset ticks if stopped and started within interval
		this.clear();
		this.timeout = setTimeout( function() {
			_this.parent.next( true );
			_this.tick();
		}, time );
	};

	Player.prototype.stop = function() {
		this.state = 'stopped';
		this.clear();
		// remove visibility change event
		document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
	};

	Player.prototype.clear = function() {
		clearTimeout( this.timeout );
	};

	Player.prototype.pause = function() {
		if ( this.state === 'playing' ) {
			this.state = 'paused';
			this.clear();
		}
	};

	Player.prototype.unpause = function() {
		// re-start play if paused
		if ( this.state === 'paused' ) {
			this.play();
		}
	};

	// pause if page visibility is hidden, unpause if visible
	Player.prototype.visibilityChange = function() {
		const isPageHidden = document.hidden;
		this[ isPageHidden ? 'pause' : 'unpause' ]();
	};

	Player.prototype.visibilityPlay = function() {
		this.play();
		document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
	};

	// -------------------------- Flickity -------------------------- //

	utils.extend( Flickity.defaults, {
		pauseAutoPlayOnHover: true,
	} );

	Flickity.createMethods.push( '_createPlayer' );
	const proto = Flickity.prototype;

	proto._createPlayer = function() {
		this.player = new Player( this );

		this.on( 'activate', this.activatePlayer );
		this.on( 'uiChange', this.stopPlayer );
		this.on( 'pointerDown', this.stopPlayer );
		this.on( 'deactivate', this.deactivatePlayer );
	};

	proto.activatePlayer = function() {
		if ( ! this.options.autoPlay ) {
			return;
		}
		this.player.play();
		this.element.addEventListener( 'mouseenter', this );
	};

	// Player API, don't hate the ... thanks I know where the door is

	proto.playPlayer = function() {
		this.player.play();
	};

	proto.stopPlayer = function() {
		this.player.stop();
	};

	proto.pausePlayer = function() {
		this.player.pause();
	};

	proto.unpausePlayer = function() {
		this.player.unpause();
	};

	proto.deactivatePlayer = function() {
		this.player.stop();
		this.element.removeEventListener( 'mouseenter', this );
	};

	// ----- mouseenter/leave ----- //

	// pause auto-play on hover
	proto.onmouseenter = function() {
		if ( ! this.options.pauseAutoPlayOnHover ) {
			return;
		}
		this.player.pause();
		this.element.addEventListener( 'mouseleave', this );
	};

	// resume auto-play on hover off
	proto.onmouseleave = function() {
		this.player.unpause();
		this.element.removeEventListener( 'mouseleave', this );
	};

	// -----  ----- //

	Flickity.Player = Player;

	return Flickity;
} ) );

// add, remove cell
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/add-remove-cell', [
			'./flickity',
			'fizzy-ui-utils/utils',
		], function( Flickity, utils ) {
			return factory( window, Flickity, utils );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( './flickity' ),
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		factory(
			window,
			window.Flickity,
			window.fizzyUIUtils
		);
	}
}( window, function factory( window, Flickity, utils ) {
	// append cells to a document fragment
	function getCellsFragment( cells ) {
		const fragment = document.createDocumentFragment();
		cells.forEach( function( cell ) {
			fragment.appendChild( cell.element );
		} );
		return fragment;
	}

	// -------------------------- add/remove cell prototype -------------------------- //

	const proto = Flickity.prototype;

	proto.insert = function( elems, index ) {
		const cells = this._makeCells( elems );
		if ( ! cells || ! cells.length ) {
			return;
		}
		const len = this.cells.length;
		// default to append
		index = index === undefined ? len : index;
		// add cells with document fragment
		const fragment = getCellsFragment( cells );
		// append to slider
		const isAppend = index === len;
		if ( isAppend ) {
			this.slider.appendChild( fragment );
		} else {
			const insertCellElement = this.cells[ index ].element;
			this.slider.insertBefore( fragment, insertCellElement );
		}
		// add to this.cells
		if ( index === 0 ) {
			// prepend, add to start
			this.cells = cells.concat( this.cells );
		} else if ( isAppend ) {
			// append, add to end
			this.cells = this.cells.concat( cells );
		} else {
			// insert in this.cells
			const endCells = this.cells.splice( index, len - index );
			this.cells = this.cells.concat( cells ).concat( endCells );
		}

		this._sizeCells( cells );
		this.cellChange( index, true );
	};

	proto.append = function( elems ) {
		this.insert( elems, this.cells.length );
	};

	proto.prepend = function( elems ) {
		this.insert( elems, 0 );
	};

	proto.remove = function( elems ) {
		const cells = this.getCells( elems );
		if ( ! cells || ! cells.length ) {
			return;
		}

		let minCellIndex = this.cells.length - 1;
		// remove cells from collection & DOM
		cells.forEach( function( cell ) {
			cell.remove();
			const index = this.cells.indexOf( cell );
			minCellIndex = Math.min( index, minCellIndex );
			utils.removeFrom( this.cells, cell );
		}, this );

		this.cellChange( minCellIndex, true );
	};

	proto.cellSizeChange = function( elem ) {
		const cell = this.getCell( elem );
		if ( ! cell ) {
			return;
		}
		cell.getSize();

		const index = this.cells.indexOf( cell );
		this.cellChange( index );
	};

	proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
		const prevSelectedElem = this.selectedElement;
		this._positionCells( changedCellIndex );
		this._getWrapShiftCells();
		this.setGallerySize();
		// update selectedIndex
		// try to maintain position & select previous selected element
		const cell = this.getCell( prevSelectedElem );
		if ( cell ) {
			this.selectedIndex = this.getCellSlideIndex( cell );
		}
		this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

		this.emitEvent( 'cellChange', [ changedCellIndex ] );
		// position slider
		this.select( this.selectedIndex );
		// do not position slider after lazy load
		if ( isPositioningSlider ) {
			this.positionSliderAtSelected();
		}
	};

	// -----  ----- //

	return Flickity;
} ) );

// lazyload
( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/lazyload', [
			'./flickity',
			'fizzy-ui-utils/utils',
		], function( Flickity, utils ) {
			return factory( window, Flickity, utils );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( './flickity' ),
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		factory(
			window,
			window.Flickity,
			window.fizzyUIUtils
		);
	}
}( window, function factory( window, Flickity, utils ) {
	'use strict';

	Flickity.createMethods.push( '_createLazyload' );
	const proto = Flickity.prototype;

	proto._createLazyload = function() {
		this.on( 'select', this.lazyLoad );
	};

	proto.lazyLoad = function() {
		const lazyLoad = this.options.lazyLoad;
		if ( ! lazyLoad ) {
			return;
		}
		// get adjacent cells, use lazyLoad option for adjacent count
		const adjCount = typeof lazyLoad === 'number' ? lazyLoad : 0;
		const cellElems = this.getAdjacentCellElements( adjCount );
		// get lazy images in those cells
		let lazyImages = [];
		cellElems.forEach( function( cellElem ) {
			const lazyCellImages = getCellLazyImages( cellElem );
			lazyImages = lazyImages.concat( lazyCellImages );
		} );
		// load lazy images
		lazyImages.forEach( function( img ) {
			new LazyLoader( img, this );
		}, this );
	};

	function getCellLazyImages( cellElem ) {
		// check if cell element is lazy image
		if ( cellElem.nodeName === 'IMG' ) {
			const lazyloadAttr = cellElem.getAttribute( 'data-flickity-lazyload' );
			const srcAttr = cellElem.getAttribute( 'data-flickity-lazyload-src' );
			const srcsetAttr = cellElem.getAttribute( 'data-flickity-lazyload-srcset' );
			if ( lazyloadAttr || srcAttr || srcsetAttr ) {
				return [ cellElem ];
			}
		}
		// select lazy images in cell
		const lazySelector = 'img[data-flickity-lazyload], ' +
            'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
		const imgs = cellElem.querySelectorAll( lazySelector );
		return utils.makeArray( imgs );
	}

	// -------------------------- LazyLoader -------------------------- //

	function LazyLoader( img, flickity ) {
		this.img = img;
		this.flickity = flickity;
		this.load();
	}

	LazyLoader.prototype.handleEvent = utils.handleEvent;

	LazyLoader.prototype.load = function() {
		this.img.addEventListener( 'load', this );
		this.img.addEventListener( 'error', this );
		// get src & srcset
		const src = this.img.getAttribute( 'data-flickity-lazyload' ) ||
            this.img.getAttribute( 'data-flickity-lazyload-src' );
		const srcset = this.img.getAttribute( 'data-flickity-lazyload-srcset' );
		// set src & serset
		this.img.src = src;
		if ( srcset ) {
			this.img.setAttribute( 'srcset', srcset );
		}
		// remove attr
		this.img.removeAttribute( 'data-flickity-lazyload' );
		this.img.removeAttribute( 'data-flickity-lazyload-src' );
		this.img.removeAttribute( 'data-flickity-lazyload-srcset' );
	};

	LazyLoader.prototype.onload = function( event ) {
		this.complete( event, 'flickity-lazyloaded' );
	};

	LazyLoader.prototype.onerror = function( event ) {
		this.complete( event, 'flickity-lazyerror' );
	};

	LazyLoader.prototype.complete = function( event, className ) {
		// unbind events
		this.img.removeEventListener( 'load', this );
		this.img.removeEventListener( 'error', this );

		const cell = this.flickity.getParentCell( this.img );
		const cellElem = cell && cell.element;
		this.flickity.cellSizeChange( cellElem );

		this.img.classList.add( className );
		this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
	};

	// -----  ----- //

	Flickity.LazyLoader = LazyLoader;

	return Flickity;
} ) );

/*!
   * Flickity v2.2.1
   * Touch, responsive, flickable carousels
   *
   * Licensed GPLv3 for open source use
   * or Flickity Commercial License for commercial use
   *
   * https://flickity.metafizzy.co
   * Copyright 2015-2019 Metafizzy
   */

( function( window, factory ) {
	// universal module definition
	/* jshint strict: false */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity/js/index', [
			'./flickity',
			'./drag',
			'./prev-next-button',
			'./page-dots',
			'./player',
			'./add-remove-cell',
			'./lazyload',
		], factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			require( './flickity' ),
			require( './drag' ),
			require( './prev-next-button' ),
			require( './page-dots' ),
			require( './player' ),
			require( './add-remove-cell' ),
			require( './lazyload' )
		);
	}
}( window, function factory( Flickity ) {
	/*jshint strict: false*/
	return Flickity;
} ) );

/*!
   * Flickity asNavFor v2.0.2
   * enable asNavFor for Flickity
   */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
	// universal module definition
	/*jshint strict: false */ /*globals define, module, require */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'flickity-as-nav-for/as-nav-for', [
			'flickity/js/index',
			'fizzy-ui-utils/utils',
		], factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			require( 'flickity' ),
			require( 'fizzy-ui-utils' )
		);
	} else {
		// browser global
		window.Flickity = factory(
			window.Flickity,
			window.fizzyUIUtils
		);
	}
}( window, function factory( Flickity, utils ) {
	// -------------------------- asNavFor prototype -------------------------- //

	// Flickity.defaults.asNavFor = null;

	Flickity.createMethods.push( '_createAsNavFor' );

	const proto = Flickity.prototype;

	proto._createAsNavFor = function() {
		this.on( 'activate', this.activateAsNavFor );
		this.on( 'deactivate', this.deactivateAsNavFor );
		this.on( 'destroy', this.destroyAsNavFor );

		const asNavForOption = this.options.asNavFor;
		if ( ! asNavForOption ) {
			return;
		}
		// HACK do async, give time for other flickity to be initalized
		const _this = this;
		setTimeout( function initNavCompanion() {
			_this.setNavCompanion( asNavForOption );
		} );
	};

	proto.setNavCompanion = function( elem ) {
		elem = utils.getQueryElement( elem );
		const companion = Flickity.data( elem );
		// stop if no companion or companion is self
		if ( ! companion || companion === this ) {
			return;
		}

		this.navCompanion = companion;
		// companion select
		const _this = this;
		this.onNavCompanionSelect = function() {
			_this.navCompanionSelect();
		};
		companion.on( 'select', this.onNavCompanionSelect );
		// click
		this.on( 'staticClick', this.onNavStaticClick );

		this.navCompanionSelect( true );
	};

	proto.navCompanionSelect = function( isInstant ) {
		// wait for companion & selectedCells first. #8
		const companionCells = this.navCompanion && this.navCompanion.selectedCells;
		if ( ! companionCells ) {
			return;
		}
		// select slide that matches first cell of slide
		const selectedCell = companionCells[ 0 ];
		const firstIndex = this.navCompanion.cells.indexOf( selectedCell );
		const lastIndex = firstIndex + companionCells.length - 1;
		const selectIndex = Math.floor( lerp( firstIndex, lastIndex,
			this.navCompanion.cellAlign ) );
		this.selectCell( selectIndex, false, isInstant );
		// set nav selected class
		this.removeNavSelectedElements();
		// stop if companion has more cells than this one
		if ( selectIndex >= this.cells.length ) {
			return;
		}

		const selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
		this.navSelectedElements = selectedCells.map( function( cell ) {
			return cell.element;
		} );
		this.changeNavSelectedClass( 'add' );
	};

	function lerp( a, b, t ) {
		return ( b - a ) * t + a;
	}

	proto.changeNavSelectedClass = function( method ) {
		this.navSelectedElements.forEach( function( navElem ) {
			navElem.classList[ method ]( 'is-nav-selected' );
		} );
	};

	proto.activateAsNavFor = function() {
		this.navCompanionSelect( true );
	};

	proto.removeNavSelectedElements = function() {
		if ( ! this.navSelectedElements ) {
			return;
		}
		this.changeNavSelectedClass( 'remove' );
		delete this.navSelectedElements;
	};

	proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
		if ( typeof cellIndex === 'number' ) {
			this.navCompanion.selectCell( cellIndex );
		}
	};

	proto.deactivateAsNavFor = function() {
		this.removeNavSelectedElements();
	};

	proto.destroyAsNavFor = function() {
		if ( ! this.navCompanion ) {
			return;
		}
		this.navCompanion.off( 'select', this.onNavCompanionSelect );
		this.off( 'staticClick', this.onNavStaticClick );
		delete this.navCompanion;
	};

	// -----  ----- //

	return Flickity;
} ) );

/*!
   * imagesLoaded v4.1.4
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   */

( function( window, factory ) {
	'use strict';
	// universal module definition

	/*global define: false, module: false, require: false */

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( 'imagesloaded/imagesloaded', [
			'ev-emitter/ev-emitter',
		], function( EvEmitter ) {
			return factory( window, EvEmitter );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'ev-emitter' )
		);
	} else {
		// browser global
		window.imagesLoaded = factory(
			window,
			window.EvEmitter
		);
	}
}( typeof window !== 'undefined' ? window : this,

	// --------------------------  factory -------------------------- //

	function factory( window, EvEmitter ) {
		let $ = window.jQuery;
		const console = window.console;

		// -------------------------- helpers -------------------------- //

		// extend objects
		function extend( a, b ) {
			for ( const prop in b ) {
				a[ prop ] = b[ prop ];
			}
			return a;
		}

		const arraySlice = Array.prototype.slice;

		// turn element or nodeList into an array
		function makeArray( obj ) {
			if ( Array.isArray( obj ) ) {
				// use object if already an array
				return obj;
			}

			const isArrayLike = typeof obj === 'object' && typeof obj.length === 'number';
			if ( isArrayLike ) {
				// convert nodeList to array
				return arraySlice.call( obj );
			}

			// array of single index
			return [ obj ];
		}

		// -------------------------- imagesLoaded -------------------------- //

		function ImagesLoaded( elem, options, onAlways ) {
			// coerce ImagesLoaded() without new, to be new ImagesLoaded()
			if ( ! ( this instanceof ImagesLoaded ) ) {
				return new ImagesLoaded( elem, options, onAlways );
			}
			// use elem as selector string
			let queryElem = elem;
			if ( typeof elem === 'string' ) {
				queryElem = document.querySelectorAll( elem );
			}
			// bail if bad element
			if ( ! queryElem ) {
				console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
				return;
			}

			this.elements = makeArray( queryElem );
			this.options = extend( {}, this.options );
			// shift arguments if no options set
			if ( typeof options === 'function' ) {
				onAlways = options;
			} else {
				extend( this.options, options );
			}

			if ( onAlways ) {
				this.on( 'always', onAlways );
			}

			this.getImages();

			if ( $ ) {
				// add jQuery Deferred object
				this.jqDeferred = new $.Deferred();
			}

			// HACK check async to allow time to bind listeners
			setTimeout( this.check.bind( this ) );
		}

		ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

		ImagesLoaded.prototype.options = {};

		ImagesLoaded.prototype.getImages = function() {
			this.images = [];

			// filter & find items if we have an item selector
			this.elements.forEach( this.addElementImages, this );
		};

		ImagesLoaded.prototype.addElementImages = function( elem ) {
			// filter siblings
			if ( elem.nodeName === 'IMG' ) {
				this.addImage( elem );
			}
			// get background image on element
			if ( this.options.background === true ) {
				this.addElementBackgroundImages( elem );
			}

			// find children
			// no non-element nodes, #143
			const nodeType = elem.nodeType;
			if ( ! nodeType || ! elementNodeTypes[ nodeType ] ) {
				return;
			}
			const childImgs = elem.querySelectorAll( 'img' );
			// concat childElems to filterFound array
			for ( let i = 0; i < childImgs.length; i++ ) {
				const img = childImgs[ i ];
				this.addImage( img );
			}

			// get child background images
			if ( typeof this.options.background === 'string' ) {
				const children = elem.querySelectorAll( this.options.background );
				for ( let i = 0; i < children.length; i++ ) {
					const child = children[ i ];
					this.addElementBackgroundImages( child );
				}
			}
		};

		const elementNodeTypes = {
			1: true,
			9: true,
			11: true,
		};

		ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
			// eslint-disable-next-line no-undef
			const style = getComputedStyle( elem );
			if ( ! style ) {
				// Firefox returns null if in a hidden iframe https://bugzil.la/548397
				return;
			}
			// get url inside url("...")
			const reURL = /url\((['"])?(.*?)\1\)/gi;
			let matches = reURL.exec( style.backgroundImage );
			while ( matches !== null ) {
				const url = matches && matches[ 2 ];
				if ( url ) {
					this.addBackground( url, elem );
				}
				matches = reURL.exec( style.backgroundImage );
			}
		};

		ImagesLoaded.prototype.addImage = function( img ) {
			const loadingImage = new LoadingImage( img );
			this.images.push( loadingImage );
		};

		ImagesLoaded.prototype.addBackground = function( url, elem ) {
			const background = new Background( url, elem );
			this.images.push( background );
		};

		ImagesLoaded.prototype.check = function() {
			const _this = this;
			this.progressedCount = 0;
			this.hasAnyBroken = false;
			// complete if no images
			if ( ! this.images.length ) {
				this.complete();
				return;
			}

			function onProgress( image, elem, message ) {
				// HACK - Chrome triggers event before object properties have changed. #83
				setTimeout( function() {
					_this.progress( image, elem, message );
				} );
			}

			this.images.forEach( function( loadingImage ) {
				loadingImage.once( 'progress', onProgress );
				loadingImage.check();
			} );
		};

		ImagesLoaded.prototype.progress = function( image, elem, message ) {
			this.progressedCount++;
			this.hasAnyBroken = this.hasAnyBroken || ! image.isLoaded;
			// progress event
			this.emitEvent( 'progress', [ this, image, elem ] );
			if ( this.jqDeferred && this.jqDeferred.notify ) {
				this.jqDeferred.notify( this, image );
			}
			// check if completed
			if ( this.progressedCount === this.images.length ) {
				this.complete();
			}

			if ( this.options.debug && console ) {
				console.log( 'progress: ' + message, image, elem );
			}
		};

		ImagesLoaded.prototype.complete = function() {
			const eventName = this.hasAnyBroken ? 'fail' : 'done';
			this.isComplete = true;
			this.emitEvent( eventName, [ this ] );
			this.emitEvent( 'always', [ this ] );
			if ( this.jqDeferred ) {
				const jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
				this.jqDeferred[ jqMethod ]( this );
			}
		};

		// --------------------------  -------------------------- //

		function LoadingImage( img ) {
			this.img = img;
		}

		LoadingImage.prototype = Object.create( EvEmitter.prototype );

		LoadingImage.prototype.check = function() {
			// If complete is true and browser supports natural sizes,
			// try to check for image status manually.
			const isComplete = this.getIsImageComplete();
			if ( isComplete ) {
				// report based on naturalWidth
				this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
				return;
			}

			// If none of the checks above matched, simulate loading on detached element.
			// eslint-disable-next-line no-undef
			this.proxyImage = new Image();
			this.proxyImage.addEventListener( 'load', this );
			this.proxyImage.addEventListener( 'error', this );
			// bind to image as well for Firefox. #191
			this.img.addEventListener( 'load', this );
			this.img.addEventListener( 'error', this );
			this.proxyImage.src = this.img.src;
		};

		LoadingImage.prototype.getIsImageComplete = function() {
			// check for non-zero, non-undefined naturalWidth
			// fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
			return this.img.complete && this.img.naturalWidth;
		};

		LoadingImage.prototype.confirm = function( isLoaded, message ) {
			this.isLoaded = isLoaded;
			this.emitEvent( 'progress', [ this, this.img, message ] );
		};

		// ----- events ----- //

		// trigger specified handler for event type
		LoadingImage.prototype.handleEvent = function( event ) {
			const method = 'on' + event.type;
			if ( this[ method ] ) {
				this[ method ]( event );
			}
		};

		LoadingImage.prototype.onload = function() {
			this.confirm( true, 'onload' );
			this.unbindEvents();
		};

		LoadingImage.prototype.onerror = function() {
			this.confirm( false, 'onerror' );
			this.unbindEvents();
		};

		LoadingImage.prototype.unbindEvents = function() {
			this.proxyImage.removeEventListener( 'load', this );
			this.proxyImage.removeEventListener( 'error', this );
			this.img.removeEventListener( 'load', this );
			this.img.removeEventListener( 'error', this );
		};

		// -------------------------- Background -------------------------- //

		function Background( url, element ) {
			this.url = url;
			this.element = element;
			// eslint-disable-next-line no-undef
			this.img = new Image();
		}

		// inherit LoadingImage prototype
		Background.prototype = Object.create( LoadingImage.prototype );

		Background.prototype.check = function() {
			this.img.addEventListener( 'load', this );
			this.img.addEventListener( 'error', this );
			this.img.src = this.url;
			// check if image is already complete
			const isComplete = this.getIsImageComplete();
			if ( isComplete ) {
				this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
				this.unbindEvents();
			}
		};

		Background.prototype.unbindEvents = function() {
			this.img.removeEventListener( 'load', this );
			this.img.removeEventListener( 'error', this );
		};

		Background.prototype.confirm = function( isLoaded, message ) {
			this.isLoaded = isLoaded;
			this.emitEvent( 'progress', [ this, this.element, message ] );
		};

		// -------------------------- jQuery -------------------------- //

		ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
			jQuery = jQuery || window.jQuery;
			if ( ! jQuery ) {
				return;
			}
			// set local variable
			$ = jQuery;
			// $().imagesLoaded()
			$.fn.imagesLoaded = function( options, callback ) {
				const instance = new ImagesLoaded( this, options, callback );
				return instance.jqDeferred.promise( $( this ) );
			};
		};
		// try making plugin
		ImagesLoaded.makeJQueryPlugin();

		// --------------------------  -------------------------- //

		return ImagesLoaded;
	} ) );

/*!
   * Flickity imagesLoaded v2.0.0
   * enables imagesLoaded option for Flickity
   */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
	// universal module definition
	/*jshint strict: false */ /*globals define, module, require */
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [
			'flickity/js/index',
			'imagesloaded/imagesloaded',
		], function( Flickity, imagesLoaded ) {
			return factory( window, Flickity, imagesLoaded );
		} );
	} else if ( typeof module === 'object' && module.exports ) {
		// CommonJS
		module.exports = factory(
			window,
			require( 'flickity' ),
			require( 'imagesloaded' )
		);
	} else {
		// browser global
		window.Flickity = factory(
			window,
			window.Flickity,
			window.imagesLoaded
		);
	}
}( window, function factory( window, Flickity, imagesLoaded ) {
	'use strict';

	Flickity.createMethods.push( '_createImagesLoaded' );

	const proto = Flickity.prototype;

	proto._createImagesLoaded = function() {
		this.on( 'activate', this.imagesLoaded );
	};

	proto.imagesLoaded = function() {
		if ( ! this.options.imagesLoaded ) {
			return;
		}
		const _this = this;
		function onImagesLoadedProgress( instance, image ) {
			const cell = _this.getParentCell( image.img );
			_this.cellSizeChange( cell && cell.element );
			if ( ! _this.options.freeScroll ) {
				_this.positionSliderAtSelected();
			}
		}
		imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
	};

	return Flickity;
} ) );

