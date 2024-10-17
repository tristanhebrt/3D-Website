// Define the variable for the theme toggle text
let lightModeText = "☀️";
let darkModeText = "🌙";
let hoverTextLight = "☀️"; // Text for hover in light mode
let hoverTextDark = "🌙"; // Text for hover in dark mode

// Define the image sources for each theme
const lightThemeImages = [
    "ASSETS/Text/dblUpArrowBlack.png", // Light theme arrow
    "ASSETS/Text/mailIconBlack.png", // Light theme mail
    "ASSETS/Text/@IconBlack.png", // Light theme @
    "ASSETS/Text/logoBlack.png", // Light theme logo
];

const darkThemeImages = [
    "ASSETS/Text/dblUpArrowWhite.png", // Dark theme arrow
    "ASSETS/Text/mailIcon.png", // Dark theme mail
    "ASSETS/Text/@Icon.png", // Dark theme @
    "ASSETS/Text/logoWhite.png", // Dark theme logo
];

// Get the theme toggle button and image elements
const toggleButton = document.getElementById('theme-toggle');

const upArrowImage = document.getElementById('upArrowImage');
const mailImage = document.getElementById('mailImage');
const atImage = document.getElementById('@Image');
const logoImage = document.getElementById('logoImage');

// Function to update the image sources based on the current theme
function updateImageSources(theme) {
    if (upArrowImage) {
        const arrow = theme === 'light' ? lightThemeImages : darkThemeImages;
        upArrowImage.src = arrow[0]; // arrow in list
    }

    if (mailImage) {
        const mail = theme === 'light' ? lightThemeImages : darkThemeImages;
        mailImage.src = mail[1]; // mail in list
    }

    if (atImage) {
        const at = theme === 'light' ? lightThemeImages : darkThemeImages;
        atImage.src = at[2]; // @ in list
    }

    if (logoImage) {
        const logo = theme === 'light' ? lightThemeImages : darkThemeImages;
        logoImage.src = logo[3]; // logo in list
    }
}

// Set the initial theme based on preference or localStorage
let currentTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
updateImageSources(currentTheme);

// Set the initial text for the button
toggleButton.textContent = currentTheme === 'light' ? lightModeText : darkModeText;

// Event listener for the theme toggle button
toggleButton.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Set the new theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update the button text based on the new theme
    toggleButton.textContent = currentTheme === 'light' ? lightModeText : darkModeText;

    // Update image sources based on the new theme
    updateImageSources(currentTheme);

    // Save the current theme in localStorage
    localStorage.setItem('theme', currentTheme);
});

// Change text on hover
toggleButton.addEventListener('mouseover', () => {
    toggleButton.textContent = currentTheme === 'light' ? hoverTextDark : hoverTextLight;
});

toggleButton.addEventListener('mouseout', () => {
    toggleButton.textContent = currentTheme === 'light' ? lightModeText : darkModeText;
});

// For the Preloader
window.addEventListener('load', function() {
    // Hide the preloader
    document.getElementById('preloader').style.display = 'none';
    
    // Show the content
    document.getElementById('content').style.display = 'block';
});
