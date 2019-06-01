// What my comments mean / other information relevant to my code:

// This JavaScript document is badly documented compared to my other scripts (specifically database.js), there are a few reasons for this:
// Database.js is as close to an "API" as we get, and those need the best documentation, as they are literally used by other developers, instead of "just" as a way to grade our assignment

// After a couple of days of development I opted into learning, and utilizing jquery.
// Already I feel somewhat competent in the basics, but it means that some things are a little weird.
// For example, in some functions, I input JS Dom Elements, but then convert those into jquery afterwards. instead of simply inserting the jquery dom element from the start
// I was planning on fixing all of those issues, but If there are some left, I'm sorry. There were simply more pressing issues that needed to be addressed beforehand.

// Minor quirk: If you hover over the note while it is inside the trashCan, the :hover CSS selector will activate. This is unintended.

let container = document.querySelector("#incubatorContainer");
let trashCan = document.querySelector("#trashCan");
let trashCanJQPosition = GetJQueryPosition(trashCan);
    // which item you are dragging
let activeDragNote = null;
let activeRightClickNote = null;
let currentZIndex = 0;
let incubatorBoard = CreateIncubatorBoard();

// Related to deleting a note

let requireWaitingUntilAnimationIsComplete = true;

let aboveTrashCan = false;
let noteToDelete = null;

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
    
    SetNoteDefaultPositionValues(activeDragNote, e);
    
    SetZIndex(activeDragNote, GetNextZIndex());
}

function SetNoteDefaultPositionValues(note, e) {
    if (!note.xOffset) {
        note.xOffset = 0;
    }
    if (!note.yOffset) {
        note.yOffset = 0;
    }
    if (e.type === "touchStart") {
        note.initialX = e.touches[0].clientX - note.xOffset;
        note.initialY = e.touches[0].clientY - note.yOffset;
    }
    else {
        note.initialX = e.clientX - note.xOffset;
        note.initialY = e.clientY - note.yOffset;
    }
}
function DragEnd(e) {
    if (activeDragNote !== null) {
        activeDragNote.initialX = activeDragNote.currentX;
        activeDragNote.initialY = activeDragNote.currentY;

        let task = GetTaskFromNote(activeDragNote);
        let position = GetNotePosition(activeDragNote, container);
        StorePositionDataInTask(task, position.left, position.top);

        if (aboveTrashCan) {
            noteToDelete = activeDragNote;
            if (noteToDelete.readyToBeDeleted) DeleteTaskAndNoteFromNote(noteToDelete);
            else if (requireWaitingUntilAnimationIsComplete) ResetNoteStyling(noteToDelete);
        }

        activeDragNote = null;
    }
}

function Drag(e) {
    // If you're "dragging" (ie. moving the mouse) and you're not holding a note, return.
    if (activeDragNote == null) return;
    e.preventDefault();
    // If you're touching the screen with your fingers.

    aboveTrashCan = CheckIfAboveTrashCan(e)
    if (aboveTrashCan) {
        AnimateNotePreDeletion(activeDragNote);
    }
        // Do not move the note if you're over the trashCan. This is to ensure the animation moves smoothly
    else {
        let pos = GetNotePosWithEvent(activeDragNote, e);
        SetNotePosition(activeDragNote, pos.x, pos.y);
        ResetNoteStyling(activeDragNote, e);
    }
}
function GetNotePosWithEvent(note, e) {
    let currentX, currentY;
    if (e.type === "touchMove") {
        // Set the current position letiables (not the actual positions) to be the difference between where you clicked and where you started dragging
        currentX = e.touches[0].clientX - note.initialX;
        currentY = e.touches[0].clientY - note.initialY;
    }
    // Otherwise.. (Which should only be if you are clicking with the mouse)
    else {
        // Set the current position letiables (not the actual positions) to be the difference between where you clicked and where you started dragging
        currentX = e.clientX - note.initialX;
        currentY = e.clientY - note.initialY;
    }
    return { x: currentX, y: currentY };
}

