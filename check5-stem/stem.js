const storedData = localStorage.getItem('information')
const information = JSON.parse(storedData)
const container = document.getElementById('buttons-container')
const userSelections = JSON.parse(localStorage.getItem('answers'))

const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))

for (let i = 0; i < Object.keys(information).length; i++) {
    const className = Object.keys(information)[i];
    const buttonText = information[className][5];
    
    let buttonExists = false;
    const existingButtons = container.querySelectorAll("button");
    existingButtons.forEach(button => {
        if (button.textContent === buttonText) {
            buttonExists = true;
            return; 
        }
    });

    if (!buttonExists) {
        const button = document.createElement("button");
        button.textContent = buttonText;
        container.appendChild(button);
    }
}

const button = document.createElement("button");
button.textContent = "Not sure";
container.append(button);

const buttons = document.querySelectorAll('#buttons-container button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const selectedOption = e.target.textContent;
        userSelections["stem"] = selectedOption;
        localStorage.setItem('answers', JSON.stringify(userSelections))

        localStorage.setItem('modelPrediction', JSON.stringify(modelPrediction));

        window.location.href = '../check6-smell/smell.html'
    });
});

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