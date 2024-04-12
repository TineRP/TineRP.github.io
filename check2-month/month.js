const userSelections = JSON.parse(localStorage.getItem('answers'))
const monthDropdown = document.getElementById('month-dropdown');

monthDropdown.addEventListener('change', function() {
    const selectedMonth = this.value;
    userSelections["month"] = selectedMonth;
    localStorage.setItem('answers', JSON.stringify(userSelections))
    window.location.href = '../check3-cap/cap.html';
});

const storedData = localStorage.getItem('information')
localStorage.setItem('information', JSON.stringify(JSON.parse(storedData)))

console.log(storedData)
