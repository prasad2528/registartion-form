let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");


function getTodolist() {
    let stringfied = localStorage.getItem("todolist");
    let parsedTodo = JSON.parse(stringfied);
    if (parsedTodo === null) {
        return [];
    } else {
        return parsedTodo;
    }
}
let todolist = getTodolist();
saveTodoButton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
    alert("File Saved")
}

function onAddTodo() {
    let todosCount = todolist.length;
    todosCount = todosCount + 1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Input");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount
    };
    todolist.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = ""
};
addTodoButton.onclick = function() {
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todolist.findIndex(function(eachTodo) {
        let eachTOdoId = "todo" + eachTodo.uniqueNo;
        if (eachTOdoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todolist[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todolist.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkboxInput");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    iconElement.onclick = function() {
        onDeleteTodo(todoId);
    }
    deleteContainer.appendChild(iconElement);
}
for (let todo of todolist) {
    createAndAppendTodo(todo);
}