
var container = document.querySelector("#incubatorContainer");
var trashCan = document.querySelector("#trashCan");
var trashCanJQPosition = GetJQueryPosition(trashCan);
    // which item you are dragging
var activeDragNote = null;
var activeRightClickNote = null;
var currentZIndex = 0;
var incubatorBoard = CreateIncubatorBoard();

// Related to deleting a note

var aboveTrashCan = false;
var noteToDelete = null;

// Touch events
container.addEventListener("touchstart", DragStart);
container.addEventListener("touchend", DragEnd);
container.addEventListener("touchmove", Drag);

// Mouse events
container.addEventListener("mousedown", DragStart);
container.addEventListener("mouseup", DragEnd);
container.addEventListener("mousemove", Drag);

/**
 * Not a super-fan of this implementation, as it's an ever-increasing index, but it works
 */
function GetNextZIndex() {
    currentZIndex++;
    return currentZIndex;
}

function DragStart(e) {
        // If it's not left button (meaning right-button, middle click etc..), return.
        // Only allow dragging with left-click
    if (!IsLeftButton(e)) return;
    
    activeDragNote = GetNoteDiv(e.target);
    if (activeDragNote == null) return;
    
    if (!activeDragNote.xOffset) {
        activeDragNote.xOffset = 0;
    }
    if (!activeDragNote.yOffset) {
        activeDragNote.yOffset = 0;
    }
    if (e.type === "touchStart") {
        activeDragNote.initialX = e.touches[0].clientX - activeDragNote.xOffset;
        activeDragNote.initialY = e.touches[0].clientY - activeDragNote.yOffset;
    } 
    else {
        activeDragNote.initialX = e.clientX - activeDragNote.xOffset;
        activeDragNote.initialY = e.clientY - activeDragNote.yOffset;
    }
    
    SetZIndex(activeDragNote, GetNextZIndex());
}

function CheckAndSetPlacementStats(item) {
    if (!item.xOffset) {
        item.xOffset = 0;
    }
    if (!item.yOffset) {
        item.yOffset = 0;
    }
}

function DragEnd(e) {
    if (activeDragNote !== null) {
        activeDragNote.initialX = activeDragNote.currentX;
        activeDragNote.initialY = activeDragNote.currentY;

        var task = GetTaskFromNote(activeDragNote);
        var position = GetNotePosition(activeDragNote, container);
        StorePositionDataInTask(task, position.left, position.top);

        if (aboveTrashCan) {
            noteToDelete = activeDragNote;
        }

        activeDragNote = null;
    }
}

function Drag(e) {
    // If you're "dragging" (ie. moving the mouse) and you're not holding a note, return.
    if (activeDragNote == null) return;
    e.preventDefault();
    // If you're touching the screen with your fingers.
    if (e.type === "touchMove") {
        // Set the current position variables (not the actual positions) to be the difference between where you clicked and where you started dragging
        activeDragNote.currentX = e.touches[0].clientX - activeDragNote.initialX;
        activeDragNote.currentY = e.touches[0].clientY - activeDragNote.initialY;
    }
    // Otherwise.. (Which should only be if you are clicking with the mouse)
    else {
        // Set the current position variables (not the actual positions) to be the difference between where you clicked and where you started dragging
        activeDragNote.currentX = e.clientX - activeDragNote.initialX;
        activeDragNote.currentY = e.clientY - activeDragNote.initialY;
    }

    // Whenever you hold a note, it will be on the top
    // Set the new offSet to be where it currently sits.
    // This is used to accurately place the div where you want it.
    activeDragNote.xOffset = activeDragNote.currentX;
    activeDragNote.yOffset = activeDragNote.currentY;
    SetTranslate(activeDragNote.currentX, activeDragNote.currentY, activeDragNote);

    aboveTrashCan = AboveTrashCan(e)
    if (aboveTrashCan) {
        AnimateNotePreDeletion(activeDragNote);
    }
    else {
        $(activeDragNote).stop();
    }
}

function ResetNoteStyling(note) {
    $(note).css( {

    })
}

function SetZIndex(item, index) {
    item.style.zIndex = index;
}

function SetTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// Thanks to https://www.kirupa.com/html5/drag.htm for the "boilerplate"

function GetPosition(event, containerString) {
    // TODO: Add touch support

    var offset = $(containerString).offset();

    var vector2Offset = {
        left: event.pageX - offset.left,
        top: event.pageY - offset.top
    }
    return vector2Offset;
}


