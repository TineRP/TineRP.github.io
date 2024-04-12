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
        window.location.href = '../check2-month/month.html'
    });
});








