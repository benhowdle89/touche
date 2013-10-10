(function(d, Touche) {
	Touche.touch = (typeof Touche.touch !== 'undefined') ? Touche.touch : "ontouchstart" in d.documentElement;

	Node.prototype.on = function(event, fn) {
		if (Touche.touch) {
			event = (event == 'click') ? 'touchend' : event;
		}
		this.addEventListener(event, fn, false);
		return this;
	};

	NodeList.prototype.on = function(event, fn) {
		Array.prototype.forEach.call(this, function(el) {
			el.on(event, fn);
		});
		return this;
	};
	
	if(window.jQuery && Touche.touch){
		// Store a reference to the original remove method.
		var originalOnMethod = jQuery.fn.on;
		
		// Define overriding method.
		jQuery.fn.on = function () {
			
			// Log the fact that we are calling our override.
			var event = arguments[0];
			arguments[0] = (event == 'click') ? 'touchend' : event;
			
			// Execute the original method.
			originalOnMethod.apply(this, arguments);
		}
	}


})(document, window.Touche = {});

document.body.on('click', function() {
	alert('clicked');
});
