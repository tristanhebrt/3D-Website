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

// Keep track of the mouse position
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Keep the 3D object in a global variable
let object;

// OrbitControls for moving the camera
let controls;

// Set the object to render
let objToRender = '3d-face';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// True if the object follows the cursor
const track = true;

// Load the file
loader.load(
    'ASSETS/3d-face.gltf',
    function (gltf) {
        object = gltf.scene;

        // Adjust the position if needed
        object.position.set(0, 0, 0); // (x, y, z) - move the model around

        // Rotate the model (rotate in radians)
        object.rotation.y = Math.PI; // Rotate 180 degrees around the y-axis
        // You can also adjust rotation on other axes (x, z) if needed
        object.rotation.x = Math.PI / 0.5; // Rotate 90 degrees around the x-axis

        // Scale the model
        object.scale.set(2, 2, 2); // (x, y, z) - adjust these values to scale the model

        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha allows for a transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set the camera's initial position
camera.position.z = objToRender === "3d-face" ? 0.8 : 500;

// Add lights to the scene
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // Top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "3d-face" ? 5 : 1);
scene.add(ambientLight);

// Add controls to the camera
if (!track) {
    controls = new OrbitControls(camera, renderer.domElement);

    // Set the minimum and maximum distance for the camera to prevent zooming too close or too far
    controls.minDistance = 0.5; // Set this to an appropriate value for your model size
    controls.maxDistance = 1.5; // You can also set a maximum distance
}

// Render the scene in a loop
function animate() {
    requestAnimationFrame(animate);

    if (track) {
        //I've played with the constants here until it looked good 
        object.rotation.y = 1.6 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.7 + mouseY * 2.5 / window.innerHeight;
      }
    // If needed, add automatic movement logic here
    renderer.render(scene, camera);
}

// Resize event listener
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse movement listener
document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

// Start the 3D rendering loop
animate();
