
// disable links as they don't go to any real pages.
let links = document.getElementsByTagName('a');
for (let i=0; i<links.length; i++) {
    links[i].addEventListener('click', (e) => {
        e.preventDefault();
    });
}

/* HAMBURGER MENU */

let hamburger = document.querySelector(".hamburger");
let list = document.querySelector(".nav-menu");

hamburger.addEventListener("click", (e) => {
    list.classList.toggle("show");
    event.stopPropagation();
});

document.body.addEventListener("click", () => {
    list.classList.remove("show");
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 800) {
        list.classList.remove("show");
    }
});


/* SLIDERS */

    /* SLIDER CONSTANTS */
const imgSliderPr = document.querySelector("#img-slider-pr");
const imgSliderNe = document.querySelector("#img-slider-ne");
const imgShowTime = 7000; // ms
const imageTransitionTime = 2000; // ms
const opacityInterval = 0.02;

const boxSliderPr = document.querySelector("#box-slider-pr");
const boxSliderNe = document.querySelector("#box-slider-ne");
const boxShowTime = 7000;
const boxTransitionTime = 1000;

const counters = [0, 0]; // img counter is first, then box counter.
const numOfImgs = 3;
const numOfBoxes = 3;


    /* SLIDER FUNCIONS */
function change(direction="normal", ms, prefix, counterIndex, maxNum, classHide, classShow) {
    let curr = document.querySelector(`#${prefix}-${counters[counterIndex]+1}`);
    if (direction === "reverse") {
        counters[counterIndex] = (counters[counterIndex] + 2) % maxNum;
    } else {
        counters[counterIndex] = (counters[counterIndex] + 1) % maxNum;
    }
    let next = document.querySelector(`#${prefix}-${counters[counterIndex]+1}`);
    fadeOut(curr, ms/2, opacityInterval, fadeIn, next, ms/2, classHide, classShow);
}

function fadeOut(curr, ms, opacityInterval, nextFunc, next, nextMs, classHide, classShow) {
    curr.style.opacity = 1;
    let f = setInterval(() => {
        curr.style.opacity = parseFloat(curr.style.opacity) - opacityInterval;
        if (curr.style.opacity < opacityInterval) {
            next.style.opacity = 0;
            next.classList.remove(classHide);
            next.classList.add(classShow);

            nextFunc(next, nextMs, opacityInterval, classHide, classShow);
            curr.classList.add(classHide);
            curr.classList.remove(classShow);
            clearInterval(f);
        }
    }, ms * opacityInterval);
}

function fadeIn(curr, ms, opacityInterval, classHide, classShow) {
    curr.style.opacity = 0;
    curr.classList.remove(classHide);
    curr.classList.add(classShow);
    let f = setInterval(() => {
        curr.style.opacity = parseFloat(curr.style.opacity) + opacityInterval;
        if (curr.style.opacity > 1 - opacityInterval) {
            clearInterval(f);
        }
    }, ms * opacityInterval);
}

    /* IMAGE SLIDER SPECIFIC */
function changeImg(direction) {
    change(direction, imageTransitionTime, 'showcase', 0, numOfImgs, 'hideDisplay', 'displayFlex');
}

fadeIn(document.querySelector(`#showcase-${counters[0]+1}`), imageTransitionTime, opacityInterval, 'hideDisplay', 'displayFlex');
let imgSlider = setInterval(() => {
    changeImg();
    }, imgShowTime+imageTransitionTime);


imgSliderPr.addEventListener("click", () => {
    // clear previous slider.
    clearInterval(imgSlider);

    // fade the current and previous images
    changeImg("reverse");

    // start a new slider.
    imgSlider = setInterval(changeImg, imgShowTime+imageTransitionTime);
});


imgSliderNe.addEventListener("click", () => {
    // clear previous slider.
    clearInterval(imgSlider);

    // immediately change images
    changeImg();

    // start a new slider
    imgSlider = setInterval(changeImg, imgShowTime+imageTransitionTime);
});


    /* TESTIMONIAL SLIDER SPECIFIC */

function changeBox(direction) {
    change(direction, boxTransitionTime, 'box', 1, numOfBoxes, 'hideDisplay', 'displayBlock');
}

let boxSlider = setInterval(() => {
    changeBox();
    }, boxShowTime+boxTransitionTime);

boxSliderPr.addEventListener("click", () => {
    // clear previous slider.
    clearInterval(boxSlider);

    // change box immediately
    changeBox("reverse");
    
    // start a new slider.
    boxSlider = setInterval(changeBox, boxShowTime+boxTransitionTime);
});

boxSliderNe.addEventListener("click", () => {
    // clear previous slider.
    clearInterval(boxSlider);

    // change box immediately
    changeBox();
    
    // start a new slider.
    boxSlider = setInterval(changeBox, boxShowTime+boxTransitionTime);
});
