console.log("sanity check")

const addCard = () => {
    document.querySelector('.cardContainer').innerHTML += 
    `<div class="card">
        <input placeholder="Card Title" />
        <form>
        <input placeholder="Add a task" />
        <button>+</button>
        </form>
    </div>`
}

document.querySelector("#addCardBtn").addEventListener('click', addCard)
