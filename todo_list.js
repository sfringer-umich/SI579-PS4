
const taskButton = document.querySelector('#add_task');
const taskInput = document.querySelector('input#task_description_input');
document.querySelector('#duedate_input').value = '';
document.querySelector('#duetime_input').value = '';
document.querySelector('li').style.display = "none";

//define a function named addTask that accepts two arguments:
//(1) description, which will be a string with a task description
//(2) dueTime, which will be a timestamp representing when that task is due
//the addTask function should add a new item to the ul#task_list element to represent the task. 

function addTask(description, dueTime) {
    let list = document.querySelector('ul#task_list');
    let item = document.createElement('li');

    var date = new Date(dueTime);
    var fullDateTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    
    if (dueTime) {
        item.innerHTML = `\n                    <span class="desc">${description}</span>\n                    <span class="due">${fullDateTime}</span>\n                    <button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }

    else {
        item.innerHTML = `\n                    <span class="desc">${description}</span>                   \n                    <button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }

    list.insertBefore(item, list.childNodes[0])

    //Allow the user to press "done" to remove a task. 
    const deleteButton = document.querySelector('li .btn');
    deleteButton.addEventListener("click", () => {
        item.remove();
    });
    
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}


taskButton.addEventListener('click', function () {
    let description = document.getElementById('task_description_input').value;
    let dueDate = document.querySelector('#duedate_input');
    let dateTime = document.querySelector('#duetime_input');
    let dueTime = dateAndTimeToTimestamp(dueDate, dateTime);

    if (description) {
        addTask(description, dueTime);

        //Clear the content of the input#task_description_input element, as well as the corresponding date and time. 
        document.getElementById('task_description_input').value = '';
        document.querySelector('#duedate_input').value = '';
        document.querySelector('#duetime_input').value = '';
    }
});

// Add the ability to press <ENTER> to submit a task. Write an event listener on the input#task_description_input element that waits for the user to press the <ENTER> key (using the "keydown" // event) and adds the task when they do.


taskInput.addEventListener("keydown", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      taskButton.click();
    }
  });









