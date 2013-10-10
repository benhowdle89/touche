(function() {
	var isTouch = "ontouchstart" in document.documentElement;

	Node.prototype.on = function(event, fn) {
		if (isTouch) {
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
	
	if(window.jQuery && isTouch){
		var originalOnMethod = jQuery.fn.on;
		
		jQuery.fn.on = function () {
			var event = arguments[0];
			arguments[0] = (event === 'click') ? 'touchend' : event;
			originalOnMethod.apply(this, arguments);
		};
	}
})();
