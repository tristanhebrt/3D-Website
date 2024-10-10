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
    if (scrollPosition > initialOffsetTop + 600) {
        clonedContainer.style.opacity = '1'; // Fade in
        clonedContainer.style.transform = 'translateY(0)'; // Drop in smoothly
    } else {
        clonedContainer.style.opacity = '0'; // Fade out
        clonedContainer.style.transform = 'translateY(-50px)'; // Move up when hidden
    }
}
window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', function () {
    const fadeInLinks = document.querySelectorAll('.fade-in');
    
    // Use setTimeout to delay the addition of the visible class for each link
    fadeInLinks.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('visible');
        }, index * 300); // Stagger the fade-in effect (300ms per link)
    });
});
