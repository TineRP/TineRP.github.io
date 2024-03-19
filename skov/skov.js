const buttons = document.querySelectorAll('#buttons-container button');

// Initialize an object to store user selections

const userSelections = {skov: "tom", when: "tom", farve: "tom"};


buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const selectedOption = e.target.textContent;
        userSelections["skov"] = selectedOption;
        console.log("SKOVSKOV")
        console.log(userSelections)

        window.location.href = '../when/when.html'
    });
});

const storedData = localStorage.getItem('information')
localStorage.setItem('information', JSON.stringify(JSON.parse(storedData)))
localStorage.setItem('answers', JSON.stringify(userSelections))







