const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

/*for (let i = 0; i < Object.keys(information).length; i++) {
    const className = Object.keys(information)[i];
    const buttonText = information[className][4];
    
    let buttonExists = false;
    const existingButtons = container.querySelectorAll("button");
    existingButtons.forEach(button => {
        if (button.textContent === buttonText) {
            buttonExists = true;
            return; 
        }
    });

    if (!buttonExists) {
        const button = document.createElement("button");
        button.textContent = buttonText;
        container.appendChild(button);
    }
}*/

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

