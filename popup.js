/**
 * to set r g b values in the text input
 * (will check if the values are legal)
 * @param r the value of red we would like to set; null if not changing.
 * @param g the value of green we would like to set; null if not changing.
 * @param b the value of blue we would like to set; null if not changing.
 * @return nothing
 */
function setRGBValues(r, g, b) {
	if(r != null)
		if(r == '')
			document.getElementById('r_value').value = 0;
		else
			document.getElementById('r_value').value = (r > 255) ? 255 : (r < 0) ? 0 : r;
	if(g != null)
		if(g == '')
			document.getElementById('g_value').value = 0;
		else
			document.getElementById('g_value').value = (g > 255) ? 255 : (g < 0) ? 0 : g;
	if(b != null)
		if(b == '')
			document.getElementById('b_value').value = 0;
		else
			document.getElementById('b_value').value = (b > 255) ? 255 : (b < 0) ? 0 : b;
}

/**
 * to get r g b values in the text input
 * @return an object with three keys, 'r', 'g', 'b';
 */
function getRGBValues() {
	var ret = {};
	ret.r = document.getElementById('r_value').value;
	ret.g = document.getElementById('g_value').value;
	ret.b = document.getElementById('b_value').value;
	return ret;
}

/**
 * setting up 'onchange' and 'onkeyup' event listener for text input r, g, b
 */
function setTextInputOnChangeListener() {
	// get the text input elements
	var elements =  [];
	elements.push(document.getElementById("r_value"));
	elements.push(document.getElementById("g_value"));
	elements.push(document.getElementById("b_value"));

	// add event listener
	for(var i=0; i<elements.length; i++) {
		elements[i].addEventListener("change", function() {
			var val = getRGBValues();
			setRGBValues(val.r, val.g, val.b);
			fireTheChange();
		});
		elements[i].addEventListener("keyup", function() {
			var val = getRGBValues();
			setRGBValues(val.r, val.g, val.b);
			fireTheChange();
		});
	}
}

/**
 * setting up the plus and minus buttons for r, g, b
 */
function setPlusAndMinusButton() {
	// for r_plus
	document.getElementById('r_plus').addEventListener('click', function() {
		setRGBValues(parseInt(document.getElementById('r_value').value) + 1, null, null);
		fireTheChange();
	});
	// for r_minus
	document.getElementById('r_minus').addEventListener('click', function() {
		setRGBValues(parseInt(document.getElementById('r_value').value) - 1, null, null);
		fireTheChange();
	});
	// for g_plus
	document.getElementById('g_plus').addEventListener('click', function() {
		setRGBValues(null, parseInt(document.getElementById('g_value').value) + 1, null);
		fireTheChange();
	});
	// for g_minus
	document.getElementById('g_minus').addEventListener('click', function() {
		setRGBValues(null, parseInt(document.getElementById('g_value').value) - 1, null);
		fireTheChange();
	});
	// for b_plus
	document.getElementById('b_plus').addEventListener('click', function() {
		setRGBValues(null, null, parseInt(document.getElementById('b_value').value) + 1);
		fireTheChange();
	});
	// for b_minus
	document.getElementById('b_minus').addEventListener('click', function() {
		setRGBValues(null, null, parseInt(document.getElementById('b_value').value) - 1);
		fireTheChange();
	});
}

/**
 * firing the color changing
 */
function fireTheChange() {
	// show the new value
	var rgbValues = getRGBValues();
	var rgbString = '(' + rgbValues.r + ', ' + rgbValues.g + ', ' + rgbValues.b + ')'; // ex. "(13, 23, 123)"
	document.getElementById('result').innerHTML = 'the rgb = ' + rgbString;
	// fire the color change
	var codeString = 'document.body.style.backgroundColor = "rgb' + rgbString + '";';
	chrome.tabs.executeScript(null, {code: codeString}, null);
}

/**
 * main entry here
 */
document.addEventListener("DOMContentLoaded", function(event) {
	setRGBValues(0, 0, 0);
	setTextInputOnChangeListener();
	setPlusAndMinusButton();
});




