// Import the THREE.js library as a module
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a new camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10); // Set the initial camera position

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set the object to render
let object;

// Load the file using GLTFLoader
const loader = new GLTFLoader();
loader.load(
    'ASSETS/3dLogo/kk2-logo-2.glb',
    function (gltf) {
        object = gltf.scene;

        // Adjust the position and rotation
        object.position.set(0, 0, 0);
        object.rotation.y = Math.PI;  // Set it to face forward
        object.rotation.x = 0;
        object.scale.set(1, 1, 1); // Scale the model

        scene.add(object); // Add the object to the scene
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

// Add lights to the scene
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(0, 0, 100);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Render the scene in a loop
function animate() {
    requestAnimationFrame(animate);

    if (object) {
        // Calculate target rotation based on input position (mouse or touch)
        targetRotation.y = 1.6 + (inputX / window.innerWidth) * 3;
        targetRotation.x = -1 + (inputY * 2.5 / window.innerHeight);
        
        // Smoothly interpolate the object's rotation towards the target rotation
        object.rotation.x += (targetRotation.x - object.rotation.x) * rotationDampening;
        object.rotation.y += (targetRotation.y - object.rotation.y) * rotationDampening;
    }
    renderer.render(scene, camera);
}

// Variables for smooth transition
let targetRotation = new THREE.Euler(Math.PI / 0.54, Math.PI, 0); // Set the default rotation
let rotationDampening = 0.01; // Adjust this value for smoothness

// Variables for tracking input (mouse or touch)
let inputX = window.innerWidth / 2;
let inputY = window.innerHeight / 2;

// Mouse movement listener
document.onmousemove = (e) => {
    inputX = e.clientX;
    inputY = e.clientY;
};

// Touch movement listeners for mobile
document.addEventListener('touchmove', (e) => {
    // Prevent default to avoid scrolling while interacting with 3D
    e.preventDefault();
    if (e.touches.length > 0) {
        inputX = e.touches[0].clientX;
        inputY = e.touches[0].clientY;
    }
}, { passive: false });

// Event listener for when the cursor leaves the window (also handles touch end)
window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
        if (object) {
            inputX = window.innerWidth / 2;
            inputY = window.innerHeight / 2;
        }
    }
});

// Touch end listener for mobile
document.addEventListener('touchend', () => {
    inputX = window.innerWidth / 2;
    inputY = window.innerHeight / 2;
});

// Resize event listener
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering loop
animate();
