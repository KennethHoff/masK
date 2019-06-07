let container = $("#container");

let taskPopupDiv = $(".taskInfoPopupDiv");
let taskPopUpTitle = taskPopupDiv.children("#taskInfoPopupTitle");
let taskPopUpTitleEditor = taskPopupDiv.children("#taskInfoPopupTitleEditor")
let taskPopUpDescription = taskPopupDiv.children("#taskInfoPopupDescription");
let taskPopUpDescriptionEditor = taskPopupDiv.children("#taskInfoPopupDescriptionEditor");
let taskPopupBackground = $(".taskInfoPopupBackground");

let memberSelect = $("#memberSelect");

let activeDragElement;

let taskPopupActive = false;


PlaceAllBoardsOnPage();

PopulateMemberSelect();

    // If you click anywhere...
$(document).on("click", function(e) {

        
    let target = $(e.target);

        // if the popup is active, then:
    if (taskPopupActive) {

            // If any parent, grandparent, great grandparents etc... has the class 'taskInfoPopup' then hide the popup
        let parents = target.parents(".taskInfoPopupDiv");
        if (parents.length === 0)   {
                // If no parents are, but it itself is, return..
            if (target.is(".taskInfoPopupDiv")) return;
            HideTaskInfoPopup();
            return;
        }

        // if (!target.hasClass("taskInfoPopup") ) {
        //     HideTaskInfoPopup();
        //     return;
        // }
            // If you click on the title, allow title renaming
        if (target.is("#taskInfoPopupTitle")) {
            EnablePopupTitleRename();
            return;
        }
        // If you click on the description, allow description renaming
        if (target.is("#taskInfoPopupDescription")) {
            EnablePopupDescriptionRename();
            return;
        }
    }
        // If you click on the title of a board, allow title renaming of said board.
    if (target.hasClass("boardDivTitle")) {
        EnableBoardTitleRename(e.target);
    }
        // If you click on the "Create New Board" button, then, if you have 10 or fewer boards, create a new board and create a new button.
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
        if (target.is("#taskInfoPopupTitleEditor")) {
            CompletedPopupTitleRename(e.target);
        }
        if (target.is("#taskInfoPopupDescriptionEditor")) {
            CompletedPopUpDescriptionRename(e.target);
        }
    }
})

function CreateAddNewBoardButton() {
    let newBoardButtonDiv = document.createElement("div");
    let jqNewBoardButtonDiv = $(newBoardButtonDiv).addClass("addNewBoardDiv");
    jqNewBoardButtonDiv.appendTo(container);

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

    if (boards.length >= 11) return;
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
    jqNewTaskDiv.data("taskID", task.id);
    jqNewTaskDiv.attr("draggable", true);

    if (beforeElement === undefined) {
        jqNewTaskDiv.appendTo(boardDiv);
    }
    else {
        jqNewTaskDiv.insertBefore(beforeElement);
    }

    if (task.name === "") {
        let newTaskDivTitleEditor = document.createElement("textarea");
        let jqNewTaskDivTitleEditor = $(newTaskDivTitleEditor).addClass("taskDivTextArea");
        jqNewTaskDivTitleEditor.appendTo(jqNewTaskDiv)
        jqNewTaskDivTitleEditor.focus();
    }
    else {
        let newTaskTitle = NewTaskTitle(newTaskDiv, task.name)
        $(newTaskTitle).appendTo(jqNewTaskDiv);
    }

    let board = GetBoardFromBoardDiv(boardDiv);

    AddTaskIDToBoard(task.id, board);
}

function NewTaskTitle(taskDiv, title) {
    let newTaskDivTitle = document.createElement("p");
    let jqnewTaskDivTitle = $(newTaskDivTitle).addClass("taskDivTitle");
    let task = GetTaskFromTaskDiv(taskDiv);
    if (title !== undefined) {
        jqnewTaskDivTitle.text(title);
    }
    else {
        jqnewTaskDivTitle.text(task.name);
    }
    task.name = jqnewTaskDivTitle.text(); // This is weirdly placed, but I don't have time to refactor it..
    return jqnewTaskDivTitle;
}

