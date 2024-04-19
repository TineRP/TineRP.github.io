const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

let firstMushroom = Object.keys(information)[0]
let secondMushroom = Object.keys(information)[1]
let thirdMushroom = Object.keys(information)[2]

if (firstMushroom === 'Karl Johan' || secondMushroom === 'Karl Johan' || thirdMushroom === 'Karl Johan') {
    const div = document.querySelector('.slimy');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Boletus reticulatus' || secondMushroom === 'Boletus reticulatus' || thirdMushroom === 'Boletus reticulatus') {
    const div = document.querySelector('.dry');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Rubroboletus satanas' || secondMushroom === 'Rubroboletus satanas' || thirdMushroom === 'Rubroboletus satanas') {
    const div = document.querySelector('.greenish');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Cantharellus cibarius' || secondMushroom === 'Cantharellus cibarius' || thirdMushroom === 'Cantharellus cibarius') {
    const div = document.querySelector('.samecolor');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Hygrophoropsis aurantiaca' || secondMushroom === 'Hygrophoropsis aurantiaca' || thirdMushroom === 'Hygrophoropsis aurantiaca') {
    const div = document.querySelector('.velvet');
    div.style.display = "block";
    div.style.textAlign = "center";
}


if (firstMushroom === 'Pleurotus ostreatus' || secondMushroom === 'Pleurotus ostreatus' || thirdMushroom === 'Pleurotus ostreatus') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
} 

if (firstMushroom === 'Sarcomyxa serotina' || secondMushroom === 'Sarcomyxa serotina' || thirdMushroom === 'Sarcomyxa serotina') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Pleurotus pulmonarius' || secondMushroom === 'Pleurotus pulmonarius' || thirdMushroom === 'Pleurotus pulmonarius') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Pleurocybella porrigens' || secondMushroom === 'Pleurocybella porrigens' || thirdMushroom === 'Pleurocybella porrigens') {
    const div = document.querySelector('.tree');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Hydnum umbilicatum' || secondMushroom === 'Hydnum umbilicatum' || thirdMushroom === 'Hydnum umbilicatum') {
    const div = document.querySelector('.bellybutton');
    div.style.display = "block";
    div.style.textAlign = "center";
}

if (firstMushroom === 'Agaricus arvensis' || secondMushroom === 'Agaricus arvensis' || thirdMushroom === 'Agaricus arvensis') {
    const div = document.querySelector('.yellow');
    div.style.display = "block";
    div.style.textAlign = "center";
}
const buttons = document.querySelectorAll('#options-container button');

let userAnswers = {};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.style.backgroundColor = 'rgb(106, 148, 106)'; 
    
    const questionContainer = button.closest('.tfjs-example-container > div');
    const question = questionContainer.querySelector('p').textContent.trim();
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

const continueButton = document.querySelector('#continue-button');
continueButton.addEventListener('click', function(e) {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    window.location.href = '../check9-image1/image1.html';
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



