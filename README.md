# Touche.js
======

## Effortlessly re-map click events to touch events on touchscreen UIs

[Full docs](http://benhowdle.im/touche)

<ul>
		<li>Takes your click events applied with JavaScript or jQuery and silently re-maps them to the "touchend" event for devices that support touch.</li>
		<li>Removes the 300ms delay (after the user lifts their finger), applied by all touchscreens devices and immediately invokes your click handlers.</li>
		<li>Works interchangeably with JavaScript click events or jQuery applied click events (through jQuery's .on() method).</li>
</ul>

### Usage

	<!-- somewhere before the rest of your JavaScript code -->
	<script type="text/javascript" src="/path/to/touche.js"></script>
	

### Examples

	// applying a click event to one element
	 
	document.querySelector('#myButton').on('click', handleClick);
	 
	// or to multiple at once
	 
	document.querySelectorAll('.myButtons').on('click', handleClicks);
	 
	// or with jQuery
	 
	$('.myButtons').on('click', handleClicks);