function CreateNewBoardOnScreen(board, elementToReplace) {

    let newBoardDiv = document.createElement("div");
    newBoardDiv.id = "board" + board.id;
    // newBoardDiv.setAttribute("boardid", board.id);
    let jqNewBoardDiv = $(newBoardDiv).addClass("boardDiv");
    jqNewBoardDiv.addClass("dropzone");
    jqNewBoardDiv.data("boardid", board.id);
    // jqNewBoardDiv.attr("draggable", true);


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
}

function NewBoardTitle(boardDiv, title) {
    let newBoardDivTitle = document.createElement("p");
    let jqNewBoardDivTitle = $(newBoardDivTitle).addClass("boardDivTitle");
    let board = GetBoardFromBoardDiv(boardDiv);
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
    if (typeof(boardID) !== typeof(1)) id = GetBoardFromBoardDiv(boardDiv);
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

function GetBoardFromBoardDiv(boardDiv) {
    var board = boards.find(function(e) {
        boardID = $(boardDiv).data("boardid");
        return e.id === boardID;
    });
    return board;
}

function GetTaskFromTaskDiv(taskDiv) {
    var task = tasks.find(function(e) {
        taskID = $(taskDiv).data("taskID");
        return e.id === taskID;
    })
    return task;
}

function GetTaskDivFromTaskID(taskID) {
    return $("#task" + taskID);
}

function AddAllTasksToBoardDiv(boardDiv) {
    let board = GetBoardFromBoardDiv(boardDiv);
    board.tasks.forEach(taskID => {
        let task = GetTaskFromID(taskID);
        CreateNewtaskOnScreen(task, boardDiv);
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

    let task = GetTaskFromTaskDiv(taskDiv);
    taskPopUpTitle.text(task.name);
    taskPopUpDescription.text(task.description);

    taskPopupDiv.data("taskID", task.id);

    
    taskPopUpDescription.css("display", "block");
    taskPopUpDescriptionEditor.css("display", "none");
    taskPopUpTitle.css("display", "block");
    taskPopUpTitleEditor.css("display", "none");

    SelectApplicableUser();

}
function HideTaskInfoPopup() {
    taskPopupDiv.css("display", "none");
    taskPopupBackground.css("display", "none");
    taskPopupActive = false;
    taskPopupDiv.removeData("taskID");

    DeselectAllUsers();
}

function EnablePopupTitleRename() {
    
    taskPopUpTitle.css("display", "none");
    taskPopUpTitleEditor.css("display", "block");
    taskPopUpTitleEditor.text(taskPopUpTitle.text());

    taskPopUpTitleEditor.focus();
}

function CompletedPopupTitleRename(inputField) {

    taskPopUpTitle.css("display", "block");
    taskPopUpTitleEditor.css("display", "none");
    
    let taskID = taskPopupDiv.data("taskID");
    let taskDiv = GetTaskDivFromTaskID(taskID);
    let task = GetTaskFromID(taskID);

    let newTitle = (inputField.value.length > 0 ? inputField.value : task.name);


    task.name = newTitle;
    
    taskDiv.children(".taskDivTitle").text(newTitle);

    taskPopUpTitle.text(newTitle);
}

function EnablePopupDescriptionRename() {
    
    taskPopUpDescription.css("display", "none");
    taskPopUpDescriptionEditor.css("display", "block");
    taskPopUpDescriptionEditor.text(taskPopUpDescription.text());

    taskPopUpDescriptionEditor.focus();
}

function CompletedPopUpDescriptionRename(inputField) {
    taskPopUpDescription.css("display", "block");
    taskPopUpDescriptionEditor.css("display", "none");

    let taskID = taskPopupDiv.data("taskID");
    let taskDiv = GetTaskDivFromTaskID(taskID);
    let task = GetTaskFromID(taskID);

    let newDescription = (inputField.value.length > 0 ? inputField.value : task.description );

    taskPopUpDescription.text(newDescription);

    task.description = newDescription;
}

function PopulateMemberSelect() {

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        let newOption = document.createElement("option");
        newOption.value = "elem_" + user.id;
        newOption.id = "elem_" + user.id;
        $(newOption).data("userID", user.id);
        let jqNewOption = $(newOption);
        jqNewOption.text(user.name);
        jqNewOption.appendTo(memberSelect);
    }
}

function SelectApplicableUser() {
    let taskID = $(taskPopupDiv).data("taskID");
    let task = GetTaskFromID(taskID);

    let applicableUsers = [];

    for (let i = 0; i < task.users.length; i++) {
        const user = task.users[i];

        let userOptionID = "elem_" + user;
        applicableUsers.push(userOptionID);
    }
    $("#memberSelect").multiSelect('select', applicableUsers);
}

function DeselectAllUsers() {
    $("#memberSelect").multiSelect('deselect_all');
}



    // http://loudev.com/
$("#memberSelect").multiSelect({
    selectableHeader: "<div class='custom-header'>Unassigned users</div>",
    selectionHeader: "<div class='custom-header'>Assigned user</div>",
    keepOrder: true,
    dblClick: true,
    afterSelect: AddUserToTaskPopup,
    afterDeselect: RemoveUserFromTaskPopup
});

function AddUserToTaskPopup(elem) {
    let jqElem = $("#" + elem);
    let userID = jqElem.data("userID");

    let parents = jqElem.parents(".taskInfoPopupDiv");

    let taskID = parents.data("taskID");

    let task = GetTaskFromID(taskID);

    AddUserIDToTask(userID, task);
}

function RemoveUserFromTaskPopup(elem) {
    if (!taskPopupDiv.data("taskID") ) return;

    let jqElem = $("#" + elem);
    let userID = jqElem.data("userID");

    let parents = jqElem.parents(".taskInfoPopupDiv");

    let taskID = parents.data("taskID");

    let task = GetTaskFromID(taskID);

    RemoveUserFromTask(userID, task);
}

let jsContainer = document.getElementById("container");

jsContainer.addEventListener("dragstart", e =>{
    e.dataTransfer.setData("text", e.target.id);
});

jsContainer.addEventListener("dragover", e =>{
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
});

jsContainer.addEventListener("drop", e => {

    let target, jqTarget, relativeElement, newBoardDiv;
    var data = e.dataTransfer.getData("text");
    if ($(e.target).hasClass("boardDiv")) {
        target = e.target;
        jqTarget = $(target);
        relativeElement = jqTarget.children(".createTaskButton");
        newBoardDiv = target;
    }
    else if ($(e.target).hasClass("boardDivTitle")) {
        var data = e.dataTransfer.getData("text");
        target = e.target.parentNode;
        jqTarget = $(target);
        relativeElement = jqTarget.children(".createTaskButton");
        newBoardDiv = target;
    }
    else if ($(e.target).hasClass("createTaskButton")) {
        target = e.target.parentNode;
        jqTarget = $(target);
        relativeElement = jqTarget.children(".createTaskButton");
        newBoardDiv = target;
    }
    else if ($(e.target).hasClass("taskDiv")) {
        target = e.target;
        jqTarget = $(target);
        relativeElement = jqTarget;
        newBoardDiv = target.parentNode;
    }
    else {
        e.preventDefault();
        return;
    }
    let newBoard = GetBoardFromBoardDiv(newBoardDiv);

    let dataMoved = document.getElementById(data);
    let task = GetTaskFromTaskDiv(dataMoved);
    let oldBoardDiv = $(dataMoved).parent();
    let oldBoard = GetBoardFromBoardDiv(oldBoardDiv);
    MoveTaskFromOneBoardToAnother(oldBoard, newBoard, task.id);
    relativeElement.before($(dataMoved));
});