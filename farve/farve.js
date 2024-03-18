const buttons = document.querySelectorAll('#month-dropdown');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '../when/when.html'
    });
});

const storedData = localStorage.getItem('classes')
const classes = JSON.parse(storedData)
console.log(classes)

const question_container = document.getElementById('#question-container')

for (let i = 0; i < classes.length; i++) {
    const button = document.createElement('button');
    classElement.innerText = classes[i].className;
    question_container.appendChild(classElement);

}

