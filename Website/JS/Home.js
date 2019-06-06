////// to do
//          make some animations while dragging/ kinda done
//          
//          maybe add some animations in class changes
//          fix the input on cardContainer so it wraps down
//          remove x and do window click reset
//          change add new list input field
//          use database to move columns

// this is container that holds everything. it will be used to target id of objects
//on the site
var container = document.getElementById("container");
var cardMenuBackground = document.getElementById("cardMenuBackground");
var cardMenu = document.getElementById("cardMenu");
// var currentCard;
// var activeAddNewList;
// var activeAddNewListStarter = false;
// var boardsId;
// var boardsName;
// var tasksId;
// var tasksName;
// var taskParentID;
// var startNumberID = 0;

// AddNewBoard();


// $(".valueAcceptList").on("keyup", function(e) {
//     if (e.keyCode === 13) {
//         AcceptNewBoard(e.target.id);
//     }
// });

// $("#AddNewListButton").on("mouseup", function() {
//     activeAddNewList = parseInt(e.target.id);
//     activeAddNewListStarter = true;
//     createInput(e.target.id);
// });

// //her the container directory is used. whenever we click on sth inside this 
// //container it fetches id of anything.
// container.addEventListener("click",e =>{
//      console.log(e.target.id);    
//     //this function takes value from input and saves it 
//     //as a name of the newly created list
//     if((e.target.id).includes("buttonAcceptList")){
//         AcceptNewBoard(e.target.id); 
//         boards.push({id:boardsId, name:boardsName});

//     }

//     //function let to interact with the button attached to every list
//     if((e.target.id).includes("editListButton")){
//         CancelBoard(e.target.id);
//     }

//     //this function starts createNewCard function that is an user input process
//     if((e.target.id).includes("implement")){
//         CreateNewTask(e.target.id);
        
//          document.getElementById(parseInt(e.target.id)+"textArea").addEventListener("keyup", function(event){
//              event.preventDefault();
//              if (event.keyCode === 13) {
//                  document.getElementById(parseInt(e.target.id)+"button2").click();
//           }});
//     }

//     if((e.target.id).includes("cardCreated")){
//         cardMenuOn(e.target.id);
//     }
    
//     // this function accepts the input and add new card to the cards container of the
//     //column
//     if((e.target.id).includes("button2")){
//         NewNewTask(e.target.id);
//         tasks.push({id:tasksId, name:tasksName, parentID:taskParentID});
//     } 

//     if((e.target.id).includes("buttonDeclineList")){
//         defaultState(e.target.id);
//     }
    
// });

// var currentTarget;

// container.addEventListener("dragstart", e =>{
//     e.dataTransfer.setData("text", e.target.id);
//     currentTarget = e.target;
//     console.log(document.getElementById(currentTarget.parentNode.id));
// });

// container.addEventListener("dragover", e =>{
//     e.dataTransfer.dropEffect = "move";
//     e.preventDefault();
// });


// container.addEventListener("drop", e => {
//     if(e.target.id.includes("cardInhold")){
//         var data = e.dataTransfer.getData("text");
//         var target = e.target;
//         var dataMoved = document.getElementById(data)
//         target.appendChild(dataMoved);
//         document.getElementById(parseInt(e.target.id)+"cardContainer").style.backgroundColor = "#c4765a";

//         index = tasks.findIndex(x => x.id=dataMoved.id);
//         tasks[index].parentID = target.id;
//     } 
//     else{
//         e.preventDefault();
//     }

    
// });

// container.addEventListener("dragenter", e =>{
//     if(e.target.id.includes("cardInhold")){
//         document.getElementById(parseInt(e.target.id)+"cardContainer").style.backgroundColor = "#e78f6f";
//     } 
// });

// container.addEventListener("dragleave", e =>{
//     if(e.target.id.includes("cardInhold")){
//         document.getElementById(parseInt(e.target.id)+"cardContainer").style.backgroundColor = "#c4765a";
//     }
// });

// document.getElementById("cardMenuX").addEventListener("click", function(){
//     var value = document.getElementById("cardMenuTextArea").value;
//     document.getElementById(currentCard).textContent = value;
//     cardMenuBackground.style.display = "none";
//     cardMenu.style.display = "none";
// });

