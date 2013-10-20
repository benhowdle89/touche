(function() {
	var isTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;

	function Touche(nodes) {
		
		// doing this allows the developer to omit the `new` keyword from their calls to Touche
		if(!(this instanceof Touche)) return new Touche(nodes);
		
		if (!nodes) {
			throw new Error('No DOM elements passed into Touche');
		}
		this.nodes = nodes;
		return this;
		
	}

	// our own event handler
	Touche.prototype.on = function(event, fn) {

		if (isTouch) {
			event = (event == 'click') ? 'touchend' : event;
		}

		// abstraction for addEventListener

		function ev(el, event, fn) {
			el.addEventListener(event, fn, false);
		}

		var nodes = this.nodes,
			len = nodes.length;

		// is it a NodeList or just a Node?
		if (len) {
			while (len--) {
				ev(nodes[len], event, fn);
			}
		} else {
			ev(nodes, event, fn);
		}

		return this;

	};

	// expose Touche
	window.Touche = Touche;

	// has the developer used jQuery?
	if (window.jQuery && isTouch) {
		var originalOnMethod = jQuery.fn.on;

		// change event type and re-apply .on() method
		jQuery.fn.on = function() {
			var event = arguments[0];
			arguments[0] = (event === 'click') ? 'touchend' : event;
			originalOnMethod.apply(this, arguments);
		};
	}
})();
