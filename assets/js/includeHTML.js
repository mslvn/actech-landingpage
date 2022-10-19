
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
	elmnt = z[i];
	/*search for elements with a certain atrribute:*/
	file = elmnt.getAttribute("w3-include-html");
	if (file) {
	  /* Make an HTTP request using the attribute value as the file name: */
	  xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
		  /* Remove the attribute, and call this function once more: */
		  elmnt.removeAttribute("w3-include-html");
		  includeHTML();
		}
	  }
	  xhttp.open("GET", file, true);
	  xhttp.send();
	  /* Exit the function: */
	  return;
	}
  }
}
includeHTML();

// Background star.net
// particlesJS("background", {
// 	"particles": {
// 		"number": {
// 		"value": 100,
// 		"density": {
// 			"enable": true,
// 			"value_area": 800
// 		}
// 		},
// 		"color": {
// 		"value": "#aaafff"
// 		},
// 		"shape": {
// 		"type": "circle",
// 		"stroke": {
// 			"width": 0,
// 			"color": "#aaa000"
// 		},
// 		"polygon": {
// 			"nb_sides": 5
// 		},
// 		"image": {
// 			"src": "img/github.svg",
// 			"width": 100,
// 			"height": 100
// 		}
// 		},
// 		"opacity": {
// 		"value": 0.5,
// 		"random": false,
// 		"anim": {
// 			"enable": false,
// 			"speed": 1,
// 			"opacity_min": 0.1,
// 			"sync": false
// 		}
// 		},
// 		"size": {
// 		"value": 3,
// 		"random": true,
// 		"anim": {
// 			"enable": false,
// 			"speed": 40,
// 			"size_min": 0.1,
// 			"sync": false
// 		}
// 		},
// 		"line_linked": {
// 		"enable": true,
// 		"distance": 150,
// 		"color": "#aaafff",
// 		"opacity": 0.4,
// 		"width": 1
// 		},
// 		"move": {
// 		"enable": true,
// 		"speed": 6,
// 		"direction": "none",
// 		"random": false,
// 		"straight": false,
// 		"out_mode": "out",
// 		"bounce": false,
// 		"attract": {
// 			"enable": false,
// 			"rotateX": 600,
// 			"rotateY": 1200
// 		}
// 		}
// 	},
// 	"interactivity": {
// 		"detect_on": "canvas",
// 		"events": {
// 		"onhover": {
// 			"enable": true,
// 			"mode": "grab"
// 		},
// 		"onclick": {
// 			"enable": true,
// 			"mode": "push"
// 		},
// 		"resize": true
// 		},
// 		"modes": {
// 		"grab": {
// 			"distance": 140,
// 			"line_linked": {
// 			"opacity": 1
// 			}
// 		},
// 		"bubble": {
// 			"distance": 400,
// 			"size": 40,
// 			"duration": 2,
// 			"opacity": 8,
// 			"speed": 3
// 		},
// 		"repulse": {
// 			"distance": 200,
// 			"duration": 0.4
// 		},
// 		"push": {
// 			"particles_nb": 4
// 		},
// 		"remove": {
// 			"particles_nb": 2
// 		}
// 		}
// 	},
// 	"retina_detect": true
// });
