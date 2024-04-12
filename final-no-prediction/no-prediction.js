const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const prediction = JSON.parse(localStorage.getItem('prediction'))

const container = document.getElementById('question-container')

const paragraph = document.createElement('p');
paragraph.textContent = 'Sorry, I am not able to make a confident prediction ☹️';
container.appendChild(paragraph);
