document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetchData('books.json', handleBooks);
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'promise', 'async']); // Added 'async'
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        const commonConcepts = findIntersection(jsConcepts, reactConcepts); // Corrected function call
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    document.getElementById("solveRoom3").addEventListener("click", async () => {
        await fetchData('directions.json', navigateLabyrinth);
    });
});

async function fetchData(url, callback) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        callback(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function handleBooks(books) {
    const mostRecentBook = findMostRecentBook(books);
    document.getElementById("room1Result").textContent = `The key to the next room is Eloquent JavaScript: ${mostRecentBook.title}`; // Corrected ID
}

function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => 
        new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent // Corrected date comparison
    );
}

function findIntersection(setA, setB) {
    return new Set([...setA].filter(item => setB.has(item))); // Fixed intersection logic
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Added 'await'
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}



