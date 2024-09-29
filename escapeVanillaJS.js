document.addEventListener("DOMContentLoaded", () => {
    // Corrected ID for attaching the event listener for Room 1.
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // Corrected element ID for displaying results.
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']); // Added missing 'async'
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // Corrected function call to find the intersection of jsConcepts and reactConcepts
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    document.getElementById("solveRoom3").addEventListener("click", async () => { // Made this function async
        const directions = await fetch('directions.json').then(response => response.json()); // Await fetch
        const message = await navigateLabyrinth(directions); // Await the labyrinth function
        document.getElementById("room3Result").textContent = message; // Corrected method to set textContent
    });
});

function findMostRecentBook(books) {
    // Corrected logic for finding the most recent book
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {
    // Corrected logic to find the intersection of two sets
    const intersection = new Set([...setA].filter(item => setB.has(item)));
    return intersection;
}

async function navigateLabyrinth(directions) {
    let result = ""; // Initialize result string to accumulate messages
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay with await
        console.log(`Navigating: ${direction.step}`);
        result += `Navigated ${direction.step}. `; // Append to result
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!" + result;
}