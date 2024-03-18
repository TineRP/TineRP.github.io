const buttons = document.querySelectorAll('#buttons-container button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '../when/when.html'
    });
});

const storedData = localStorage.getItem('classes')
localStorage.setItem('classes', JSON.stringify(JSON.parse(storedData)))
console.log(storedData)
