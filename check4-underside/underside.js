const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))
const button = document.createElement("button");
button.textContent = "Not sure";
container.append(button);

const buttons = document.querySelectorAll('#buttons-container button');

/*const optionsMapping = {
    "Pores: small, sponge-like holes": "pores",
    "Teeth: long, thin tooth-like growths that hang from the mushrooms cap": "teeth",
    "Gills: small, thin-walled structure. Can be removed from the cap when touched": "gills",
    "Ridges: a thin-walled structure like the gills, but cannot be removed from the mushroom when touched": "ridges"
};
*/

buttons.forEach((button, index) => {
    button.addEventListener('click', function(e) {
        const selectedOption = e.target.textContent;
        console.log(selectedOption.trim())
        let answer;
        if (selectedOption.trim() == "Pores: small, sponge-like holes"){
            answer = "Pores";
        } else if (selectedOption.trim() == "Teeth: long, thin tooth-like growths that hang from the mushrooms cap"){
            answer = "Teeth"
        } else if (selectedOption.trim() == "Gills: small, thin-walled structure. Can be removed from the cap when touched"){
            answer = "Gills"
        } else {
            answer = "Ridges"
        }

        /*const mappedOption = optionsMapping[selectedOption];*/
        console.log(answer)

        /*userSelections["underside"] = mappedOption;*/
        userSelections["underside"] = answer;

        localStorage.setItem('answers', JSON.stringify(userSelections))
        localStorage.setItem('modelPrediction', JSON.stringify(modelPrediction));
        



        window.location.href = '../check5-stem/stem.html'
    });
});

