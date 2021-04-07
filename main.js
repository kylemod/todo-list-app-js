let todos = []

const updateForm = document.getElementById('updateForm') 

let updateId = ''

const form = document.querySelector("#todo-form");

// called when form submit
form.addEventListener("submit", e => {
  // prevent form from being refresh
  e.preventDefault(); 
  
  let textInput = document.querySelector("#todoText");
  
  // get value and remove spaces
  let text = textInput.value.trim();
  
  // if input is empty
  if(!text) {
    alert('text is required!')
  } else {
    // addTodo will be called and we pass the data as a parameter
    addTodo(text)
    // set input to empty
    textInput.value = ""
  }
})

function addTodo(todoText) {
  
  const todo = {
    todoText,
    id: Date.now() // for id we use date for now
  }
  
  todos.push(todo) 
  // to display our text 
  displayTodo()
  console.log(todos)
} 

function displayTodo() {
  const todoList = document.querySelector("#todo-list");
  
  // create element
  let li = document.createElement("li");
  
  todos.forEach(todo => {
    // set our li element data
  li.innerHTML = `
  <p id=${todo.id}>
    <span>${todo.todoText}</span>
    <button onclick="update(${todo.id})">update</button>
    <button onclick="deleteTodo(${todo.id})">delete</button>
  </p>
  `
  })
  
  // add a new element as a first element always
  todoList.insertBefore(li, todoList.childNodes[0])
}

function update(todoId) {
  
  const list = document.getElementById(`${todoId}`).childNodes[1].innerHTML 
  
  updateForm.childNodes[1].value = list
  
  //we set updateId to use it to updateTodo() func
  updateId = todoId

  updateForm.style.display = "block"
}

function cancel() {
  updateForm.style.display = "none" 
  updateForm.childNodes[1].value = ""
}

function updateTodo() {
  let list = document.getElementById(`${updateId}`).childNodes[1]
  
  const newTodoText = updateForm.childNodes[1].value
  
  todos.findIndex(todo => {
    if(todo.id === updateId) {
      list.innerHTML = newTodoText
      todo.todoText = newTodoText
    }
  })
  
  console.log(todos)
  
  updateForm.style.display = "none" 
  updateForm.childNodes[1].value = ""
}

function deleteTodo(todoId) {
  // delete the ui element
  const list = document.getElementById(`${todoId}`)
  list.parentElement.remove()
  
  // return the index of an array
  let listIndex = todos.findIndex(todo => {
    return todo.id === todoId
  })
  
  // delete the array according to its index
  todos.splice(listIndex, 1)
  
  console.log(todos)
}