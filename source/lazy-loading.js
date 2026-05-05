// Get all elements with the "lazy-img" class
const lazyImages = document.querySelectorAll(".lazy-img");
// Create a new Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Load the image when it comes into the viewport
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target); // Unobserve the image after it's loaded
        }
    });
});
// Observe each lazy image
lazyImages.forEach((image) => {
    observer.observe(image);
});