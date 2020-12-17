console.log("sanity check")


// if statement that says if e.target.__ (class) 
//      filters through what's clicked and c.ls the target (update/delete/etc..)


// function pDefault(e) {
//     e.preventDefault()
// }

// const listContainer = document.querySelector(".listContainer")
// listContainer.addEventListener('click', pDefault)
// // console.log(listContainer)

// function strikeThrough() {
//     string.strike()
// }

function submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
}

document.getElementById("#addList").addEventListener("keypress", submitOnEnter);

document.getElementById("#addListForm").addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log("form submitted");
});