// document.getElementById("deleteCard").addEventListener("click",function(){
//     var el = document.getElementById(currentCard);
//     el.parentNode.removeChild(el);
//     cardMenuBackground.style.display = "none";
//     cardMenu.style.display = "none";
    
//     index = tasks.findIndex(x => x.id=el);
//     tasks.splice(index,1);

// });



// function cardMenuOn(id){
//     currentCard = id;
//     cardMenuBackground.style.display = "block";
//     cardMenu.style.display = "block";
//     var value = document.getElementById(id).textContent;
//     document.getElementById("cardMenuTextArea").value = value;

// }


// function defaultState(id){
//     var containerID = parseInt(id);
//     var addNewListButton = document.getElementById(containerID+"addNewListButton");
//     var addNewListInput = document.getElementById(containerID + "addNewListInput");
//     addNewListButton.style.display ='block';
//     addNewListInput.style.display = 'none';
//     document.getElementById(containerID+"valueAcceptList").value = "";

// }


// //in this function button Add new list is changed into input field by changing style.display
// //add new list becomes invisible, input field becomes visible
// function createInput(id){
//     var containerID = parseInt(id);
//     var addNewListButton = document.getElementById(id);
//     var addNewListInput = document.getElementById(containerID + "addNewListInput");
//     addNewListButton.style.display ='none';
//     addNewListInput.style.display = 'block';
// }


// //this function takes value from input newListInput. if value is true(exists) 
// // cardContainer is created and holds the name of the list from value.
// //next its calling another function createCardContainer that takes id of created container

// function AcceptNewBoard(id){
//     //containerID turns id of objects into a number so its easier to navigate
//     //as every column has specific number starting from 0 and all objects inside this columns have
//     //id that starts with the same number

//     let nameValue = $(id + "valueAcceptList").value;
//     let newlyCreatedBoard = CreateAndPushBoard(nameValue);
//     // var containerID = parseInt(id);
//     // var boardContainer = document.getElementById(containerID + "columnContainer");
//     // var value = document.getElementById(containerID+"valueAcceptList").value;
  
    
    
//     if( value ) {
//         let addNewListButton = $(id + "addNewListButton");
//         // var addNewListButton = document.getElementById(containerID+"addNewListButton");
//         let addNewListInput = $(id + "addNewListInput");
//         // var addNewListInput = document.getElementById(containerID + "addNewListInput");
//         addNewListButton.style.display ='none';
//         addNewListInput.style.display = 'none';
//         CreateBoardContainer(containerID, value, boardContainer);


//     }

// }

// function CreateBoardContainer(containerID, value, boardContainer){
//     var itemDiv = document.createElement("div");
//     itemDiv.classList.add("cardContainer");
//     itemDiv.id = containerID + "cardContainer";
//     itemDiv.setAttribute("draggable", true);
//     boardContainer.appendChild(itemDiv);
//     var nameOfClass = document.createElement("p");
//     nameOfClass.innerText = value;
//     itemDiv.appendChild(nameOfClass);
//     var itemEditButton = document.createElement("button");
//     itemEditButton.classList.add("editListButton");
//     itemEditButton.textContent = "X";
//     itemEditButton.id = containerID + "editListButton";
//     itemDiv.appendChild(itemEditButton)
//     boardsId = itemDiv.id;
//     boardsName = nameOfClass.innerText;

//     createCardContainer(containerID,itemDiv);
// }




// // in this function div cardInhold is created. cardInhold holds all cards on the list
// // it is attached to. this function creates also textarea that will be used when
// // user wants to add new card. function adds also buttons both to start
// //process of adding new card and accepting it. whenever started this function
// // calls also another function addNewColumn()
// function createCardContainer(id,itemDiv){
   
//     var cardContainerInholdDiv = document.createElement("div");
//     cardContainerInholdDiv.id = id + "cardInhold";
//     cardContainerInholdDiv.classList.add("cardInhold");
//     itemDiv.appendChild(cardContainerInholdDiv);
//     var itemDiv2 = document.createElement("div");
//     itemDiv2.id = id+"inputContainer";
//     itemDiv2.classList.add("inputContainer");
//     itemDiv.appendChild(itemDiv2);
//     var addTextAreaToCardContainer = document.createElement("input");
//     addTextAreaToCardContainer.id = id+ "textArea";
//     addTextAreaToCardContainer.classList.add("textArea");
//     itemDiv2.appendChild(addTextAreaToCardContainer);
//     var itemButton = document.createElement("button");
//     //this button starts process of creating new card
//     itemButton.innerText = "Add new Task";
//     itemButton.classList.add("addCardButton");
//     itemButton.id= id+"implement";
//     itemDiv.appendChild(itemButton);
//     // this button accepts input and creates new card
//     var itemButton2 = document.createElement("button");
//     itemButton2.innerText = "Add";
//     itemButton2.classList.add("addCardButtonHide2");
//     itemButton2.id = id + "button2";
//     itemDiv2.appendChild(itemButton2);

    
//     AddNewBoard();
// }

