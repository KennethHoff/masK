let container = $("#container");

let taskPopupDiv = $(".taskInfoPopupDiv");
let taskPopUpTitle = taskPopupDiv.children("#taskInfoPopupTitle");
let taskPopUpTitleEditor = taskPopupDiv.children("#taskInfoPopupTitleEditor")
let taskPopUpDescription = taskPopupDiv.children("#taskInfoPopupDescription");
let taskPopUpDescriptionEditor = taskPopupDiv.children("#taskInfoPopupDescriptionEditor");

let pressingShift = false;


$(document).on("keydown", function(e) {
    if (e.shiftKey) {
        pressingShift = true;
    }
});

$(document).on("keyup", function(e) {
    if (e.shiftKey) {
        pressingShift = false;
    }
});

let taskPopupBackground = $(".taskInfoPopupBackground");

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
            if (!pressingShift) {
                CompletedPopUpDescriptionRename(e.target);
            }
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
    
    taskPopUpTitle.css("display", "none");
    taskPopUpTitleEditor.css("display", "block");

    taskPopUpTitleEditor.focus();
}

function CompletedPopupTitleRename(inputField) {
    let newTitle = inputField.value;
    let taskID = taskPopupDiv.data("currentTask");
    let taskDiv = GetTaskDivFromTaskID(taskID);
    let task = GetTaskFromID(taskID);

    task.name = newTitle;
    
    taskDiv.children(".taskDivTitle").text(newTitle);

    taskPopUpTitle.text(newTitle);

    taskPopUpTitle.css("display", "block");
    taskPopUpTitleEditor.css("display", "none");
}

function EnablePopupDescriptionRename() {
    
    taskPopUpDescription.css("display", "none");
    taskPopUpDescriptionEditor.css("display", "block");

    taskPopUpDescriptionEditor.focus();
}

function CompletedPopUpDescriptionRename(inputField) {
    let newDescription = inputField.value;
    let taskID = taskPopupDiv.data("currentTask");
    let taskDiv = GetTaskDivFromTaskID(taskID);

    taskPopUpDescription.text(newDescription);

    taskPopUpDescription.css("display", "block");
    taskPopUpDescriptionEditor.css("display", "none");
}