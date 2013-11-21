/* global jQuery:true */
(function() {
  'use strict';
  var isTouch = 'ontouchstart' in window || 'msmaxtouchpoints' in window.navigator;

  function Touche(nodes) {
    // Doing this allows the developer to omit the `new` keyword from their calls to Touche
    if (!(this instanceof Touche)) {
      return new Touche(nodes);
    }

    if (!nodes) {
      throw new Error('No DOM elements passed into Touche');
    }

    this.nodes = nodes;

    return this;
  }

  // Our own event handler
  Touche.prototype.on = function(event, fn) {
    var touchend, nodes = this.nodes,
      len = nodes.length,
      ev;

    if (isTouch && event === 'click') {
      touchend = true;
    }

    ev = function(el, event, fn) {
      var called, once = function() {
          if (!called && (called = true)) {
            fn.apply(this, arguments);
          }
        };

      el.addEventListener(event, once, false);

      if (touchend) {
        el.addEventListener('touchend', once, false);
      }
    };

    // NodeList or just a Node?
    if (len) {
      while (len--) {
        ev(nodes[len], event, fn);
      }
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
      
      if( event.slice(0, 4) == 'click' )
        arguments[0] = event.replace('click', 'touchend');
        
      originalOnMethod.apply(this, arguments);
      return this;
    };
  }
})();