// //this function creates another column next to the column that was created
// //by the user. this function calls also for function addNewButton() that creates
// //Add new list button of another column     
// function AddNewBoard() {
//     var newBoardDiv = document.createElement("div");
//     newBoardDiv.classList.add("columnContainer");
//     // newBoardDiv.id = idGenerator()+"columnContainer";
//     container.appendChild(newBoardDiv);
//     AddNewButton(parseInt(newBoardDiv.id),newBoardDiv);
// }

// function CancelBoard(id){
//     var containerID = parseInt(id);
//     var el = document.getElementById(containerID + "columnContainer");
//     el.parentNode.removeChild(el);

//     index = boards.findIndex(x => x.id=el);
//     boards.splice(index,1);

// }



// //this function creates new Add new list button and addNewListInput div that inholds
// //can be used while clicked on Add new list button. 
// function AddNewButton(id,nextColumnDiv){
//     var addNewListButton = document.createElement("button");
//     addNewListButton.classList.add("addNewListButton");
//     addNewListButton.textContent = "Add new Board";
//     addNewListButton.id = id+"addNewListButton";
//     nextColumnDiv.appendChild(addNewListButton);

//     var addNewListInputDiv = document.createElement("div");
//     addNewListInputDiv.classList.add("addNewListInput");
//     addNewListInputDiv.id = id + "addNewListInput";
//     nextColumnDiv.appendChild(addNewListInputDiv);

//     var createInputField = document.createElement("input");
//     createInputField.type = "text";
//     createInputField.placeholder = "Enter list title";
//     createInputField.id = id + "valueAcceptList";
//     createInputField.classList.add("valueAcceptList");
//     addNewListInputDiv.appendChild(createInputField);

//     var createInputButton = document.createElement("button");
//     createInputButton.type = "button";
//     createInputButton.classList.add("acceptListButton");
//     createInputButton.textContent = "Add";
//     createInputButton.id = id + "buttonAcceptList";
//     addNewListInputDiv.appendChild(createInputButton);

//     var createDeclineButton = document.createElement("button");
//     createDeclineButton.id = id + "buttonDeclineList";
//     createDeclineButton.classList.add("declineButton");
//     createDeclineButton.textContent = "X";
//     addNewListInputDiv.appendChild(createDeclineButton);

// }

// // this function open textarea for new card. here user can write whatever
// //he/she wants that will appear as a card inside a column
// function CreateNewTask (id){
//     //containerID turns id of objects into a number so its easier to navigate
//     //as every column has specific number starting from 0 and all objects inside this columns have
//     //id that starts with the same number
//     var containerID = parseInt(id);
//     var button1 = document.getElementById(containerID+"button2");
//     var button2 = document.getElementById(containerID+"implement");
//     var inputContainer = document.getElementById(containerID+"inputContainer");
//     button1.style.display = "inline-block";
//     button2.style.display ="none";
//     inputContainer.style.display = "block"; 
// }

// // this function accepts value from the card input and adds newly created card
// //as a block to cardInhold container.
// function NewNewTask(id){
//     //containerID turns id of objects into a number so its easier to navigate
//     //as every column has specific number starting from 0 and all objects inside this columns have
//     //id that starts with the same number
//     var containerID = parseInt(id);
//     var value = document.getElementById(containerID+"textArea").value;
//     if (value){
//     document.getElementById(id).style.display ="none";
//     document.getElementById(containerID+"inputContainer").style.display="none";

