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

document.addEventListener('DOMContentLoaded', function () {
    const burgerIcon = document.querySelector('.burger-icon');
    const menuItems = document.querySelector('.menu-items');
  
    burgerIcon.addEventListener('click', function () {
      menuItems.classList.toggle('show');
    });
  });
  