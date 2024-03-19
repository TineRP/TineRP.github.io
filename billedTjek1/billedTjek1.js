const buttons = document.querySelectorAll('#buttons-container button');

// Initialize an object to store user selections



const information = JSON.parse(localStorage.getItem('information'))

const answers = JSON.parse(localStorage.getItem('answers'))

console.log(information)
console.log(answers)

function matches(information, answers){
    let mostMatches = 0
    let mostLikely = ""

    for (let i = 0 ; i < Object.keys(information).length; i++){
        let matchCount = 0

        const className = Object.keys(information)[i]
        const values = information[className]

        if(values[1].includes(answers["skov"].toLowerCase().trim())){
            matchCount += 1
            console.log("JEG ER HER")
        }

        if(values[2].includes(answers["when"].toLowerCase().trim().substring(0,3))){
            matchCount += 1
            console.log("JEG ER HER2")
        }

        if (answers["farve"] == values[3]){
            matchCount += 1
        }

        if (matchCount > mostMatches){
            mostMatches = matchCount
            mostLikely = className
        }

    }
    
    console.log(mostMatches)
    console.log(mostLikely)
    

    return mostLikely
}

const mostLikely = matches(information,answers)

for (let i = 1; i <= 4 ; i ++){
    let path = "../Billeder/" + mostLikely + "/" + mostLikely + i + ".jpg"

    const imgElement = document.createElement("img");
    imgElement.src = path

    const imageContainer = document.getElementById("imageContainer")

    imageContainer.appendChild(imgElement)
}


//buttons.forEach(button => {
  //  button.addEventListener('click', function(e) {
    //    const selectedOption = e.target.textContent;
      //  userSelections["skov"] = selectedOption;
        
        
        //localStorage.setItem('answers', JSON.stringify(userSelections))
        //window.location.href = '../when/when.html'
    //});
//});