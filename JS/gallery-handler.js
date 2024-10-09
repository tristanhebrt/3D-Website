const radius = 240;
const imgWidth = 300; // Width of the images
const imgHeight = 400; // Height of the images
const spacing = 80; // Increase this value for more space between images

let dragging = false;
let lastX = 0;
let velocityY = 0; // For adding momentum on the Y-axis

//==============Start==============//

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(init, 1000);
});

// Select all drag containers and initialize each one
const dragContainers = document.querySelectorAll('.drag-container');

function init() {
    dragContainers.forEach(odrag => {
        const ospin = odrag.querySelector('.spin-container');
        const aImg = ospin.getElementsByTagName('img');
        const aVid = ospin.getElementsByTagName('video');
        const aEle = Array.from(aImg).concat(Array.from(aVid)); // Use Array.from for better compatibility

        // Update spin-container size to match imgWidth and imgHeight
        ospin.style.width = `${imgWidth}px`;
        ospin.style.height = `${imgHeight}px`;

        // Initialize the 3D gallery with smooth transition
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
        });

        addOrbitControls(odrag, ospin); // Add orbit controls for mouse drag

        // Start automatic rotation for this container
        requestAnimationFrame(() => rotateAutomatically(ospin));
    });
}

// Orbit controls (mouse drag and momentum)
function addOrbitControls(odrag, ospin) {
    let currentAngleY = 0; // Y-axis rotation angle for each container

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

            // Update the Y-axis angle based on the drag distance
            currentAngleY += deltaX * 0.1; // Adjust sensitivity

            velocityY = deltaX * 0.1; // Store velocity for momentum effect

            updateRotation(ospin, currentAngleY); // Apply the new rotation
        }
    });
    
    document.addEventListener('mouseup', () => {
        dragging = false; // Stop dragging
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

            currentAngleY += deltaX * 0.1; // Update the Y-axis angle

            velocityY = deltaX * 0.1; // Store velocity for momentum effect

            updateRotation(ospin, currentAngleY); // Apply the new rotation
        }
    });

    document.addEventListener('touchend', () => {
        dragging = false; // Stop dragging
    });

    // Keep adding momentum even after the drag ends
    animateMomentum(ospin, currentAngleY);
}

// Update rotation based on current angles
function updateRotation(ospin, currentAngleY) {
    ospin.style.transform = `rotateY(${currentAngleY}deg)`; // Update the Y-axis rotation
}

// Add momentum for smooth release effect
function animateMomentum(ospin, currentAngleY) {
    const momentum = () => {
        if (!dragging) {
            currentAngleY += velocityY; // Continue rotating along Y-axis

            velocityY *= 0.99; // Decrease velocity for natural stopping (friction effect)

            if (Math.abs(velocityY) < 0.01) {
                velocityY = 0; // Stop momentum when below threshold
            }

            updateRotation(ospin, currentAngleY);
        }
        requestAnimationFrame(momentum); // Continue the momentum animation
    };
    momentum(); // Start the momentum loop
}

// Automatically rotate the container slowly
function rotateAutomatically(ospin) {
    let currentAngleY = 0; // Local variable for automatic rotation
    const autoRotate = () => {
        currentAngleY += 0.1; // Adjust this value for rotation speed
        updateRotation(ospin, currentAngleY); // Update the rotation based on the current angle
        requestAnimationFrame(autoRotate); // Continue the automatic rotation
    };
    autoRotate(); // Start the automatic rotation loop
}
