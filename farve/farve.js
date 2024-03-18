const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)

// Get the first class name
//const firstClassName = Object.keys(filteredInformation)[0];
//const secondClassName = Object.keys(filteredInformation)[1];
//const thirdClassName = Object.keys(filteredInformation)[2];

// Accessing the first element of the first array
//const firstElementOfFirstArray = filteredInformation[firstClassName][0];

const container = document.getElementById('buttons-container')

for (let i = 0; i < Object.keys(information).length; i++) {
    const button = document.createElement("button");
    const className = Object.keys(information)[i];
    button.textContent = information[className][3];
    container.appendChild(button);
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
