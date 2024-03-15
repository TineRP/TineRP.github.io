const buttons = document.querySelectorAll('#buttons-container button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '../when/when.html'
    });
});