function SetNotePosition(note, xPos, yPos) {

    note.currentX = xPos;
    note.currentY = yPos;

    // Set the new offSet to be where it currently sits.
    // This is used to accurately place the div where you want it.
    note.xOffset = note.currentX;
    note.yOffset = note.currentY;
    SetTranslate(note.currentX, note.currentY, note);
}

/**
 * If you move the note into the trash can, but then change your mind, I want the styling to return to what it was prior.
 * @param {note} note DOM element for the note Div
 * @param {event} e Event from the eventhandler
 */
function ResetNoteStyling(note, e) {
    note.currentlyAnimating = false;
    let currentXPos = note.currentX;
    let currentYPos = note.currentY;
    let oldStyle = $(note).attr("oldStyle");
    $(note).removeAttr("oldStyle");
    $(note).attr("style", oldStyle);
    $(note).stop();
    SetTranslate(note.currentX, note.currentY, note);
    note.readyToBeDeleted = false;
}

function SetZIndex(item, index) {
    item.style.zIndex = index;
}

function SetTranslate(xPos, yPos, el) {
    el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
}

// Thanks to https://www.kirupa.com/html5/drag.htm for the "boilerplate"

function GetPosition(event, containerString) {
    // TODO: Add touch support

    let offset = $(containerString).offset();

    let vector2Offset = {
        left: event.pageX - offset.left,
        top: event.pageY - offset.top
    }
    return vector2Offset;
}


function GetNotePosition(note) {

    let matrix = $(note).css('transform');
    let newMatrix = decodeMatrix(matrix)

    let newPos = {
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
    let button = evt.which || evt.button;
    return button == 1;
}

function CreateNewNoteOnPageWithEvent(task, event) {
    let pos = GetPosition(event, container);
    let newPos = CreateNewNoteOnPage(task, pos);

    // Storing the position on the Task (Should only be called on: Initial creation, and on "DragEnd");
    StorePositionDataInTask(task, newPos.left, newPos.top);
}

function CreateNewNoteOnPage(task, pos) {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("taskID", task.id);
    container.appendChild(newDiv);
    newDiv.setAttribute("class", "note");
    newDiv.setAttribute("id", "note" + task.id);
    let titleString = "<p class = noteHeaders id = " + "note" + task.id + "Header>" + task.name + "</p>";
    let descriptionString = "<p>" + task.description + "</p>"
    newDiv.innerHTML = titleString + "\n" + descriptionString;

    // Setting the position

    let left = pos.left - ($(newDiv).width() / 2);
    let top = pos.top - ($(newDiv).height() / 2);
    SetTranslate(left, top, newDiv);
    newDiv.xOffset = left;
    newDiv.yOffset = top;
    
    return {left: left, top: top};
}

function CreateNewNoteOnPageNew(task, pos) {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("taskID", task.id);
    container.appendChild(newDiv);
    newDiv.setAttribute("class", "note");
    newDiv.setAttribute("id", "note" + task.id);
    let titleString = "<p class = noteHeaders id = " + "note" + task.id + "Header>" + task.name + "</p>";
    let descriptionString = "<p>" + task.description + "</p>"
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
    let noteDiv = null;

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
        let task = GetTaskFromID(noteID);
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
            let newTask = CreateAndPushTask(new Date().toString());
                // Add said task(specifically its id) to the incubator Board)
            AddTaskIDToBoardViaBoardID(newTask.id, incubatorBoard.id);
                // Ccreate a new note on the page with the newly created task as the information (Also bring in the event call in order to know where, on the screen, to place it) 
            CreateNewNoteOnPageWithEvent(newTask, event)
            break;
    }
  
    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);
});

// This is to set the note to a letiable on right-click, in order to know which note to remove when you click on Delete Task in the context menu.
// as the event in the context menu returns the context menu li instead of the note div
document.addEventListener("mousedown", function(event) {
    let note = GetNoteDiv(event.target);
    if (note === null) return;
    let className = note.className; 
    if (className !== "note" ) {
        return;
    }
    activeRightClickNote = note;
})

