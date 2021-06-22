const STORAGE_KEY = "TODO_APPS";

//buat array
let todos = [];

//cek apakah storage ada atau tidak
function isStorageExist() /*boolean*/{
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

//simpan data
function saveData() {
    //convert dati string ke JSON
    const parsed = JSON.stringify(todos);
    //add ke localstorage
    localStorage.setItem(STORAGE_KEY, parsed);
    //buat event baru
    document.dispatchEvent(new Event("ondatasaved"));
}

//load data
function loadDataFromStorage() {
    //ambil data
    const serializedData = localStorage.getItem(STORAGE_KEY);

    //tampung di variable data
    //convert dari JSON ke string
    let data = JSON.parse(serializedData);

    //jika data tidak ada
    if (data !== null) 
        //diambil dari variable data
        todos = data;

    document.dispatchEvent(new Event ("ondataloaded"));
    
}

//update data
function updateDataToStorage() {
    if (isStorageExist()) {
        saveData();
    }
}

function composeTodoObject(task, timestamp, isCompleted) {
    return {
        id: +new Date(),
        task,
        timestamp,
        isCompleted
    };
}

//cari todo
function findTodo(todoId) {
    for (todo of todos) {
        if (todo.id === todoId) {
            return todo;
        }
    }
    
    return null;

}

function findTodoIndex(todoId) {
    let index = 0
    for (todo of todos) {
        if(todo.id === todoId)
            return index;
  
        index++;
    }
  
    return -1;
 }