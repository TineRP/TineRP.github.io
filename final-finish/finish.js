const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const userAnswers = JSON.parse(localStorage.getItem('userAnswers'))
const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))


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
        for (let question in userAnswers) {
            const answer = userAnswers[question];
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
paragraph.id = "predictedmushroom"
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
paragraph1.id = "predictedmushroom"
container.appendChild(paragraph1)


const paragraph2 = document.createElement('p');
paragraph2.textContent = 'Read more about '
const link = document.createElement('a');
link.textContent = prediction;
link.href = '../information/information.html'
paragraph2.appendChild(link);
paragraph2.id = "predictedmushroom"
container.appendChild(paragraph2);

localStorage.setItem('clickedMushroom', JSON.stringify(prediction))

const submenuItems = document.querySelectorAll('.submenu a');

submenuItems.forEach(submenuItem => {
  submenuItem.addEventListener('click', function() {
    localStorage.setItem("clickedMushroom", JSON.stringify(submenuItem.textContent));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const menuItems = document.querySelector('.menu-items');
  const speciesMenuItem = document.getElementById('species-menu');
  const submenu = document.querySelector('.submenu');
  submenu.style.display = 'none'; 

  burgerIcon.addEventListener('click', function () {
      menuItems.classList.toggle('show');
  });

  speciesMenuItem.addEventListener('click', function (event) {
  const submenu = this.nextElementSibling;
  submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none'; 
  });
});


/////////////////////////////////////////
const values1 = information[modelPrediction[0]["className"]]
const values2 = information[modelPrediction[1]["className"]]
const values3 = information[modelPrediction[2]["className"]]

let environment = []
let month = []
let cap = []
let underside = []
let stem = []
let smell = []
let taste = []
let other0 = []
let other1 = []
let other2 = []



function makeList(information, answers, userAnswers, values, number){
      // Check if environment matches
      if(answers["environment"].toLowerCase().trim().includes(values[1])){ 
        environment.push(Object.keys(information)[number])
      }
      // Check if month matches
      if(values[2].includes(answers["month"].toLowerCase().trim().substring(0,3))){
        month.push(Object.keys(information)[number])
      }
      // Check if color of cap matches
      if (answers["cap"] == values[3]){
        cap.push(Object.keys(information)[number])
      }
      // Check underside
      if (answers["underside"] == values[4]){
        underside.push(Object.keys(information)[number])
      }
      // Check stem
      if (answers["stem"] == values[5]){
        stem.push(Object.keys(information)[number])
      }
      // Check smell
      if (answers["smell"] == values[6]){
        smell.push(Object.keys(information)[number])
      }
      // Check taste
      if (answers["taste"] == values[7]){
        taste.push(Object.keys(information)[number])
      }
      // check Other

      for (let i = 0; i < Object.keys(userAnswers).length; i++){
          const answer = userAnswers[Object.keys(userAnswers)[i]];
          console.log("answer", answer)
          console.log("values", values[8])
          if (answer == values[8]) {
            if (i == 0){
                other0.push(Object.keys(information)[number])
              } else if (i == 1){
                other1.push(Object.keys(information)[number])
              } else if (i == 2){
                other2.push(Object.keys(information)[number])
              }
            } else if (answer == "No") {
                console.log("else", Object.keys(information)[number])
            }

        }
      }


makeList(information, answers, userAnswers, values1, 0)
makeList(information, answers, userAnswers, values2, 1)
makeList(information, answers, userAnswers, values3, 2)

const answercontainer = document.getElementById('answer-container')

function createParagraph(list, attribute){
  const paragraph = document.createElement('p');
  let boldAttribute = '<b>' + attribute.charAt(0).toUpperCase() + attribute.slice(1) + '</b>';
  paragraph.innerHTML = boldAttribute
  if (list == other0 || list == other1 || list == other2){
    paragraph.innerHTML = boldAttribute + ": Your answer was " + '\'' + userAnswers[attribute] + '\''
  } else {
    paragraph.innerHTML = boldAttribute + ": Your answer was " + '\'' + answers[attribute] + '\'' 
  }
  if (list.length != 0){
    paragraph.innerHTML = paragraph.innerHTML + ". This indicates that the mushroom is a "
  } else {
    paragraph.innerHTML = paragraph.innerHTML + ". Your answer does not match any of the top three candidates."

  }
  for (let i = 0; i < list.length; i++){
    if (i == 1 || i == 2){
      paragraph.innerHTML = paragraph.innerHTML + ' or '

    } 
    paragraph.innerHTML = paragraph.innerHTML + list[i]


  }

  answercontainer.appendChild(paragraph);
  
}


createParagraph(environment, "environment")
createParagraph(month, "month")
createParagraph(cap, "cap")
createParagraph(underside, "underside")
createParagraph(stem, "stem")
createParagraph(smell, "smell")
createParagraph(taste, "taste")


for (let i = 0; i < Object.keys(userAnswers).length; i++){
  if (i == 0){
    createParagraph(other0, Object.keys(userAnswers)[i])
  } else if (i == 1){
    createParagraph(other1, Object.keys(userAnswers)[i])
  } else if (i == 2){
    createParagraph(other2, Object.keys(userAnswers)[i])
  }

}