function CreateIncubatorBoard() {
    let incubatorNameString = "Incubator";

    let tempBoardIndex = boards.findIndex( function(e) {
        return e.name == incubatorNameString;
    });
    return ( tempBoardIndex === -1 ? CreateAndPushBoard(incubatorNameString) : GetBoardFromID(tempBoardIndex));

}

function GetTaskIDFromNote(note) {
    // turn the note into a jqueryNote instead, and get the taskID attribute from that - I had issues getting the value.
    // note.getAttribute("taskID") did not work
    // note.dataset.taskID did not work


    let taskIDString = $(note).attr("taskid");
    let taskID = parseInt(taskIDString);
    return taskID;
}

function GetTaskFromNote(note) {
    let taskID = GetTaskIDFromNote(note);
    let task = GetTaskFromID(taskID);
    return task;
}

function GetNoteFromTask(task) {
    let note = GetNoteFromTaskID(task.id);
    return note;
}

function GetNoteFromTaskID(taskID) {
    // let task = GetTaskFromID(taskID);
    let note = $(taskid = taskID);

    return note;
}

function DeleteTaskAndNoteFromNote(note) {
    let task = GetTaskFromNote(note);
    DeleteTask(task);
    $(note).remove();
}

function CheckIfAboveTrashCan(e) {
    // Only returns true if both are true (true + true = true | true + false = false (vice versa) | false + false = false)
    return comparePositions([e.pageX], trashCanJQPosition[0]) && comparePositions([e.pageY], trashCanJQPosition[1]);
}

function GetJQueryPosition(element) {
    let jqEle = $(element);

    let pos = jqEle.position();
    let width = jqEle.width();
    let height = jqEle.height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
}


function comparePositions(pos1, pos2) {
    let r1 = (pos1[0] < pos2[0] ? pos1 : pos2);
    let r2 = (pos1[0] < pos2[0] ? pos2 : pos1);
    let intersecting = (r1[1] > r2[0]) || (r1[0] === r2[0]);
    return intersecting;
}

function AnimateNotePreDeletion(noteEle) {
    if (noteEle.currentlyAnimating) return;
    noteEle.currentlyAnimating = true;

    $(noteEle).attr("oldStyle", $(noteEle).attr("style"));

    let animationDuration = 750;
    let jqTrashCan = $(trashCan);
    let middleOfTrashCan = jqTrashCan.position();
    let xPos = middleOfTrashCan.left - (jqTrashCan.width / 2);
    let yPos = middleOfTrashCan.top - (jqTrashCan.height / 2);
    $(noteEle).animate({
        transform: "translate(" + xPos + "px, " + yPos + "px)"
        // opacity: 0.25
    }, animationDuration, function () {

        if (noteToDelete != null) {
            if (!requireWaitingUntilAnimationIsComplete) DeleteTaskAndNoteFromNote(noteToDelete);
        }
        noteToDelete = null;
        if (activeDragNote === null) return;
        activeDragNote.readyToBeDeleted = true;
        
    });
}

// https://stackoverflow.com/questions/12783650/convert-matrix-array
function decodeMatrix(matrixValue) {
    let values = matrixValue.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    let a = values[0];
    let b = values[1];
    let c = values[2];
    let d = values[3];
    let scale = Math.sqrt(a * a + b * b);
    let sin = b / scale;
    let angle = Math.round(Math.asin(sin) * (180 / Math.PI));
    return values;
}

PlaceAllNotesOnPage();


// [???] - Don't actually delete the following lines. (DO DELETE THIS THOUGH!!), as it makes it seem we have fun doing this.

// Fun things -- if this is in the final product.. I did an oopsie
function LimitedRandom(min,max) // min and max included
{
    return Math.floor( Math.random() * (max-min+1)+min );
}

function NumberOfIntegersNeededForRandom(min, max, checkNum) {
    let iterations = 0;
    if (checkNum >= max) return "Number you are looking for is higher than the possible value";
    while (LimitedRandom(min, max) !== checkNum) {
        iterations++
    }
    return "It took: " + iterations.toLocaleString('en') + " iterations to get " + checkNum.toLocaleString('en') + " with the min of " + min.toLocaleString('en') + " and the max of " + max.toLocaleString('en') + ".";
}