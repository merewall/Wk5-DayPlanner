// TODAY'S DATE: 

// Creating a variable to select the html location to render today's date and another variable to generate today's date
let dateDiv = $('#currentDay');
let todaysDate = moment().format('dddd, LL');

// A function that renders the date to the page
function renderDate() {
    dateDiv.text(todaysDate)
}
renderDate()

// ---------------------------------------------------------------------------------------------------//

// DAY PLANNER:

// Creating a variable that is an array of the hours of the day to display on the planner and another variable for the current time of day
let hourOfDayArray = ['01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00', ];
let currentTime = moment();

// Creating variables to select html elements on the page for the hour, the day planner form, the div in which to display saved tasks, and the user input area
let $hoursDivs = $('.hour-of-day');
let $formDivs = $('form');
let $savedTaskDivs = $('.saved-task');
let $inputs = $('input[type="text"]');

// Creating empty array variables for which to eventually push user-inputted tasks and the corresponding hour
let toDos = [];
let toDosHours = [];

// Rendering the hours of the day to the planner by iterating over the hourOfDayArray, formatting each hour as a moment, and displaying each hour into its respective divs
function renderHoursOfDay() {
    for (let i = 0; i < hourOfDayArray.length; i++) {
        let hourSlot = moment(hourOfDayArray[i], 'hh:mm:ss').format('LT');
        $hoursDivs[i].textContent = hourSlot;
    }
}
renderHoursOfDay()

// Checking whether the current time falls before, after or between each hour on the planner and dynamically changing the styling of the planner based on the time of day
function hourIntervalCheck() {
    
    for (i = 0; i < hourOfDayArray.length; i++) {
        // Creating variables such that the current time can be compared to 1-hour intervals of a 'before' time and 'after' time and iterated through all the hour-long segments of the day
        let beforeTime = moment(hourOfDayArray[i], 'hh:mm:ss');
        let afterTime = moment(hourOfDayArray[i+1], 'hh:mm:ss');

        // Checking if the current time falls between an hour-long interval
        if(currentTime.isBetween(beforeTime,afterTime)) {
            // ...if so, add the class "present" to the savedTaskDiv and input div that is affiliated with the hour interval in order to change their background-color
            $savedTaskDivs[i].classList.add('present');
            $inputs[i].classList.add('present');
            // ...otherwise, checking if the current time is before the hour interval
        } else if (currentTime < beforeTime) {
            // ...if so, add the class "future" to the savedTaskDiv and input div that is affiliated with the hour interval in order to change their background-color
            $savedTaskDivs[i].classList.add('future');
            $inputs[i].classList.add('future');
            // ...and if the current time is neither between or before the hour interval
        } else {
            // ...then add the class "past" to the savedTaskDiv and input div that is affiliated with the hour interval in order to change their background-color
            $savedTaskDivs[i].classList.add('past');
            $inputs[i].classList.add('past');
        };
    }
}
hourIntervalCheck();

// Creating a function to handle what happens when any save button is clicked on the day planner
function handleSaveBtns() {

    // When a save button is clicked on the day planner...
    $('form').submit(function (event) {

        // Preventing the default form submission behavior
        event.preventDefault();

        // Creating variables that grabs the user's input task and the id of the associated input div
        let userTaskInput = event.currentTarget[0].value;
        let userTaskId = event.currentTarget[0].id;

        if(!userTaskInput) {
            return
        }

        // Using the id of the input element on which a user clicked the save button, grab the associated savedTaskDiv
        // Note: the id of the input area for each hour segment is equal to the hour (i.e. 1am has an id of 1), so 1 is subtracted from the userTaskId to get the associated index in the array
        let targetDisplayArea = $savedTaskDivs[userTaskId-1];
        
        // Adding the user's input to the page at the associated hour
        targetDisplayArea.append("  ☞  " + userTaskInput);
        
        // Pushing the user's input and input id (i.e. the associated hour) to respective arrays that will be saved to local storage
        toDos.push(userTaskInput);
        toDosHours.push(userTaskId);
        
        // Storing the inputs/hours arrays in local storage.
        storeToDos();
        
        // Resetting the input area to blank
        $inputs.val("");

    })
}
handleSaveBtns()

// --------------------------------------------------------------------------------------------------------------------------------//

// LOCAL STORAGE:

// Creating a function to store the arrays of user's inputs and associated div ids (i.e. associated hour) as strings to local storage
function storeToDos() {
    localStorage.setItem("user-todo", JSON.stringify(toDos));
    localStorage.setItem("user-todo-hour", JSON.stringify(toDosHours));
}

// Creating a function to pull the strings of user's inputs and associated div ids from local storage and parse them into objects
function renderToDos() {
    let storedToDos = JSON.parse(localStorage.getItem("user-todo"));
    let storedToDosHours = JSON.parse(localStorage.getItem("user-todo-hour"));

    // Checking whether there are any stored user inputs/hours on local storage
    if (storedToDos) {
        // ...if so, set the array of user tasks to the stored user task inputs
        toDos = storedToDos;
        // ...and then loop over the array of stored tasks
        for (let i=0; i < storedToDos.length; i++) {
            // ...and set an index value to the value of the stored hour and subtract one (remember: the div for 1am has an 'hour' value of 1, but index value of 0). This aligns the targeted div with the hour.
            // ...and create a variable that grabs the div associated with the associated index value
            let indexValue = storedToDosHours[i]-1;
            let selectedDiv = $savedTaskDivs[indexValue];
            // ...then add the associated stored user task to its selected div
            selectedDiv.append("  ☞  " + storedToDos[i]);
        }
    }
    
    // Checking whether there are any stored hours
    if(storedToDosHours) {
        // ...if so, set the array of task hours to the stored hours
        toDosHours = storedToDosHours;
    }
}
// When page loads, render any saved tasks in their associated hours
renderToDos()

// --------------------------------------------------------------------------------------------------------------------------//

// OPTION BUTTONS:

// Creating a variable to grab all rows that are not within work hours
let notWorkDivs = $(".notWork");

// Creating a click event listener for the "Show Work Hours" button 
// such that the non-work hours (i.e. before 8am and after 5pm) are hidden from the page when clicked
$('#showWorkHours').on("click",showWorkHoursOnly);

function showWorkHoursOnly() {
    notWorkDivs.attr("style", "display:none");
}

// Creating a click event listener for the "Show All Hours" button 
// such that all work hours (i.e. before 8am and after 5pm) are hidden from the page when clicked
$('#showAllHours').on("click",showAllHours);
function showAllHours() {
    notWorkDivs.attr("style", "display:reset");
}

// Creating a click event listener for the "Clear Tasks" button 
// such that local storage is emptied and tasks cleared from page
$('#clearTasks').on("click",clearTasks);
function clearTasks() {
    localStorage.clear();
    location.reload();
}

// When page loads, show work hours only
showWorkHoursOnly();