function GetNotePosition(note) {

    var matrix = $(note).css('transform');
    var newMatrix = decodeMatrix(matrix)

    var newPos = {
        left: newMatrix[4],
        top: newMatrix[5]
    }

    
    return newPos;
}

function IsLeftButton(evt) {
    // Might not work on other browsers (Does work in Chrome), 
    // as some browsers have left = 1 (which imo is the better way of doing it), while others have left = 0)
    // I could, with jquery, use 'event.which' to check, 
    // but it's not necessary if Chrome is the only browser it needs to work with,
    if ("buttons" in evt) return evt.buttons == 1;
    var button = evt.which || evt.button;
    return button == 1;
}

function CreateNewNoteOnPageWithEvent(task, event) {
    var pos = GetPosition(event, container);
    var newPos = CreateNewNoteOnPage(task, pos);

    // Storing the position on the Task (Should only be called on: Initial creation, and on "DragEnd");
    StorePositionDataInTask(task, newPos.left, newPos.top);
}

function CreateNewNoteOnPage(task, pos) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("taskID", task.id);
    container.appendChild(newDiv);
    newDiv.setAttribute("class", "note");
    newDiv.setAttribute("id", "note" + task.id);
    var titleString = "<p class = noteHeaders id = " + "note" + task.id + "Header>" + task.name + "</p>";
    var descriptionString = "<p>" + task.description + "</p>"
    newDiv.innerHTML = titleString + "\n" + descriptionString;

    // Setting the position

    var left = pos.left - ($(newDiv).width() / 2);
    var top = pos.top - ($(newDiv).height() / 2);
    SetTranslate(left, top, newDiv);
    newDiv.xOffset = left;
    newDiv.yOffset = top;
    
    return {left: left, top: top};
}

function CreateNewNoteOnPageNew(task, pos) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("taskID", task.id);
    container.appendChild(newDiv);
    newDiv.setAttribute("class", "note");
    newDiv.setAttribute("id", "note" + task.id);
    var titleString = "<p class = noteHeaders id = " + "note" + task.id + "Header>" + task.name + "</p>";
    var descriptionString = "<p>" + task.description + "</p>"
    newDiv.innerHTML = titleString + "\n" + descriptionString;

    SetTranslate(pos.left, pos.top, newDiv);
    newDiv.xOffset = pos.left;
    newDiv.yOffset = pos.top;
    return pos;
}

function StorePositionDataInTask(task, left, top) {
    task.boardPosition.left = left;
    task.boardPosition.top = top;
}

/**
 * This is used to get the parent 'note' element from a given DOM element (For example a <p>)
 * @param {Element} inputElement gets the parent div element from a given DOM Element
 * @returns parent div element with the class 'note'
 */
function GetNoteDiv(inputElement) {
    var noteDiv = null;

    if (inputElement.className === 'note') {
        noteDiv = inputElement;
    }
    else if (inputElement.parentElement.className === 'note') {
        noteDiv = inputElement.parentElement;
    }
    return noteDiv;
}


function PlaceAllNotesOnPage() {

    incubatorBoard.tasks.forEach(noteID => {
        var task = GetTaskFromID(noteID);
        if (task === undefined) return;
        // CreateNewNoteOnPage(task, task.boardPosition);
        CreateNewNoteOnPageNew(task, task.boardPosition);
    });
}





// Context Menu

// Trigger action when the contexmenu is about to be shown
$(container).on("contextmenu", function (event) {
    
    // Avoid the real one
    event.preventDefault();
    
    // Show contextmenu
    $(".custom-menu").finish().toggle(100).
    
    // In the right position (the mouse)
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});

// If the document is clicked somewhere
$(document).on("mousedown", function (event) {
    
        // If the clicked element is the menu, return
        
    if ($(event.target).parents(".custom-menu").length > 0) return;

        
        // Hide the menu
    $(".custom-menu").hide(100);
    if (activeRightClickNote !== null) {
        activeRightClickNote = null;
    }
});

// If the menu element(li under 'custom-menu' is clicked
$(".custom-menu li").click(function(event){
    
    // Switch Case on all elements with the attribute 'data-acion'
    switch($(this).attr("data-action")) {   
        
        // A case for each 'data-action'

            // If you click the "New Task" 'data-action', then this will happen..
        case "newTask":
                // Create a new task with the name corresponding to the currend DateTime // Temporary
            var newTask = CreateAndPushTask(new Date().toString());
                // Add said task(specifically its id) to the incubator Board)
            AddTaskIDToBoardViaBoardID(newTask.id, incubatorBoard.id);
                // Ccreate a new note on the page with the newly created task as the information (Also bring in the event call in order to know where, on the screen, to place it) 
            CreateNewNoteOnPageWithEvent(newTask, event)
            break;
        case "deleteTask":
            DeleteTaskAndNoteFromNote(activeRightClickNote);
            // PlaceAllNotesOnPage();
            break;
    }
  
    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);
});

