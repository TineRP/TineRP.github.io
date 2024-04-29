const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))

const buttons = document.querySelectorAll('#buttons-container button');

// Initialize an object to store user selections
const userSelections = {environment: "", month: "", cap: "", underside: "", stem: "", smell: "", taste: "", other: ""};


const storedData = localStorage.getItem('information')
localStorage.setItem('information', JSON.stringify(JSON.parse(storedData)))


buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const selectedOption = e.target.textContent;
        userSelections["environment"] = selectedOption;
        
        
        localStorage.setItem('answers', JSON.stringify(userSelections))

        localStorage.setItem('modelPrediction', JSON.stringify(modelPrediction));
        


        window.location.href = '../check2-month/month.html'
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





