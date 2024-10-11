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
document.addEventListener('DOMContentLoaded', function () {
    const musicVideosButton = document.querySelector('.gallerySelectionButton[href="#musicVideoContainer"]');
    const firstMusicVideo = document.querySelector('#musicVideoContainer iframe');

    musicVideosButton.addEventListener('click', function (event) {
        // Prevent the default anchor behavior
        event.preventDefault();

        // Get the current src of the first video
        const src = firstMusicVideo.getAttribute('src');

        // Update src to include autoplay
        firstMusicVideo.src = `${src}?autoplay=1`;
        
        // Optionally, scroll to the music video container
        const targetContainer = document.querySelector('#musicVideoContainer');
        targetContainer.scrollIntoView({ behavior: 'smooth' });
    });
});

