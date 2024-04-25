const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const otherAnswers = JSON.parse(localStorage.getItem('userAnswers'))

const prediction = JSON.parse(localStorage.getItem('prediction'))

/*---------*/ 
console.log(information[prediction])
console.log(answers)
console.log(otherAnswers)
console.log(Object.keys(answers).length)
/*--------------*/

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
            console.log("ENVIRONMENT")
            matchCount += 1
        }
        // Check if month matches
        if(values[2].includes(answers["month"].toLowerCase().trim().substring(0,3))){
            console.log("MONTH")
            matchCount += 1
        }
        // Check if color of cap matches
        if (answers["cap"] == values[3]){
            console.log("CAP")
            matchCount += 1
        }
        // Check underside
        if (answers["underside"] == values[4]){
            console.log("underside")
            matchCount += 1
        }
        // Check stem
        if (answers["stem"] == values[5]){
            console.log("stem")
            matchCount += 1
        }
        // Check smell
        if (answers["smell"] == values[6]){
            console.log("smell")
            matchCount += 1
        }
        // Check taste
        if (answers["taste"] == values[7]){
            console.log("taste")
            matchCount += 1
        }
        // check Other
        for (let question in otherAnswers) {
            const answer = otherAnswers[question];
            if (answer === values[8]) {
                console.log("other")
                matchCount += 1
            }
        }
        console.log(matchCount)
        return matchCount; 
    }
}

let noOfMatches = matches(values, answers)
console.log("NoOfMatches")
console.log(noOfMatches)
console.log(values.length)

let score = noOfMatches / values.length
console.log("SCORE")
console.log(score)
/*------------*/ 
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

