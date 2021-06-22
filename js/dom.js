//variable global ambil id todos
const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

function addTodo() {
    //ambil id todos dari konstant
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

    //ambil data input title
    const textTodo = document.getElementById("title").value;

    //ambil data input date
    const timestamp = document.getElementById("date").value;
    
    //tampilkan todo
    const todo = makeTodo(textTodo, timestamp, false);

    const todoObject = composeTodoObject(textTodo, timestamp, false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedTODOList.append(todo);
    updateDataToStorage();
}

function makeTodo(data, timestamp, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimeStamp = document.createElement("p");
    textTimeStamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimeStamp);
    
    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    
    if (isCompleted) {
        container.append(createUndoButton(),createTrashButton());
    } else {
        container.append(createCheckButton());
    }
    return container;
}

function createButton(buttonTypeClass, eventListener) {
    const button =  document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
    
}

function createTrashButton() {
    return createButton("trash-button", function(event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle , taskTimestamp, true);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
 
    const newTodo = makeTodo(taskTitle, taskTimestamp, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;
 
    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
    //cari posisi todo di index ke berapa
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    //hapus todo
    todos.splice(todoPosition, 1)

    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);


    for (todo of todos) {
        const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if (todo.isCompleted) {
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
         
    }
}