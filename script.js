// xmlhttp-request creates a new object that interacts with the servers.
let http = new XMLHttpRequest();
// the variable http holds now all methods and properties of the objct.

//  next i prepare the request with the open() method.
http.open('get', 'products.json', true);
// the first argument sets the http method.
// in the second argument we pass the file where our data lives.
// and last the keyword true, sets the request to be async.

// next i will send the request.
http.send();

// Now i have to catch the response.
// i will check the onload eventlistener.
http.onload = function(){
	// Inside the function i need to check the readystate and status properties.
	if(this.readyState == 4 && this.status == 200){
		// if we have a successful response, i have to parse the json data
		// and convert them to a javascript array.
		let products = JSON.parse(this.responseText);

		// next i need an empty variable to add the incoming data.
		let output = "";

		// now i have to loop trough the products, and in every iteration
		// i add an html template to the output variable.
		for(let item of products){
			output += `
			<div class="pro" onclick="window.location.href='${item.detail}';">
                <img src="${item.image}" alt="${item.alt}">
                <div class="des">
                    <span>${item.title} ${item.type}</span>
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
		/* and last i target the products container and add the data that the
		output variable holds. */
		document.querySelector(".pro-container").innerHTML = output;
	}
} 

//Hamburger Menu

const bar = document.getElementById('bar');
const close = document.getElementById('close')
const nav = document.getElementById('navbar');

if (bar) {
	bar.addEventListener('click', () =>{
		nav.classList.add('active')
	})
}

if (close) {
	close.addEventListener('click', () =>{
		nav.classList.remove('active')
	})
}


//Slideshow
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function autoPlay() {
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

autoPlay();

prev.addEventListener("click", () => showSlide(currentSlide - 1));
next.addEventListener("click", () => showSlide(currentSlide + 1));
