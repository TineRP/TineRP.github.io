const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)

// Get the first class name
//const firstClassName = Object.keys(filteredInformation)[0];
//const secondClassName = Object.keys(filteredInformation)[1];
//const thirdClassName = Object.keys(filteredInformation)[2];

// Accessing the first element of the first array
//const firstElementOfFirstArray = filteredInformation[firstClassName][0];

const container = document.getElementById('buttons-container')

console.log(information)

//for (let i = 0; i < Object.keys(information).length; i++) {
//    const button = document.createElement("button");
  //  const className = Object.keys(information)[i];
    //button.textContent = information[className][3];
    //container.appendChild(button);
//}

for (let i = 0; i < Object.keys(information).length; i++) {
    const className = Object.keys(information)[i];
    const buttonText = information[className][3];
    
    // Check if there's already a button with the same textContent
    let buttonExists = false;
    const existingButtons = container.querySelectorAll("button");
    existingButtons.forEach(button => {
        if (button.textContent === buttonText) {
            buttonExists = true;
            return; // Exit forEach loop early
        }
    });

    // If button with same textContent doesn't exist, create a new button
    if (!buttonExists) {
        const button = document.createElement("button");
        button.textContent = buttonText;
        container.appendChild(button);
    }
}

const button = document.createElement("button");
button.textContent = "I tvivl";
container.append(button);

const buttons = document.querySelectorAll('#buttons-container button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        //window.location.href = '../when/when.html'
    });
});
