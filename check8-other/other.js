const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))


let firstMushroom = Object.keys(information)[0]
let secondMushroom = Object.keys(information)[1]
let thirdMushroom = Object.keys(information)[2]

if (firstMushroom === 'Penny bun' || secondMushroom === 'Penny bun' || thirdMushroom === 'Penny bun') {
    const div = document.querySelector('.slimy');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Summer bolete' || secondMushroom === 'Summer bolete' || thirdMushroom === 'Summer bolete') {
    const div = document.querySelector('.dry');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Devil\'s bolete' || secondMushroom === 'Devil\'s bolete' || thirdMushroom === 'Devil\'s bolete') {
    const div = document.querySelector('.greenish');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Chantarelle' || secondMushroom === 'Chantarelle' || thirdMushroom === 'Chantarelle') {
    const div = document.querySelector('.samecolor');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'False chantarelle' || secondMushroom === 'False chantarelle' || thirdMushroom === 'False chantarelle') {
    const div = document.querySelector('.velvet');
    div.style.display = "block";
    div.style.textAlign = "center";
}


if (firstMushroom === 'Oyster mushroom' || secondMushroom === 'Oyster mushroom' || thirdMushroom === 'Oyster mushroom') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
} 

if (firstMushroom === 'Sarcomyxa serotina' || secondMushroom === 'Sarcomyxa serotina' || thirdMushroom === 'Sarcomyxa serotina') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Pale oyster' || secondMushroom === 'Pale oyster' || thirdMushroom === 'Pale oyster') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Angel\'s wings' || secondMushroom === 'Angel\'s wings' || thirdMushroom === 'Angel\'s wings') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Depressed hedgehog' || secondMushroom === 'Depressed hedgehog' || thirdMushroom === 'Depressed hedgehog') {
    const div = document.querySelector('.bellybutton');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Horse mushroom' || secondMushroom === 'Horse mushroom' || thirdMushroom === 'Horse mushroom') {
    const div = document.querySelector('.yellow');
    div.style.display = "block";
    div.style.textAlign = "center";
}
const buttons = document.querySelectorAll('#options-container button');

let userAnswers = {};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const questionContainer = button.closest('.tfjs-example-container > div');
    const question = questionContainer.querySelector('p').textContent.trim();

     const buttonsInGroup = questionContainer.querySelectorAll('button');
     buttonsInGroup.forEach(btn => {
         btn.style.backgroundColor = ''; 
     });

    button.style.backgroundColor = 'rgb(106, 148, 106)'; 

    let answer = button.textContent.trim();    
    if (questionContainer.classList.contains('slimy')) {
      if (answer === 'Yes') {
        answer = 'Hat is slimy';
      }
    } else if (questionContainer.classList.contains('dry')) {
      if (answer === 'Yes') {
        answer = 'Hat is dry';
      }
    } else if (questionContainer.classList.contains('greenish')) {
      if (answer === 'Yes') {
        answer = 'When pressed, the mushroom turns greenish/bluish';
      }
    } else if (questionContainer.classList.contains('samecolor')) {
        if (answer === 'Yes') {
          answer = 'The entire mushroom is the same yellowish color';
        }
    } else if (questionContainer.classList.contains('velvet')) {
        if (answer === 'Yes') {
          answer = 'The cap feels like velvet';
        }
    } else if (questionContainer.classList.contains('tree')) {
        if (answer === 'Yes') {
          answer = 'Grows on trees';
        }
    } else if (questionContainer.classList.contains('bellybutton')) {
        if (answer === 'Yes') {
          answer = 'The cap has a belly button-like center';
        }
    } else if (questionContainer.classList.contains('yellow')) {
        if (answer === 'Yes') {
          answer = 'When pressed, the mushroom turns yellow';
        }
    }
                
    userAnswers[question] = answer;
  });
});


const values1 = information[modelPrediction[0]["className"]]
const values2 = information[modelPrediction[1]["className"]]
const values3 = information[modelPrediction[2]["className"]]


function matches(information, answers,userAnswers, values){
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



const continueButton = document.querySelector('#continue-button');
continueButton.addEventListener('click', function(e) {
  let noOfMatches1 = matches(information, userSelections, userAnswers, values1)
  let noOfMatches2 = matches(information, userSelections, userAnswers, values2)
  let noOfMatches3 = matches(information, userSelections, userAnswers, values3)
  let score1 = noOfMatches1 / (values1.length - 1)
  let score2 = noOfMatches2 / (values2.length - 1)
  let score3 = noOfMatches3 / (values3.length - 1)

  
 

  localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  

  if ((score1 >= 0.8) || (score2 >= 0.8) || (score3 >= 0.8)){
    window.location.href = '../check9-image1/image1.html';
  }
  else{
    window.location.href = '../final-no-prediction/no-prediction.html';
  }
});


const buttons1 = document.querySelectorAll('#options-container button');
let allHidden = false;

buttons1.forEach(button => {
    if (button.id !== 'continue-button') {
        const computedStyle = window.getComputedStyle(button);
        if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
            allHidden = false;
            return; 
        }
    }
});

if (allHidden) {
    window.location.href = '../check9-image1/image1.html';
}



