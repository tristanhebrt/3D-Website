const radius = 240;
const imgWidth = 300; // Width of the images
const imgHeight = 400; // Height of the images
const spacing = 80; // Increase this value for more space between images

let dragging = false;
let lastX = 0;
let currentAngleX = 0; // Y-axis rotation angle
let velocityY = 0; // For adding momentum on the Y-axis

//==============Start==============//

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(init, 1000);
});

const odrag = document.getElementById('drag-container');
const ospin = document.getElementById('spin-container');
const aImg = ospin.getElementsByTagName('img');
const aVid = ospin.getElementsByTagName('video');
const aEle = Array.from(aImg).concat(Array.from(aVid)); // Use Array.from for better compatibility

// Update spin-container size to match imgWidth and imgHeight
ospin.style.width = `${imgWidth}px`;
ospin.style.height = `${imgHeight}px`;

const ground = document.getElementById('ground');
ground.style.width = `${radius * 3}px`;
ground.style.height = `${radius * 3}px`;

// Initialize the 3D gallery with smooth transition
function init() {
    aEle.forEach((element, i) => {
        element.style.transition = 'transform 1s ease-out'; // Smooth initial load-in transition
        element.style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius + spacing}px)`; // Added spacing

        // Add hover event for growing effect
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.2)'; // Grow the image/video on hover
            element.style.transition = 'transform 0.3s ease'; // Smooth hover transition
        });

        // Revert the effect on mouse leave
        element.addEventListener('mouseleave', () => {
            element.style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius + spacing}px)`; // Reset to original size
        });

        // Add click event to open link
        element.addEventListener('dblclick', () => {
            const link = element.getAttribute('data-link'); // Get the link from data-link attribute
            if (link) {
                window.open(link, '_blank'); // Open link in a new tab
            }
        });
    });

    addOrbitControls(); // Add orbit controls for mouse drag

    // Start automatic rotation
    requestAnimationFrame(rotateAutomatically);
}

// Orbit controls (mouse drag and momentum)
function addOrbitControls() {
    odrag.addEventListener('mousedown', (event) => {
        event.preventDefault(); // Prevent default selection behavior
        dragging = true;
        lastX = event.clientX;
    });
    
    document.addEventListener('mousemove', (event) => {
        if (dragging) {
            event.preventDefault(); // Prevent default selection behavior
            const deltaX = event.clientX - lastX; // Calculate horizontal drag distance
    
            lastX = event.clientX; // Update lastX for next movement
    
            // Update the X-axis angle based on the drag distance
            currentAngleX += deltaX * 0.1; // Adjust sensitivity
    
            velocityY = deltaX * 0.1; // Store velocity for momentum effect
    
            updateRotation(); // Apply the new rotation
        }
    });
    
    odrag.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent default selection behavior
        dragging = true;
        lastX = event.touches[0].clientX;
    });
    
    document.addEventListener('touchmove', (event) => {
        if (dragging) {
            event.preventDefault(); // Prevent default selection behavior
            const deltaX = event.touches[0].clientX - lastX; // Calculate horizontal drag distance
    
            lastX = event.touches[0].clientX; // Update lastX for next movement
    
            currentAngleX += deltaX * 0.1; // Update the X-axis angle
    
            velocityY = deltaX * 0.1; // Store velocity for momentum effect
    
            updateRotation();
        }
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
    });

    odrag.addEventListener('touchend', () => {
        dragging = false;
    });

    // Keep adding momentum even after the drag ends
    animateMomentum();
}

// Update rotation based on current angles
function updateRotation() {
    ospin.style.transform = `rotateY(${currentAngleX}deg)`; // Only update the Y-axis rotation
}

// Add momentum for smooth release effect
function animateMomentum() {
    const momentum = () => {
        if (!dragging) {
            currentAngleX += velocityY; // Continue rotating along Y-axis

            velocityY *= 0.99; // Decrease velocity for natural stopping (friction effect)

            if (Math.abs(velocityY) < 0.01) {
                velocityY = 0; // Stop momentum when below threshold
            }

            updateRotation();
        }
        requestAnimationFrame(momentum); // Continue the momentum animation
    };
    momentum(); // Start the momentum loop
}

// Automatically rotate the container slowly
function rotateAutomatically() {
    currentAngleX += 0.1; // Adjust this value for rotation speed
    updateRotation(); // Update the rotation based on the current angle
    requestAnimationFrame(rotateAutomatically); // Continue the automatic rotation
}