//     var cardInhold = document.getElementById(containerID+"cardInhold");
//     var itemDiv = document.createElement("div");
//     itemDiv.classList.add("cardCreated");
//     cardInhold.appendChild(itemDiv);
//     itemDiv.textContent = value;
//     itemDiv.id = idCardsGenerator()+"cardCreated";
//     itemDiv.setAttribute("draggable", true);
//     document.getElementById(containerID+"implement").style.display = 'block';
//     document.getElementById(containerID+"textArea").value =""
//     tasksId = itemDiv.id;
//     tasksName = itemDiv.textContent;
//     taskParentID= itemDiv.parentNode.id;
    
//     }
// }


// // //////////////////// Generate ID for the columns Section //////////////////


// // //////////////////// Generate ID for the cards Section //////////////////
// var startNumberIDforCards = 1;
// function idCardsGenerator(){
//     var numberID = startNumberIDforCards++;
//    return numberID;
// }



// function idGenerator() {
//     return startNumberID++;
// }











// Kenneth Rework

let taskPopupDiv = $(".taskInfoPopupDiv");
let taskPopUpTitle = taskPopupDiv.children("#taskInfoPopupTitle");
let taskPopUpTitleEditor = taskPopupDiv.children("#taskInfoPopupTitleEditor")
let taskPopUpDescription = taskPopupDiv.children("#taskInfoPopupDescription");
let taskPopUpDescriptionEditor = taskPopupDiv.children("#taskInfoPopupDescriptionEditor");

let taskPopupBackground = $(".taskInfoPopupBackground");

let taskPopupActive = false;

PlaceAllBoardsOnPage();

// 
$(document).on("click", function(e) {

    let target = $(e.target);

    if (taskPopupActive) {
        if (!target.hasClass("taskInfoPopup") ) {
            HideTaskInfoPopup();
            return;
        }
        if (target.is("#taskInfoPopupTitle")) {
            EnablePopupTitleRename();
            return;
        }
        if (target.is("#taskInfoPopupDescription")) {
            EnablePopupDescriptionRename();
            return;
        }
    }

    if (target.hasClass("boardDivTitle")) {
        EnableBoardTitleRename(e.target);
    }

    else if (target.hasClass("addNewBoardDiv")) {
        CreateNewBoardOnScreenWithEvent(e);
    }
    else if (target.parent().hasClass("addNewBoardDiv")) {
        CreateNewBoardOnScreenWithEvent(e);
    }

    else if (target.hasClass("createTaskButton")) {
        CreateNewTaskOnScreenWithEvent(e);
    }

        // The following two ifs are there to see if the 'textarea' is active or not. 
        // If it is active, return. Otherwise, open the popup.
    else if ( target.parent().hasClass("taskDiv") ) {
        let targetParent = target.parent();
        if (targetParent.children("textarea").length > 0) return;
        // alert("Clicked on task without a text area");
        ShowTaskInfoPopup(targetParent);
    }
    else if (target.hasClass("taskDiv")) {
        if (target.children("textarea").length > 0) return;
        // alert("clicked on task without a text area");
        ShowTaskInfoPopup(target);
    }

    // TODO: Add 'click somewhere except on a board, disable all inputs' function

});

$(document).on("keydown", function(e) {
    let target = $(e.target);
    if (e.keyCode === 13) {
        if (target.hasClass("replaceBoardTitleRename")) {
            CompletedBoardTitleRename(e.target);
        }
        if (target.hasClass("taskDivTextArea")) {
            CompletedTaskTitleRename(e.target);
        }
        if (target.hasClass("taskInfoPopupTitleEditor")) {
            completedPopupTitleRename(e.target);
        }
    }
})

function CreateAddNewBoardButton() {
    let newBoardButtonDiv = document.createElement("div");
    let jqNewBoardButtonDiv = $(newBoardButtonDiv).addClass("addNewBoardDiv");
    // jqNewBoardButtonDiv.attr("taskID", )
    jqNewBoardButtonDiv.appendTo(container);
    // jqNewBoardButtonDiv.text("Create New Board");

    let newBoardParagraph = document.createElement("p");
    let jqNewBoardParagraph = $(newBoardParagraph).addClass("addNewBoardText");
    jqNewBoardParagraph.text("Create New Board");
    jqNewBoardParagraph.appendTo(jqNewBoardButtonDiv);
}

