const userSelections = JSON.parse(localStorage.getItem('answers'))
const monthDropdown = document.getElementById('month-dropdown');

const modelPrediction = JSON.parse(localStorage.getItem('modelPrediction'))

monthDropdown.addEventListener('change', function() {
    const selectedMonth = this.value;
    userSelections["month"] = selectedMonth;
    localStorage.setItem('answers', JSON.stringify(userSelections))
    window.location.href = '../check3-cap/cap.html';
});

const storedData = localStorage.getItem('information')
localStorage.setItem('information', JSON.stringify(JSON.parse(storedData)))

localStorage.setItem('modelPrediction', JSON.stringify(modelPrediction));

  

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
  submenu.style.display = 'none'; // Hide the submenu initially


  burgerIcon.addEventListener('click', function () {
      menuItems.classList.toggle('show');
  });

  speciesMenuItem.addEventListener('click', function (event) {
  const submenu = this.nextElementSibling;
  submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none'; // Toggle the submenu
  });
});