// This is to set the note to a variable on right-click, in order to know which note to remove when you click on Delete Task in the context menu.
// as the event in the context menu returns the context menu li instead of the note div
document.addEventListener("mousedown", function(event) {
    var note = GetNoteDiv(event.target);
    if (note === null) return;
    var className = note.className; 
    if (className !== "note" ) {
        return;
    }
    activeRightClickNote = note;
})

function CreateIncubatorBoard() {
    var incubatorNameString = "Incubator";

    var tempBoardIndex = boards.findIndex( function(e) {
        return e.name == incubatorNameString;
    });
    return ( tempBoardIndex === -1 ? CreateAndPushBoard(incubatorNameString) : GetBoardFromID(tempBoardIndex));

}

function GetTaskIDFromNote(note) {
    // turn the note into a jqueryNote instead, and get the taskID attribute from that - I had issues getting the value.
    // note.getAttribute("taskID") did not work
    // note.dataset.taskID did not work


    var taskIDString = $(note).attr("taskid");
    var taskID = parseInt(taskIDString);
    return taskID;
}

function GetTaskFromNote(note) {
    var taskID = GetTaskIDFromNote(note);
    var task = GetTaskFromID(taskID);
    return task;
}

function GetNoteFromTask(task) {
    var note = GetNoteFromTaskID(task.id);
    return note;
}

function GetNoteFromTaskID(taskID) {
    // var task = GetTaskFromID(taskID);
    var note = $(taskid = taskID);

    return note;
}

function DeleteTaskAndNoteFromNote(note) {
    var task = GetTaskFromNote(note);
    DeleteTask(task);
    $(note).remove();
}

function AboveTrashCan(e) {
    var mousePos = [[e.pageX], [e.pageY]];


    return comparePositions(mousePos[0], trashCanJQPosition[0]) && comparePositions(mousePos[1], trashCanJQPosition[1]);
}

function GetJQueryPosition(element) {
    var jqEle = $(element);

    var pos = jqEle.position();
    var width = jqEle.width();
    var height = jqEle.height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
}


function comparePositions(pos1, pos2) {
    var r1 = (pos1[0] < pos2[0] ? pos1 : pos2);
    var r2 = (pos1[0] < pos2[0] ? pos2 : pos1);
    var intersecting = (r1[1] > r2[0]) || (r1[0] === r2[0]);
    return intersecting;
}

function AnimateNotePreDeletion(noteEle) {
    var jqTrashCan = $(trashCan);
    var middleOfTrashCan = jqTrashCan.position();
    var xPos = middleOfTrashCan.left - (jqTrashCan.width / 2)
    var yPos = middleOfTrashCan.top - (jqTrashCan.height / 2)
    $(noteEle).animate({
        transform: "translate3d(" + xPos + "px, " + yPos + "px, 0)",
        opacity: 0.25

    }, 500, function () {
        if (noteToDelete != null) {
            DeleteTaskAndNoteFromNote(noteToDelete);
        }
        noteToDelete = null;

    });
}


// [???] - Don't actually delete the following lines. (DO DELETE THIS THOUGH!!), as it makes it seem we have fun doing this.

// Fun things -- if this is in the final product.. I did an oopsie
function LimitedRandom(min,max) // min and max included
{
    return Math.floor( Math.random() * (max-min+1)+min );
}

function NumberOfIntegersNeededForRandom(min, max, checkNum) {
    var iterations = 0;
    if (checkNum >= max) return "Number you are looking for is higher than the possible value";
    while (LimitedRandom(min, max) !== checkNum) {
        iterations++
    }
    return "It took: " + iterations.toLocaleString('en') + " iterations to get " + checkNum.toLocaleString('en') + " with the min of " + min.toLocaleString('en') + " and the max of " + max.toLocaleString('en') + ".";
}

// PlaceAllNotesOnPage();


// https://stackoverflow.com/questions/12783650/convert-matrix-array
function decodeMatrix(matrixValue) {
    var values = matrixValue.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];
    var scale = Math.sqrt(a * a + b * b);
    var sin = b / scale;
    var angle = Math.round(Math.asin(sin) * (180 / Math.PI));
    return values;
}

PlaceAllNotesOnPage();