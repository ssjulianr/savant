// Create a new XMLHttpRequest object
let http = new XMLHttpRequest();

// Specify the request method, URL and set async to true
http.open('get', 'products.json', true);

// Send the request to the server
http.send();

// When the server responds, execute this function
http.onload = function(){

	// Check if the request was successful and the response has been received
	if(this.readyState == 4 && this.status == 200){

		// Parse the response text as JSON and store it in the 'products' variable
		let products = JSON.parse(this.responseText);

		// Create an empty string that will be used to store the HTML elements
		let output = "";

		// Loop through each product in the 'products' array
		for(let item of products){

			// Create HTML elements for the product and add them to the 'output' string
			output += `
			<div class="pro" onclick="window.location.href='${item.detail}';">
                <img src="${item.image}" alt="${item.alt}">
                <div class="des">
                    <span>${item.brand} ${item.type}</span>
                    <h5>${item.description}</h5>
                    <div class="star">
                        ${item.rating}
                    </div>
                    <h4>${item.price}</h4>
                </div>
                <a href="#"><i id="cart" class="fa-solid fa-cart-shopping"></i></a>
            </div>
			`;
		}

		// Set the innerHTML of the container element to the 'output' string
		document.querySelector(".pro-container").innerHTML = output;
	}
} 

// Get references to the hamburger menu elements
const bar = document.getElementById('bar');
const close = document.getElementById('close')
const nav = document.getElementById('navbar');

// Add an event listener to the 'bar' element
if (bar) {
	bar.addEventListener('click', () =>{
		// Toggle the 'active' class on the navigation menu
		nav.classList.add('active')
	})
}

// Add an event listener to the 'close' element
if (close) {
	close.addEventListener('click', () =>{
		// Remove the 'active' class from the navigation menu
		nav.classList.remove('active')
	})
}

// Get references to the slideshow elements
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let currentSlide = 0;

// Define a function that shows a specific slide
function showSlide(n) {
	// Remove the 'active' class from the current slide
	slides[currentSlide].classList.remove("active");
	// Set the current slide index to the new index, wrapping around to the start or end if necessary
	currentSlide = (n + slides.length) % slides.length;
	// Add the 'active' class to the new slide
	slides[currentSlide].classList.add("active");
}

// Define a function that automatically cycles through the slides
function autoPlay() {
	// Call the 'showSlide' function with the next slide index every 5 seconds
	setInterval(() => {
		showSlide(currentSlide + 1);
	}, 5000);
}

// Call the 'autoPlay' function to start the slideshow
autoPlay();

// Add event listeners to the previous and next buttons
prev.addEventListener("click", () => showSlide(currentSlide - 1));
next.addEventListener("click", () => showSlide(currentSlide + 1));
