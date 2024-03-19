/*const options = document.querySelectorAll('#month-dropdown');

options.forEach(option => {
    option.addEventListener('click', function() {
        window.location.href = '../farve/farve.html'
    });
});*/

const userSelections = JSON.parse(localStorage.getItem('answers'))



const monthDropdown = document.getElementById('month-dropdown');


monthDropdown.addEventListener('change', function() {
    const selectedMonth = this.value;
    
    
    userSelections["when"] = selectedMonth;

    localStorage.setItem('answers', JSON.stringify(userSelections))

    window.location.href = '../farve/farve.html';
});

const storedData = localStorage.getItem('information')
localStorage.setItem('information', JSON.stringify(JSON.parse(storedData)))

console.log(storedData)
