const options = document.querySelectorAll('#month-dropdown');

options.forEach(option => {
    option.addEventListener('click', function() {
        window.location.href = '../farve/farve.html'
    });
});

const storedData = localStorage.getItem('information')
localStorage.setItem('information', JSON.stringify(JSON.parse(storedData)))
console.log(storedData)
