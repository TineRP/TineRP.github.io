const buttons = document.querySelectorAll('#buttons-container button');
const information = JSON.parse(localStorage.getItem('information'))
const answers = JSON.parse(localStorage.getItem('answers'))
const prediction = JSON.parse(localStorage.getItem('prediction'))

const container = document.getElementById('question-container')

const paragraph = document.createElement('p');
paragraph.textContent = 'Sorry, I am not able to make a confident prediction ☹️';
container.appendChild(paragraph);

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