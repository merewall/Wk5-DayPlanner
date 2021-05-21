let dateDiv = document.getElementById("currentDay")
let todaysDate = moment().format('dddd, LL');

function renderDate() {
    dateDiv.textContent = todaysDate;
}
renderDate()

let hourOfDayArray = ['01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00', '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00', ]

let currentTime = moment();

let hoursDivs = $('.hour-of-day');
let $formDivs = $('form');
let inputDivs = $('.task-input');
let $inputs = $('input[type="text"]');

for (let i = 0; i < hourOfDayArray.length; i++) {
    let hourSlotText = moment(hourOfDayArray[i], 'hh:mm:ss').format('LT');
    hoursDivs[i].textContent = hourSlotText;
    // hoursDivs[i].setAttribute('id',i)
}

// $.each(hoursDivs, function (index) {
//     $('.hour-of-day')[index].text(moment(hourOfDayArray[index], 'hh:mm:ss').format('LT'))
// })

for (i = 0; i < hourOfDayArray.length; i++) {
    let beforeTime = moment(hourOfDayArray[i], 'hh:mm:ss');
    let afterTime = moment(hourOfDayArray[i+1], 'hh:mm:ss');
    if(currentTime.isBetween(beforeTime,afterTime)) {
        // console.log('is between');
        // console.log(i);
        // inputDivs[i].setAttribute('style', 'background-color: green');
        inputDivs[i].classList.add('present');
        $inputs[i].classList.add('present');
        // $formDivs[i].classList.add('present');
    } else if (currentTime < beforeTime) {
        // inputDivs[i].setAttribute('style', 'background-color: orange');
        inputDivs[i].classList.add('future');
        $inputs[i].classList.add('future');
        // $formDivs[i].classList.add('future');
    } else {
        // inputDivs[i].setAttribute('style','background-color: yellow');
        inputDivs[i].classList.add('past');
        $inputs[i].classList.add('past');
        // $formDivs[i].classList.add('past');
    };
    }

// messing around with saving inputs to page text

let $textToDisplayInputs = $('.task-input');
let toDos = [];
let toDosHours = [];


$('form').submit(function (event) {
    event.preventDefault();
    let userTaskInput = event.currentTarget[0].value;
    // let targetHourForTask = event.currentTarget.firstChild;
    
    // console.log(event);
    // console.log(targetHourForTask);
    let userTaskId = event.currentTarget[0].id;

    let targetDisplayArea = $textToDisplayInputs[userTaskId-1];
    console.log(targetDisplayArea);
    // let newTask = targetDisplayArea.$('<li>');
    // targetDisplayArea.innerHTML = "&#9758" + userTaskInput;

    // targetDisplayArea.html("&#9758");
    targetDisplayArea.append("  ☞  " + userTaskInput);
    // newTask.innerHTML = "&#9758" + userTaskInput;
    // targetDisplayArea.append(newTask);
    console.log(userTaskId);
    console.log(targetDisplayArea);

    // targetHourForTask.textContent= "&#9758;  " + userTaskInput;

    // let taskArray = [userTaskId,userTaskInput];
    // toDos.push(taskArray);
    toDos.push(userTaskInput);
    toDosHours.push(userTaskId);
    
    storeToDos();
    
    // renderToDos();
    $inputs.val("");
})




function storeToDos() {
    // localStorage.setItem("user-todo", JSON.stringify(toDos));
    localStorage.setItem("user-todo", JSON.stringify(toDos));
    localStorage.setItem("user-todo-hour", JSON.stringify(toDosHours));
}

function renderToDos() {
    let storedToDos = JSON.parse(localStorage.getItem("user-todo"));
    let storedToDosHours = JSON.parse(localStorage.getItem("user-todo-hour"));

    if(storedToDos !== null) {
        toDos = storedToDos;
        for (let i=0; i < storedToDos.length; i++) {
            let indexValue = storedToDosHours[i]-1;
            let selectedDiv = $textToDisplayInputs[indexValue];
            // console.log(selectedDiv);
            // selectedDiv.innerHTML = "&#9758;  " + storedToDos[i];
            selectedDiv.append("  ☞  " + storedToDos[i]);
            // document.createElement("form");
            // document.createElement("input");
            // document.createElement("button");
        }
    }
    if(storedToDosHours !== null) {
        toDosHours = storedToDosHours;
    }

    // console.log(storedToDos);
    // console.log(storedToDosHours);
    // console.log(storedToDosHours[0]);
    // let indexValue = storedToDosHours[0];
    // console.log($textToDisplayInputs[indexValue]);
    // let selectedDiv = $textToDisplayInputs[indexValue];
    // selectedDiv.textContent = storedToDos[0];
    

    // for (let i=0; i < $textToDisplayInputs.length; i++) {
    //     console.log($textToDisplayInputs[i].dataset.value)
    // }
    // storedToDosHours.forEach(function (index, value) {
    //     $textToDisplayInputs[value].textContent = storedToDos[index]
    // })
    
    // function findDivId (index) {
    //     return index === storedToDosHours[0]
    // };
    // console.log($textToDisplayInputs.find(findDivId));
    // for (let i=0; i<storedToDosHours.length; i++) {
        
    // }
    // for (let i=0;i<$textToDisplayInputs.length; i++) {
    //     console.log($textToDisplayInputs)
    // }

    // $('#task-input').each(function(index,value) {

    // })
    // console.log($('#'+storedToDosHours[0]).text());
    // for (let i=0; i<storedToDos.length; i++) {
    //     console.log($('#' + storedToDosHours[i]).text());
    //     // document.getElementById('#'+storedToDosHours[i]).textContent = storedToDos[i];
    // }
    // $('input').each(function(index,value) {
    //     console.log(`${this.id}`)
    //     console.log(storedToDosHours[index])
    //     if(`${this.id}` === storedToDosHours[index]) {
    //         console.log("yes")
    //     }
    // })
}
renderToDos()
