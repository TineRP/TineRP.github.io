const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

for (let i = 0; i < Object.keys(information).length; i++) {
    const className = Object.keys(information)[i];
    const buttonText = information[className][6];
    
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
}

const buttons = document.querySelectorAll('#buttons-container button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const selectedOption = e.target.textContent;
        userSelections["smell"] = selectedOption;
        localStorage.setItem('answers', JSON.stringify(userSelections))

        window.location.href = '../check7-taste/taste.html'
    });
});
