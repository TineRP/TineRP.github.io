const options = document.querySelectorAll('#month-dropdown');

options.forEach(option => {
    option.addEventListener('click', function() {
        window.location.href = '../farve/farve.html'
    });
});

const storedData = localStorage.getItem('classes')
localStorage.setItem('classes', JSON.stringify(JSON.parse(storedData)))
console.log(storedData)
