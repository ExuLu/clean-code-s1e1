// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.

var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".new-task__add-btn");
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

addButton.addEventListener("click", addTask);

function appendChildElementToParentElement(parentElement, childElements){
    childElements.forEach(element => parentElement.appendChild(element));
};

function createNewElement (elements) {
    const createdElements = elements.map(element => document.createElement(element));
    return createdElements;
}

function createAttributes(element, attributes) {
    element.className = attributes.className || '';
    element.type = attributes.type || '';
    element.src = attributes.src || '';
    element.alt = attributes.alt || '';
}

function createNewTaskElement(taskString) {

    const [
        listItem,
        checkBox,
        label,
        editInput,
        editButton,
        deleteButton,
        deleteButtonImg,
    ] = createNewElement(['li', 'input', 'label', 'input', 'button', 'button', 'img'])


    createAttributes(listItem, {className: 'task-item'});

    label.innerText = taskString;
    createAttributes(label, {className: 'task task-item__name'});

    createAttributes(checkBox, {type: 'checkbox', className: 'task-item__checkbox'});

    createAttributes(editInput, {type: 'text', className: 'task task-item__input'});

    editButton.innerText = "Edit";
    createAttributes(editButton, {className: 'task-item__edit-btn main-btn'});

    createAttributes(deleteButton, {className: 'task-item__delete-btn main-btn'});

    createAttributes(deleteButtonImg, {src: './remove.svg', alt: 'delete button', className: 'main-btn__img'});
    deleteButton.appendChild(deleteButtonImg);

    appendChildElementToParentElement(listItem, [checkBox, label, editInput, editButton, deleteButton]);
    return listItem;
}

function selectElements(parentElement, childElements) {
    const selectedElements = childElements.map(element => parentElement.querySelector(element));
    return selectedElements;
}

function toggleStates(elements, states) {
    elements.forEach((element, index) => element.classList.toggle(states[index]));
}

function switchTaskToAnotherList(list, listItem) {
    if (list === 'completed-tasks') { 
        incompleteTaskHolder.appendChild(listItem);
    } else if (list === 'incomplete-tasks') {
        completedTasksHolder.appendChild(listItem);
    } else return;
}

function addTask() {
    //Create a new list item with the text from the #new-task input:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);

    // Add eventHandlers to buttons in new listItem
    bindTaskEvents(listItem);

    // Delete text from input after adding new task
    taskInput.value="";
}

function editTask() {
    var listItem=this.parentNode;

    const [editInput, label, editBtn] = selectElements (
        listItem, ['.task-item__input', '.task-item__name', '.task-item__edit-btn']
    );
    var containsClass=listItem.classList.contains("task-item_edit-mode");

    if (containsClass) {
        // Add edited text to label
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else {
        // Add actual text to input
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    toggleStates([listItem, editInput, label], ["task-item_edit-mode", 'task-item__input_edit-mode', 'task-item__name_edit-mode'])
    
};

function deleteTask() {
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}

function taskCheck() {

    //Append the task to the todo-list
    var listItem = this.parentNode;
    const taskList = listItem.closest('.tasks-list__list').id;
    var [label] = selectElements(listItem, ['.task-item__name']);

    switchTaskToAnotherList(taskList, listItem);

    bindTaskEvents(listItem);
    toggleStates([label], ['task-item__name-complete']);
}


var bindTaskEvents = function(taskListItem){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".task-item__checkbox");
    var editButton=taskListItem.querySelector(".task-item__edit-btn");
    var deleteButton=taskListItem.querySelector(".task-item__delete-btn");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=taskCheck;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i]);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i]);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.