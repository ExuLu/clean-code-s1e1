//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".new-task__add-btn");
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

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

function createNewTaskElement (taskString){

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

function addTask(){
    //Create a new list item with the text from the #new-task input:
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);

    // Add eventHandlers to buttons in new listItem
    bindTaskEvents(listItem, taskCompleted);

    // Delete text from input after adding new task
    taskInput.value="";
}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task-item__input');
    var label=listItem.querySelector(".task-item__name");
    var editBtn=listItem.querySelector(".task-item__edit-btn");
    var containsClass=listItem.classList.contains("task-item_edit-mode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("task-item_edit-mode");
    editInput.classList.toggle('task-item__input_edit-mode');
    label.classList.toggle('task-item__name_edit-mode');
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    var label = listItem.querySelector('.task-item__name');
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    label.classList.toggle('task-item__name-complete');

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    var label = listItem.querySelector('.task-item__name');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    label.classList.toggle('task-item__name-complete');
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
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
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.