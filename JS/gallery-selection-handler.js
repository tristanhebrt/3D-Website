// Gallery Selector =========================================
const gallerySelectionContainer = document.querySelector('.gallerySelectionContainer');
const initialOffsetTop = gallerySelectionContainer.offsetTop;

// Clone the gallery selection container
const clonedContainer = gallerySelectionContainer.cloneNode(true);
clonedContainer.classList.add('cloned');
clonedContainer.style.opacity = '0'; // Start hidden
document.body.appendChild(clonedContainer);

function handleScroll() {
    const scrollPosition = window.scrollY;

    // Trigger the fixed clone when scrolling past a certain point
    if (scrollPosition > initialOffsetTop + 550) {
        clonedContainer.style.opacity = '1'; // Fade in
        clonedContainer.style.transform = 'translateY(0)'; // Drop in smoothly
    } else {
        clonedContainer.style.opacity = '0'; // Fade out
        clonedContainer.style.transform = 'translateY(-50px)'; // Move up when hidden
    }
}
window.addEventListener('scroll', handleScroll);

// Nav Text Fade In =========================================
document.addEventListener('DOMContentLoaded', function () {
    const fadeInLinks = document.querySelectorAll('.fade-in');
    
    // Use setTimeout to delay the addition of the visible class for each link
    fadeInLinks.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('visible');
        }, index * 300); // Stagger the fade-in effect (300ms per link)
    });
});

// Gallery Title Glow =========================================
document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll(".galleryContainer h2"); // Select all h2 elements in gallery containers

    const options = {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the target is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("glow"); // Add the glow class when in view
                observer.unobserve(entry.target); // Stop observing after the animation
            }
        });
    }, options);

    headings.forEach(heading => {
        observer.observe(heading); // Observe each heading
    });
});

// Autoplay Video =========================================
// Autoplay Video =========================================
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('iframe');
    let firstVideoPlayed = false; // Flag to track if the first video has played

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Video will autoplay when at least 70% is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !firstVideoPlayed) {
                // Autoplay only the first video
                const firstVideo = videos[0];
                const src = firstVideo.getAttribute('src');

                firstVideo.src = `${src}?autoplay=1`; // Start autoplay
                firstVideoPlayed = true; // Mark the first video as played

                // Unobserve other videos to prevent unnecessary checks
                videos.forEach((video, index) => {
                    if (index !== 0) {
                        observer.unobserve(video);
                    }
                });
            }
        });
    }, options);

    videos.forEach(video => {
        observer.observe(video); // Observe each video
    });
});

