
let hamburger = document.querySelector('.hamburger');
let list = document.querySelector('.nav-menu');
let imgNum = 0;
let imgSliderPr = document.querySelector('#img-slider-pr');
let imgSliderNe = document.querySelector('#img-slider-ne');

hamburger.addEventListener('click', (e) => {
	list.classList.toggle('show');
	event.stopPropagation();
})

document.body.addEventListener('click', () => {
	list.classList.remove('show');
});

window.addEventListener('resize', () => {
	if (window.innerWidth >= 800) {
		list.classList.remove('show');
	}
});

function changeImg(ms) {
	let prevImg = document.querySelector(`#showcase-${imgNum+1}`);
	imgNum = (imgNum + 1) % 3;
	let newImg = document.querySelector(`#showcase-${imgNum+1}`);
	fadeOutImg(prevImg, ms/2, newImg, ms/2);
}

function fadeOutImg(img, ms, nextImg, nextMs) {
	img.style.opacity = 1;
	let f = setInterval(() => {
		img.style.opacity = parseFloat(img.style.opacity) - 0.02;
		if (img.style.opacity < 0.1) {
			fadeInImg(nextImg, nextMs);
			img.classList.add('hideDisplay');
			img.classList.remove('displayFlex');
			clearInterval(f);
		}
	}, ms / 50);
}

function fadeInImg(img, ms) {
	img.style.opacity = 0;
	img.classList.remove('hideDisplay');
	img.classList.add('displayFlex');
	let f = setInterval(() => {
		img.style.opacity = parseFloat(img.style.opacity) + 0.02;
		if (img.style.opacity > 0.9) {
			clearInterval(f);
		}
	}, ms / 50);
}

fadeInImg(document.querySelector(`#showcase-${imgNum+1}`), 2000);
let imgSlider = setInterval(() => {
	changeImg(2000);
	}, 7000);



imgSliderPr.addEventListener('click', (e) => {
	// clear previous slider.
	clearInterval(imgSlider);

	// fade the current and previous images
	let ms = 2000;
	let currentImg = document.querySelector(`#showcase-${imgNum+1}`);
	imgNum = (imgNum + 2) % 3;
	let prevImg = document.querySelector(`#showcase-${imgNum+1}`);
	fadeOutImg(currentImg, ms/2, prevImg, ms/2);

	// start a new slider.
	imgSlider = setInterval(() => {
	changeImg(2000);
	}, 7000);
});

imgSliderNe.addEventListener('click', (e) => {
	// clear previous slider.
	clearInterval(imgSlider);

	//fade images
	changeImg(2000);
	
	// start a new slider.
	imgSlider = setInterval(() => {
	changeImg(2000);
	}, 7000);
});