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
        // Calculate target rotation based on mouse position
        targetRotation.y = 1.6 + (mouseX / window.innerWidth) * 3;
        targetRotation.x = -1 + (mouseY * 2.5 / window.innerHeight);
        
        // Smoothly interpolate the object's rotation towards the target rotation
        object.rotation.x += (targetRotation.x - object.rotation.x) * rotationDampening;
        object.rotation.y += (targetRotation.y - object.rotation.y) * rotationDampening;
    }
    renderer.render(scene, camera);
}

// Variables for smooth transition
let targetRotation = new THREE.Euler(Math.PI / 0.54, Math.PI, 0); // Set the default rotation
let rotationDampening = 0.01; // Adjust this value for smoothness

// Mouse movement listener
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

// Event listener for when the cursor leaves the window
window.addEventListener('mouseout', (e) => {
    // Check if the cursor actually left the window (not just entered a child element)
    if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
        if (object) {
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
        }
    }
});

// Resize event listener
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering loop
animate();
