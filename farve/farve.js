const buttons = document.querySelectorAll('#month-dropdown');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '../when/when.html'
    });
});

const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
console.log(information)

// Get the first class name
//const firstClassName = Object.keys(filteredInformation)[0];
//const secondClassName = Object.keys(filteredInformation)[1];
//const thirdClassName = Object.keys(filteredInformation)[2];

// Accessing the first element of the first array
//const firstElementOfFirstArray = filteredInformation[firstClassName][0];


const question_container = document.getElementById('question-container')

for (let i = 0; i < information.length; i++) {
    const button = document.createElement("button");

    const className = Object.keys(information)[i];

    button.textContent = information[className][3];
    console.log(button.textContent)

    question_container.appendChild(button);

}

