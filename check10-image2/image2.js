const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const secondMostLikely = JSON.parse(localStorage.getItem('secondMostLikely'))
//const thirdMostLikely = JSON.parse(localStorage.getItem('thirdMostLikely'))
const otherAnswers = JSON.parse(localStorage.getItem('userAnswers'))

function matches(information, answers){
    let mostMatches = 0
    let mostLikely = ""
    const matchCounts = {};

    for (let i = 0 ; i < Object.keys(information).length; i++){
        let matchCount = 0

        const className = Object.keys(information)[i]
        const values = information[className]

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

        // Store the match count for the current class
        matchCounts[className] = matchCount;
        
        
        // Check if it has more matches than previous species
        if (matchCount > mostMatches){
            mostMatches = matchCount
            mostLikely = className
        }
    }
    // Sort matchCounts object by match count
    const sortedMatchCounts = Object.fromEntries(
    Object.entries(matchCounts).sort(([,a],[,b]) => b - a)
    );
    
    return { mostLikely, matchCounts, sortedMatchCounts };
    }


const { mostLikely, matchCounts, sortedMatchCounts } = matches(information, answers);


const [className, matchCount3] = Object.entries(sortedMatchCounts)[2]
let score3 = matchCount3/(information[className].length - 1)


// Show 4 images for most likely species
for (let i = 1; i <= 4 ; i ++){
    let path = "../images/" + secondMostLikely + "/" + secondMostLikely + i + ".jpg"
    const imgElement = document.createElement("img");
    imgElement.src = path
    imgElement.style.width = "500px"
    imgElement.style.height = "500px"
    const imageContainer = document.getElementById("imageContainer")
    imageContainer.appendChild(imgElement)
}

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const notSureButton = document.getElementById("not-sure-button");

yesButton.addEventListener('click', function() {
    localStorage.setItem('prediction', JSON.stringify(secondMostLikely))
    window.location.href = '../final-finish/finish.html'
});

function nextPage(){
    if (score3 > 0.6){
        window.location.href = '../check11-image3/image3.html'
    }
    else{
        window.location.href = '../final-no-prediction/no-prediction.html';
    }
}

noButton.addEventListener('click', nextPage);
notSureButton.addEventListener('click', nextPage);

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