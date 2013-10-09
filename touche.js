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


})(document, window.Touche = {});

document.body.on('click', function() {
	alert('clicked');
});