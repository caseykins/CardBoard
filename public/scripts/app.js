console.log("sanity check")


// if statement that says if e.target.__ (class) 
//      filters through what's clicked and c.ls the target (update/delete/etc..)


function pDefault(e) {
    e.preventDefault()
}

const listContainer = document.querySelector(".listContainer")
listContainer.addEventListener('click', pDefault)
// console.log(listContainer)

function strikeThrough() {
    string.strike()
}