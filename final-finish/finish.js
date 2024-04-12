const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const prediction = JSON.parse(localStorage.getItem('prediction'))

const container = document.getElementById('question-container')

let path = "../images/" + prediction + "/" + prediction + 1 + ".jpg"
const imgElement = document.createElement("img");
imgElement.src = path
imgElement.style.width = "500px"
imgElement.style.height = "500px"
container.appendChild(imgElement)

const answer = 'Your mushroom is most likely a ' + prediction + '!'
const paragraph = document.createElement('p');
paragraph.textContent = answer;
container.appendChild(paragraph);

let edibility = information[prediction][0]

let text = ''
if (edibility == 'Edible'){
    text = 'The mushroom is ' + edibility.toLowerCase() + '. It is therefore safe to pick 👌'
} else if (edibility == 'Inedible'){
    text = 'The mushroom is ' + edibility.toLowerCase() + '. While consuming the mushroom is not dangerous, I cannot recommend picking it'
} else if (edibility == 'Poisonous'){
    text = 'The mushroom is ' + edibility.toLowerCase() + '. You should not pick or consume the mushroom'
}
const paragraph1 = document.createElement('p');
paragraph1.textContent = text;
container.appendChild(paragraph1)

