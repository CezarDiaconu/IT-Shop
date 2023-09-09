/*navbar*/
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
 }
 $(document).ready(function() {
    // Add smooth scrolling to all links with the "nav-link" class
    $(".nav-link").on('click', function(event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Use jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});
  /*navbar*/

/* items */
$(document).ready(function() {
    $(".divbutton").hide(); // Hide all buttons initially

    $(".image-container")
        .on("mouseenter", function() {
            $(this).find(".divbutton").fadeIn(); // Fade in the button inside the hovered image-container
            $(this).find(".image").css("opacity", "0.3"); // Set image opacity to 30%
        })
        .on("mouseleave", function() {
            $(this).find(".divbutton").fadeOut(); // Fade out the button when leaving the image-container
            $(this).find(".image").css("opacity", "1"); // Restore image opacity to 100%
        });
});
$(document).ready(function() {
    $(".divbutton").hide(); // Hide all buttons initially

    $(".salesimage")
        .on("mouseenter", function() {
            $(this).find(".divbutton").fadeIn(); // Fade in the button inside the hovered image-container
            $(this).find(".procent").css("opacity", "0.3"); // Set image opacity to 30%
        })
        .on("mouseleave", function() {
            $(this).find(".divbutton").fadeOut(); // Fade out the button when leaving the image-container
            $(this).find(".procent").css("opacity", "1"); // Restore image opacity to 100%
        });
});
/* items */

/* carousel */
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});
/* carousel */
