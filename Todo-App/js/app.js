// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("item");

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let List, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  List = JSON.parse(data);
  id = List.length; // set id to the last one in the list
  loadList(List);
} else {
  List = [];
  id = 0;
}

// load the items to the UI
function loadList(arr) {
  arr.forEach(item => {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

//  clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})

// show today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us", options);


// add todo function
function addTodo(todo, id, done, trash) {
  if (trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${todo}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>  
              `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}


//add an item to the list when user press enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const todo = input.value;

    // if input isn't empty
    if (todo) {
      addTodo(todo, id, false, false);

      List.push({
        name: todo,
        id: id,
        done: false,
        trash: false
      });

      localStorage.setItem("TODO", JSON.stringify(List));
      id++;
    }
    input.value = "";
  }
});


// complete todo function
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  List[element.id].done = List[element.id].done ? false : true;
}


// remove todo function
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  List[element.id].trash = true;
}


//target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(List));
});