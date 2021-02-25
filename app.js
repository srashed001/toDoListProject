const form = document.querySelector("form");
const todoList = document.querySelector("#todo-list");


const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];


for (let i = 0; i < savedTodos.length; i++) {
  let newLi = document.createElement("li");
  newLi.innerText = savedTodos[i].task;


  let completedBtn = document.createElement("button");
  let removeBtn = document.createElement("button");
  completedBtn.innerText = "completed";
  removeBtn.innerText = "remove";
  removeBtn.className = "remove"
  newLi.append(completedBtn);
  newLi.append(removeBtn);

  newLi.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (!newLi.isCompleted) {
    newLi.style.textDecoration = "line-through";}

  todoList.appendChild(newLi);
}



form.addEventListener("submit", function(e){
    e.preventDefault();
    const newTodoInput = document.querySelector("#todo-item");
    const newLi = document.createElement("li");
    const completedBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    newLi.innerText = newTodoInput.value; 
    completedBtn.innerText = "completed";
    removeBtn.innerText = "remove";
    removeBtn.className = "remove"
    completedBtn.className = "completed";



    savedTodos.push({ task: newLi.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    newLi.append(completedBtn);
    newLi.append(removeBtn);
    todoList.append(newLi);

    form.reset();


})


todoList.addEventListener("click", function(event) {
    if (event.target.className === "remove") {
      event.target.parentElement.remove();

    };
    if (event.target.className === "completed") {
        event.target.parentElement.style.textDecoration = "line-through";
        event.target.className = "";
        event.isCompleted = true;
    } else if (event.target.className === ""){
        event.target.parentElement.style.textDecoration = "none";
        event.target.className = "completed";
        event.isCompleted = false;
    };
  }); 

