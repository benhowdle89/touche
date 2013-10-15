Touche.js
======

## Effortlessly re-map click events to touch events on touchscreen UIs

[Full docs &rarr;](http://benhowdle.im/touche)

<ul>
		<li>Removes the 300ms delay (after the user lifts their finger), applied by all touchscreens devices and immediately invokes your click handlers.</li>
		<li>Takes your click events applied with jQuery and silently re-maps them to the "touchend" event for devices that support touch.</li>
		<li>If you're not using jQuery, then Touche exposes a method "on" for your use like so:</li>
</ul>
	Touche(NodeList/Node).on('click', function(){ // handler })

### Usage

	<!-- somewhere before the rest of your JavaScript code -->
	<script type="text/javascript" src="/path/to/touche.js"></script>


### Examples

	// applying a click event to one element

	Touche(document.querySelector('#myButton')).on('click', handleClick);

	// or to multiple at once

	Touche(document.querySelectorAll('.myButtons')).on('click', handleClicks);

	// or with jQuery

	$('.myButtons').on('click', handleClicks);


