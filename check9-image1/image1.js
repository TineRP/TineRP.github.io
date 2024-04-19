const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
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
        if(values[1].includes(answers["environment"].toLowerCase().trim())){ 
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

    return { mostLikely, matchCounts: sortedMatchCounts };
    }


const { mostLikely, matchCounts } = matches(information, answers);

// Show 4 images for most likely species
for (let i = 1; i <= 4 ; i ++){
    let path = "../images/" + mostLikely + "/" + mostLikely + i + ".jpg"
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
    localStorage.setItem('prediction', JSON.stringify(mostLikely))
    window.location.href = '../final-finish/finish.html'
});

function nextPage(){
    const matchCountsArray = Object.entries(matchCounts);
    const secondMostLikely = matchCountsArray[1][0];
    const thirdMostLikely = matchCountsArray[2][0]
    localStorage.setItem('secondMostLikely', JSON.stringify(secondMostLikely))
    localStorage.setItem('thirdMostLikely', JSON.stringify(thirdMostLikely))
    window.location.href = '../check10-image2/image2.html'
}
noButton.addEventListener('click', nextPage);
notSureButton.addEventListener('click', nextPage);