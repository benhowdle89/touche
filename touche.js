(function() {
  var isTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;

  function Touche(nodes) {
    // Doing this allows the developer to omit the `new` keyword from their calls to Touche
    if(!(this instanceof Touche)) return new Touche(nodes);

    if (!nodes) {
      throw new Error('No DOM elements passed into Touche');
    }

    this.nodes = nodes;

    return this;
  }

  // Our own event handler
  Touche.prototype.on = function(event, fn) {
    var touchend, nodes = this.nodes, len = nodes.length;

    if (isTouch && event === 'click') {
      touchend = true;
    }

    // Abstraction for addEventListener
    function ev(el, event, fn) {
      el.addEventListener(touchend ? 'touchend' : event, function() {
        fn.apply(this, arguments);
      }, false);
    }

    // NodeList or just a Node?
    if (len) {
      while (len--) ev(nodes[len], event, fn);
    } else {
      ev(nodes, event, fn);
    }

    return this;
  };

  // Expose Touche
  window.Touche = Touche;

  // Has the developer used jQuery?
  if (window.jQuery && isTouch) {
    var originalOnMethod = jQuery.fn.on;
    
    // Change event type and re-apply .on() method
    jQuery.fn.on = function() {
      var event = arguments[0];
      arguments[0] = event === 'click' ? 'touchend' : event;
      originalOnMethod.apply(this, arguments);
    };
  }
})();
