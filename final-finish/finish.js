const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const otherAnswers = JSON.parse(localStorage.getItem('userAnswers'))

const prediction = JSON.parse(localStorage.getItem('prediction'))

const container = document.getElementById('question-container')

let path = "../images/" + prediction + "/" + prediction + 1 + ".jpg"
const imgElement = document.createElement("img");
imgElement.src = path
imgElement.style.width = "500px"
imgElement.style.height = "500px"
container.appendChild(imgElement)



/*Only give answer if 70% of answers match information of predicted mushroom*/
const values = information[prediction]

function matches(information, answers){
    for (let i = 0 ; i < Object.keys(information).length; i++){
        let matchCount = 0

        // Check if environment matches
        if(answers["environment"].toLowerCase().trim().includes(values[1])){ 
            matchCount += 1
        }
        // Check if month matches
        if(values[2].includes(answers["month"].toLowerCase().trim().substring(0,3))){
            matchCount += 1
        }
        // Check if color of cap matches
        if (answers["cap"] == values[3]){
            matchCount += 1
        }
        // Check underside
        if (answers["underside"] == values[4]){
            matchCount += 1
        }
        // Check stem
        if (answers["stem"] == values[5]){
            matchCount += 1
        }
        // Check smell
        if (answers["smell"] == values[6]){
            matchCount += 1
        }
        // Check taste
        if (answers["taste"] == values[7]){
            matchCount += 1
        }
        // check Other
        for (let question in otherAnswers) {
            const answer = otherAnswers[question];
            if (answer === values[8]) {
                matchCount += 1
            }
        }
        return matchCount; 
    }
}

let noOfMatches = matches(values, answers)

let score = noOfMatches / values.length

const answer = 'Your mushroom is most likely a ' + prediction + '!'
const paragraph = document.createElement('p');
paragraph.textContent = answer;
container.appendChild(paragraph);

let edibility = information[prediction][0]

let text = ''
if (edibility == 'Edible'){
    text = 'The mushroom is ' + edibility.toLowerCase() + '. It is therefore safe to pick 👌'
} else if (edibility == 'Inedible'){
    text = 'The mushroom is ' + edibility.toLowerCase() + '. While consuming the mushroom is not dangerous, it is not recommend picking, as it either has a bitter taste or consuming it in large doses can be poisonous'
} else if (edibility == 'Poisonous'){
    text = 'The mushroom is ' + edibility.toLowerCase() + '. You should not pick or consume the mushroom'
}


const paragraph1 = document.createElement('p');
paragraph1.textContent = text;
container.appendChild(paragraph1)


const paragraph2 = document.createElement('p');
paragraph2.textContent = 'Read more about '
const link = document.createElement('a');
link.textContent = prediction;
link.href = '../information/information.html'
paragraph2.appendChild(link);
container.appendChild(paragraph2);

localStorage.setItem('clickedMushroom', JSON.stringify(prediction))