function CreateNewBoardOnScreenWithEvent(e) {
    let jqTarget = $(e.target);
    let buttonDiv;
    if (jqTarget.hasClass("addNewBoardDiv")) {
        buttonDiv = jqTarget;
    }
    else if (jqTarget.parent().hasClass("addNewBoardDiv")) {
        buttonDiv = jqTarget.parent();
    }

    
    let newlyCreatedBoard = CreateAndPushBoard("Board #" + currentIndexForIDGenerator);
    CreateNewBoardOnScreen(newlyCreatedBoard, buttonDiv);

    CreateAddNewBoardButton();
}

function CreateNewTaskOnScreenWithEvent(e) {
    let boardDiv = $(e.target).parent()

    let task = CreateAndPushTask("");

    CreateNewtaskOnScreen(task, boardDiv, e.target);
}

function CreateNewtaskOnScreen(task, boardDiv, beforeElement) {
    
    let newTaskDiv = document.createElement("div");
    newTaskDiv.id = "task" + task.id;

    let jqNewTaskDiv = $(newTaskDiv).addClass("taskDiv");
    jqNewTaskDiv.data("taskid", task.id);

    if (beforeElement === undefined) {
        jqNewTaskDiv.appendTo(boardDiv);
    }
    else {
        jqNewTaskDiv.insertBefore(beforeElement);
    }

    let newTaskDivTitleEditor = document.createElement("textarea");
    let jqNewTaskDivTitleEditor = $(newTaskDivTitleEditor).addClass("taskDivTextArea");
    jqNewTaskDivTitleEditor.appendTo(jqNewTaskDiv)
    jqNewTaskDivTitleEditor.focus();


    
    let boardID = GetBoardIDFromBoardDiv(boardDiv);
    let board = GetBoardFromID(boardID);
}

function NewTaskTitle(taskDiv, title) {
    let newTaskDivTitle = document.createElement("p");
    let jqnewTaskDivTitle = $(newTaskDivTitle).addClass("taskDivTitle");
    let task = GetTaskIDFromTaskDiv(taskDiv);
    if (title !== undefined) {
        jqnewTaskDivTitle.text(title);
    }
    else {
        jqnewTaskDivTitle.text(task.name);
    }
    task.name = jqnewTaskDivTitle.text();
    return jqnewTaskDivTitle;
}

function CreateNewBoardOnScreen(board, elementToReplace) {

    let newBoardDiv = document.createElement("div");
    newBoardDiv.id = "board" + board.id;
    // newBoardDiv.setAttribute("boardid", board.id);
    let jqNewBoardDiv = $(newBoardDiv).addClass("boardDiv");
    jqNewBoardDiv.data("boardid", board.id);
    if (elementToReplace !== undefined) {
        $(elementToReplace).replaceWith(jqNewBoardDiv);
    }
    else {
        // Loops through the boards array, if the PageOrder is greater than the new Div's PageOrder,
        // then get the new div with the jquery selector and place it before it, and leave the for-loop.
        for(var i = 0; i < boards.length; i++) {
            var boardElement = boards[i];
            if (boardElement.pageOrder >= board.pageOrder) {
                let boardElementDiv = "div[boardid=" + boardElement.id +"]"
                let divToInsertBefore = $(boardElementDiv);
                if (divToInsertBefore.length !== 0) {
                    divToInsertBefore.before(newBoardDiv);
                }
                else {
                    jqNewBoardDiv.appendTo(container);
                }
                break;
            }
        }
    }
        // Create a new title [p] and append it to the div (First element)
    jqNewBoardDiv.append(NewBoardTitle(newBoardDiv));

    UpdateBoardDiv(newBoardDiv, board.id);
    
    AddAllTasksToBoardDiv(newBoardDiv);

    AddCreateTaskButtonToBoardDiv(newBoardDiv);







    // Div 
        // Title
        // Task[]
        // Add task button
            // => Input field for name
            //  => Button for submitting (Enter works)
}

function NewBoardTitle(boardDiv, title) {
    let newBoardDivTitle = document.createElement("p");
    let jqNewBoardDivTitle = $(newBoardDivTitle).addClass("boardDivTitle");
    let board = GetBoardIDFromBoardDiv(boardDiv);
    if (title !== undefined) {
        jqNewBoardDivTitle.text(title);
    }
    else {
        jqNewBoardDivTitle.text(board.name);
    }
    board.name = jqNewBoardDivTitle.text();
    return jqNewBoardDivTitle;
}

/**
 * 
 * @param {jquery<HTMLElement>} boardDiv The div that contains the Board
 * @param {Number} [boardID] [Optional] The Database ID of the board (boards[?].id).
 */
