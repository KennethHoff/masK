let container = $("#container");

let taskPopupDiv = $(".taskInfoPopupDiv");
let taskPopUpTitle = taskPopupDiv.children("#taskInfoPopupTitle");
let taskPopUpTitleEditor = taskPopupDiv.children("#taskInfoPopupTitleEditor")
let taskPopUpDescription = taskPopupDiv.children("#taskInfoPopupDescription");
let taskPopUpDescriptionEditor = taskPopupDiv.children("#taskInfoPopupDescriptionEditor");
let taskPopupBackground = $(".taskInfoPopupBackground");

let activeDragElement;

let taskPopupActive = false;


PlaceAllBoardsOnPage();

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
        taskID = $(taskDiv).data("taskid");
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
    taskPopupDiv.data("currentTask", task.id);

    taskPopUpTitle.text(task.name);
    taskPopUpDescription.text(task.description);

    
    taskPopUpDescription.css("display", "block");
    taskPopUpDescriptionEditor.css("display", "none");
    taskPopUpTitle.css("display", "block");
    taskPopUpTitleEditor.css("display", "none");

}
function HideTaskInfoPopup() {
    taskPopupDiv.css("display", "none");
    taskPopupBackground.css("display", "none");
    taskPopupActive = false;

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
    
    let taskID = taskPopupDiv.data("currentTask");
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

    let taskID = taskPopupDiv.data("currentTask");
    let taskDiv = GetTaskDivFromTaskID(taskID);
    let task = GetTaskFromID(taskID);

    let newDescription = (inputField.value.length > 0 ? inputField.value : task.description );

    taskPopUpDescription.text(newDescription);

    task.description = newDescription;
}