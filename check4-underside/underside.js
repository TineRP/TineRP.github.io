const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

// Get the image element
var image = document.querySelector('.gills');

// Create a canvas element
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

// Set canvas dimensions to match the image
canvas.width = image.clientWidth; // Use clientWidth to get the displayed width
canvas.height = image.clientHeight; // Use clientHeight to get the displayed height

// Draw the image onto the canvas
context.drawImage(image, 0, 0, canvas.width, canvas.height);

// Add text to the canvas
var text = 'Gills';
var fontSize = 50;
context.font = fontSize + 'px Roboto, sans-serif'; // Set font family to Roboto
context.fillStyle = 'black';

// Calculate text position to center horizontally and vertically
var textWidth = context.measureText(text).width;
var x = (canvas.width - textWidth) / 2;
var y = (canvas.height + fontSize) / 2; // Adjust for baseline

context.fillText(text, x, y); // Draw text

// Replace the image with the canvas
image.parentNode.replaceChild(canvas, image);

const button = document.createElement("button");
button.textContent = "Not sure";
container.append(button);

const buttons = document.querySelectorAll('#buttons-container button');

const optionsMapping = {
    "Pores: small, sponge-like holes": "pores",
    "Teeth: long, thin tooth-like growths that hang from the mushrooms cap": "teeth",
    "Gills: small, thin-walled structure. Can be removed from the cap when touched": "gills",
    "Ridges: a thin-walled structure like the gills, but cannot be removed from the mushroom when touched": "ridges"
};

buttons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
        const selectedOption = e.target.textContent;
        const mappedOption = optionsMapping[selectedOption];

        userSelections["underside"] = mappedOption;
        localStorage.setItem('answers', JSON.stringify(userSelections))

        window.location.href = '../check5-stem/stem.html'
    });
});

