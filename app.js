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
  completedBtn.setAttribute("name", savedTodos[i].task)
  newLi.append(completedBtn);
  newLi.append(removeBtn);

  newLi.isCompleted = savedTodos[i].isCompleted;
  if (newLi.isCompleted) {
    newLi.style.textDecoration = "line-through";
  }
    else {
    newLi.style.textDecoration = "none";
  
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
    completedBtn.setAttribute("name", newTodoInput.value)
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
        let completionStatus = savedTodos[i].isCompleted;
        let taskName = savedTodos[i].task;
        if (taskName !== removeItemName){
          result.push({ task: taskName, isCompleted: completionStatus});}
      }
      localStorage.setItem("todos", JSON.stringify(result));
      savedTodos = result 
      itemClicked.parentElement.remove();
      
    };
    if (itemClicked.className === "completed"){
      let completionStatus = itemClicked.getAttribute("status");
      console.log(completionStatus);
      let results = [];
      if(completionStatus === "false") {
        itemClicked.setAttribute("status", true);
        itemClicked.parentElement.style.textDecoration = "line-through";
        let statusName = itemClicked.getAttribute("name");
        for (let i=0; i < savedTodos.length; i++){
          let completionStatus = savedTodos[i].isCompleted;
          let taskName = savedTodos[i].task;
          if (taskName !== statusName){
            results.push({ task: taskName, isCompleted: completionStatus});
        } else results.push({ task: taskName, isCompleted: true})
      } 
      localStorage.setItem("todos", JSON.stringify(results));
   
      };
      if (completionStatus === "true"){
        itemClicked.setAttribute("status", false);
        itemClicked.parentElement.style.textDecoration = "none";
        let statusName = itemClicked.getAttribute("name");
        for (let i=0; i < savedTodos.length; i++){
          let completionStatus = savedTodos[i].isCompleted;
          let taskName = savedTodos[i].task;
          if (taskName !== statusName){
            results.push({ task: taskName, isCompleted: completionStatus});
        } else results.push({ task: taskName, isCompleted: false})
      } 
      localStorage.setItem("todos", JSON.stringify(results));
      }
    }
  }); 

