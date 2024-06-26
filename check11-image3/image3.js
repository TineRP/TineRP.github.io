const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const thirdMostLikely = JSON.parse(localStorage.getItem('thirdMostLikely'))

// Show 4 images for most likely species
for (let i = 1; i <= 4 ; i ++){
    let path = "../images/" + thirdMostLikely + "/" + thirdMostLikely + i + ".jpg"
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
    localStorage.setItem('prediction', JSON.stringify(thirdMostLikely))
    window.location.href = '../final-finish/finish.html'
});

function nextPage(){
    window.location.href = '../final-no-prediction/no-prediction.html'
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