function UpdateBoardDiv(boardDiv, boardID) {
    let id;
    if (typeof(boardID) !== typeof(1)) id = GetBoardIDFromBoardDiv(boardDiv);
    else id = boardID;
    let jqBoardDiv = $(boardDiv);
    let board = GetBoardFromID(id);

    jqBoardDivTitle = jqBoardDiv.children(".boardDivTitle");
    jqBoardDivTitle.text(board.name);
}

function AddCreateTaskButtonToBoardDiv(boardDiv) {
    let createTaskButton = document.createElement("button");
    let jqCreateTaskButton = $(createTaskButton).addClass("createTaskButton");
    jqCreateTaskButton.text("Create Task");

    jqCreateTaskButton.appendTo(boardDiv);
}

function EnableBoardTitleRename(boardTitle) {

    let replaceTitleInputField = document.createElement("input");
    $(replaceTitleInputField).addClass("replaceBoardTitleRename");

    $(boardTitle).replaceWith(replaceTitleInputField);

    $(replaceTitleInputField).focus();

}

function CompletedBoardTitleRename(inputField) {
    let newTitle = inputField.value;
    let boardDiv = $(inputField).parent();
    $(inputField).replaceWith(NewBoardTitle(boardDiv, newTitle));
}

function CancelBoardTitleRename(inputField) {
    boardDiv = $(inputField).parent();
    NewBoardTitle(boardDiv);

    $(inputField).remove();
}

function CompletedTaskTitleRename(inputField) {
    newTitle = inputField.value;
    let taskDiv = $(inputField).parent();
    let newTaskTitle = NewTaskTitle(taskDiv, newTitle);
    $(inputField).replaceWith(newTaskTitle);
}

function GetBoardIDFromBoardDiv(boardDiv) {
    var board = boards.find(function(e) {
        boardID = $(boardDiv).data("boardid");
        return e.id === boardID;
    });
    return board;
}

function GetTaskIDFromTaskDiv(taskDiv) {
    var task = tasks.find(function(e) {
        taskID = $(taskDiv).data("taskid");
        return e.id === taskID;
    })
    return task;
}

function GetTaskDivFromTaskID(taskID) {
    return $("#task" + taskID);
}

function AddAllTasksToBoardDiv(boardDiv) {
    let board = GetBoardIDFromBoardDiv(boardDiv);
    board.tasks.forEach(task => {
        
    });
}

function PlaceAllBoardsOnPage() {

    boards.forEach(function(e) {
        let board = e;
        if (board === undefined) return;
            // Don't show 'Incubator' - This is bad practice, but ran out of time.
        if (board.name === "Incubator") return;
        CreateNewBoardOnScreen(board);
    });

    CreateAddNewBoardButton();
}

function ShowTaskInfoPopup(taskDiv) {
    taskPopupDiv.css("display", "block");
    taskPopupBackground.css("display", "block");
    taskPopupActive = true;

    let task = GetTaskIDFromTaskDiv(taskDiv);
    taskPopupDiv.data("currentTask", task.id);

    taskPopUpTitle.text(task.name);
    taskPopUpDescription.text(task.description);
}
function HideTaskInfoPopup() {
    taskPopupDiv.css("display", "none");
    taskPopupBackground.css("display", "none");
    taskPopupActive = false;
}

function EnablePopupTitleRename() {
    
    // let replaceTitleInputField = document.createElement("input");
    // $(replaceTitleInputField).addClass("replacePopupTitleInput taskInfoPopup");

    taskPopUpTitle.css("display", "none");
    taskPopUpTitleEditor.css("display", "block");

    taskPopUpTitleEditor.focus();


    // $(taskPopUpTitle).replaceWith(replaceTitleInputField);

    // $(replaceTitleInputField).focus();
    // alert("Editing Title..");
}

function completedPopupTitleRename(inputField) {
    newTitle = inputField.value;
    let taskID = taskPopupDiv.data("currentTask");
    let taskDiv = GetTaskDivFromTaskID(taskID);
    let newTaskTitle = NewTaskTitle(taskDiv, newTitle);

    taskPopUpTitle.text(newTitle);

    taskPopUpTitle.css("display", "block");
    taskPopUpTitleEditor.css("display", "none");
}

function EnablePopupDescriptionRename() {
    alert("Editing description");
}
