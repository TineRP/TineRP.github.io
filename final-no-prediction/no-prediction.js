const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const prediction = JSON.parse(localStorage.getItem('prediction'))
const userAnswers = JSON.parse(localStorage.getItem('userAnswers'))
const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))

const container = document.getElementById('question-container')

const paragraph = document.createElement('p');
paragraph.textContent = 'Sorry, the model is not able to make a confident prediction ☹️';
container.appendChild(paragraph);

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
          if (answer === values[8]) {
            if (i == 0){
                other0.push(Object.keys(information)[number])
              } else if (i == 1){
                other1.push(Object.keys(information)[number])
              } else if (i == 2){
                other2.push(Object.keys(information)[number])
              }
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
