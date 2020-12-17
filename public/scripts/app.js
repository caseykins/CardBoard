console.log("sanity check")

function enter(event){
    if(event.which === 13){
        document.getElementById("listForm").dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
    }
}

document.getElementById("newListTitle").addEventListener("keydown", enter);

document.getElementById("listForm").addEventListener("submit", (event) => {
    console.log(event.target.newTitle.value)
});