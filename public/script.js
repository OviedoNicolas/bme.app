var headerScroll = document.querySelector("#header-scroll");
var scrollUp = "scroll-up";
var scrollDown = "scroll-down";
var lastScroll = 0;

window.addEventListener("scroll", () => {

    var currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        headerScroll.classList.remove(scrollUp);
        return;
    }
    if (currentScroll > lastScroll && !headerScroll.classList.contains(scrollDown) && currentScroll > 200) {
        headerScroll.classList.remove(scrollUp);
        headerScroll.classList.add(scrollDown);
    } else if (currentScroll < lastScroll && headerScroll.classList.contains(scrollDown) && currentScroll < 300) {
        headerScroll.classList.remove(scrollDown);
        headerScroll.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
});

/*
let parallax = document.getElementById("section-parallax");
let parallaxfilter = document.getElementById("section-parallax-filter");

window.addEventListener('scroll', function () {
    var value = window.scrollY;

    parallax.style.backgroundPositionY = `${value - 150}px`;
    parallaxfilter.style.backgroundPositionY = `${value - 150}px`;
})*/