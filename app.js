//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck); //will work for all items in todoList
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(event){
    //Prevent form form submitting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item"); //use to style css
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    //saving what was clicked
    const item = e.target;

    //delete todo    
    if (item.classList[0] === "trash-btn"){ //bad practice to check [0], could also use .contains
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    //check mark
    if (item.classList.contains("complete-btn")){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        filterTodo(); //calls function to update current filter status
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){ //checking each created todo
        const mStyle = todo.style;

        if (mStyle != undefined && mStyle != null){
        switch(filterOption.value){ //checking options value --> can be all, completeted or uncompleted
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            }
        }
    });
}

function saveLocalTodos(todo){
    //CHECK - do I already have thing in here?
    let todos; 
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); //get back the existing array
    }

    todos.push(todo); //collected todo and pushing into todos
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); //get back the existing array
    }

    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item"); //use to style css
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //CHECK - do I already have thing in here?
    let todos; 
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos")); //get back the existing array
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText); //going from div to li to get index
    todos.splice(todoIndex, 1); //removes value at index position, and 2nd arg tells how many we want to remove

    localStorage.setItem("todos", JSON.stringify(todos));
}