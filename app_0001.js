const form = document.querySelector("form");
const todoList = document.querySelector("#todo-list");


let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];



for (let i = 0; i < savedTodos.length; i++) {
  let newLi = document.createElement("li");
  newLi.innerText = savedTodos[i].task;


  let completedBtn = document.createElement("button");
  let removeBtn = document.createElement("button");
  completedBtn.innerText = "completed";
  removeBtn.innerText = "remove";
  removeBtn.className = "remove"
  completedBtn.className = "completed";
  removeBtn.setAttribute("name", savedTodos[i].task)
  completedBtn.setAttribute("status", savedTodos[i].isCompleted)
  // completedBtn.setAttribute("name", savedTodos[i].task)
  newLi.append(completedBtn);
  newLi.append(removeBtn);

  newLi.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newLi.isCompleted) {
    newLi.style.textDecoration = "line-through";
    completedBtn.className = "completed"}
    else {
    newLi.style.textDecoration = "none";
    completedBtn.className = ""

    }

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
    completedBtn.setAttribute("status", false)
    // completedBtn.setAttribute("name", newTodoInput.value)
    removeBtn.setAttribute("name", newTodoInput.value)
    console.log(savedTodos)




    savedTodos.push({ task: newLi.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    newLi.append(completedBtn);
    newLi.append(removeBtn);
    todoList.append(newLi);

    form.reset();


})


todoList.addEventListener("click", function(event) {
    let itemClicked = event.target;
    let result =[];
    if (itemClicked.className === "remove") {
      let removeItemName = itemClicked.getAttribute("name")
      for (let i=0; i < savedTodos.length; i++){
        let taskName = savedTodos[i].task;
        if (taskName !== removeItemName){
          result.push({ task: taskName, isCompleted: false });}
      }

      localStorage.setItem("todos", JSON.stringify(result));
      savedTodos = result 
      console.log(savedTodos)
      itemClicked.parentElement.remove();
      
    };
    if (itemClicked.className === "completed"){
      let completionStatus = itemClicked.getAttribute("status");
      console.log(completionStatus);
      if(completionStatus === "false") {
        itemClicked.setAttribute("status", true);
        itemClicked.parentElement.style.textDecoration = "line-through";

      };
      if (completionStatus === "true"){
        itemClicked.setAttribute("status", false);
        itemClicked.parentElement.style.textDecoration = "none"
      }
    }
        
        // itemClicked.className = "";
    //     // itemClicked.isCompleted = true;
    // } else if (itemClicked.className === ""){
    //     itemClicked.parentElement.style.textDecoration = "none";
    //     itemClicked.className = "completed";
    //     itemClicked.isCompleted = false;
    // };
  }); 

