// Import the THREE.js library as a module
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
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

// OrbitControls for moving the camera
let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 5; // Minimum distance for camera zoom
controls.maxDistance = 20; // Maximum distance for camera zoom
controls.enabled = false;  // Initially disabled, will be controlled by tracking switch

// Set the object to render
let object;

// Load the file using GLTFLoader
const loader = new GLTFLoader();
loader.load(
    'ASSETS/kk2-logo.gltf',
    function (gltf) {
        object = gltf.scene;

        // Adjust the position and rotation
        object.position.set(0, 0, 0);
        object.rotation.y = Math.PI;
        object.rotation.x = 1;
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
topLight.position.set(0, 100, 0);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Get the tracking switch element
const trackingSwitch = document.getElementById('trackingSwitch');

// Render the scene in a loop
function animate() {
    requestAnimationFrame(animate);

    if (object) {
        if (track) {
            // Calculate target rotation based on mouse position
            targetRotation.y = 1.6 + (mouseX / window.innerWidth) * 3;
            targetRotation.x = -1 + (mouseY * 2.5 / window.innerHeight);
            
            // Smoothly interpolate the object's rotation towards the target rotation
            object.rotation.x += (targetRotation.x - object.rotation.x) * rotationDampening;
            object.rotation.y += (targetRotation.y - object.rotation.y) * rotationDampening;
        } else {
            // Smoothly transition the object to the target position and rotation
            object.position.lerp(targetPosition, transitionSpeed);
            object.rotation.x += (targetRotation.x - object.rotation.x) * transitionSpeed;
            object.rotation.y += (targetRotation.y - object.rotation.y) * transitionSpeed;
        }
    }
    renderer.render(scene, camera);
}

// Variables for smooth transition
let targetPosition = new THREE.Vector3(0, 0, 0);
let targetRotation = new THREE.Euler(Math.PI / 0.54, Math.PI, 0);
let rotationDampening = 0.05; // Adjust this value for smoothness
let transitionSpeed = 0.03; // Adjust this value for a smoother/slower transition

// True if the object follows the cursor
let track = trackingSwitch.checked; // Initially set based on the checkbox state

// Event listener to toggle tracking on/off
trackingSwitch.addEventListener('change', function () {
    track = trackingSwitch.checked; // Update tracking mode based on the switch
    controls.enabled = !track; // Enable OrbitControls when tracking is off

    // Reset the target position and rotation for smooth transition
    targetPosition.set(0, 0, 0);
    targetRotation.set(0, 3.2, 0); // Reset rotation
    
    // Reset camera position
    camera.position.set(0, 0, 10); // Reset camera to initial position
    controls.target.set(0, 0, 0); // Reset controls target
    controls.update(); // Update controls to reflect the change
});

// Mouse movement listener
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

// Resize event listener
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering loop
animate();
