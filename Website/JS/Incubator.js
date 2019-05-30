var container = document.querySelector("#incubatorContainer");
    // which item you are dragging
var activeDragItem = null;
var activeRightClickItem = null;
var currentZIndex = 0;
var incubatorBoard = CreateIncubatorBoard();

// Touch events
container.addEventListener("touchstart", DragStart);
container.addEventListener("touchend", DragEnd);
container.addEventListener("touchmove", Drag);

// Mouse events
container.addEventListener("mousedown", DragStart);
container.addEventListener("mouseup", DragEnd);
container.addEventListener("mousemove", Drag);

// Not a super-fan of this implementation, as it's an ever-increasing index, but it works
function GetNextZIndex() {
    currentZIndex++;
    return currentZIndex;
}

function DragStart(e) {
        // If it's not left button (meaning right-button, middle click etc..), return.
        // Only allow dragging with left-click
    if (!IsLeftButton(e)) return;
    
    activeDragItem = GetNoteDiv(e.target);
    if (activeDragItem == null) return;
    
    if (!activeDragItem.xOffset) {
        activeDragItem.xOffset = 0;
    }
    if (!activeDragItem.yOffset) {
        activeDragItem.yOffset = 0;
    }
    if (e.type === "touchStart") {
        activeDragItem.initialX = e.touches[0].clientX - activeDragItem.xOffset;
        activeDragItem.initialY = e.touches[0].clientY - activeDragItem.yOffset;
    } 
    else {
        activeDragItem.initialX = e.clientX - activeDragItem.xOffset;
        activeDragItem.initialY = e.clientY - activeDragItem.yOffset;
    }
    
    SetZIndex(activeDragItem, GetNextZIndex());
}

function CheckAndSetPlacementStats(item) {
    if (!item.xOffset) {
        item.xOffset = 0;
    }
    if (!item.yOffset) {
        item.yOffset = 0;
    }
}

function DragEnd() {
    if (activeDragItem !== null) {
        activeDragItem.initialX = activeDragItem.currentX;
        activeDragItem.initialY = activeDragItem.currentY;

        // Whenever you stop dragging a note, it will be go back to the default
        // SetZIndex(activeItem, 0);
    }
    activeDragItem = null;
}

function Drag(e) {
    // If you're "dragging" (ie. moving the mouse) and you're not holding a note, return.
    if (activeDragItem == null) return;
    e.preventDefault();
    // If you're touching the screen with your fingers.
    if (e.type === "touchMove") {
        // Set the current position variables (not the actual positions) to be the difference between where you clicked and where you started dragging
        activeDragItem.currentX = e.touches[0].clientX - activeDragItem.initialX;
        activeDragItem.currentY = e.touches[0].clientY - activeDragItem.initialY;
    }
    // Otherwise.. (Which should only be if you are clicking with the mouse)
    else {
        // Set the current position variables (not the actual positions) to be the difference between where you clicked and where you started dragging
        activeDragItem.currentX = e.clientX - activeDragItem.initialX;
        activeDragItem.currentY = e.clientY - activeDragItem.initialY;
    }

    // Whenever you hold a note, it will be on the top
    // Set the new offSet to be where it currently sits.
    // This is used to accurately place the div where you want it.
    activeDragItem.xOffset = activeDragItem.currentX;
    activeDragItem.yOffset = activeDragItem.currentY;
    SetTranslate(activeDragItem.currentX, activeDragItem.currentY, activeDragItem);
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
    var position = $(containerString).position();

    var vector2Offset = {
        left: event.pageX - offset.left,
        top: event.pageY - offset.top
    }
    return vector2Offset;
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

function CreateNewNoteOnPage(task, event) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("taskID", task.id);
    container.appendChild(newDiv);
    newDiv.setAttribute("class", "note");
    newDiv.setAttribute("id", "note"  + task.id);
    var titleString = "<p class = noteHeaders id = " + "note" + task.id +   "Header>" + task.name + "</p>";
    var descriptionString = "<p>" + task.description + "</p>"
    newDiv.innerHTML = titleString + "\n" + descriptionString;

    // Setting the position
    var pos = GetPosition(event, container);
    var left = pos.left - ($(newDiv).width() / 2);
    var top = pos.top - ($(newDiv).height() / 2);
    SetTranslate(left, top, newDiv);
    newDiv.xOffset = left;
    newDiv.yOffset = top;
}

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

// Context Menu

// Trigger action when the contexmenu is about to be shown
$(container).bind("contextmenu", function (event) {
    
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
$(document).bind("mousedown", function (event) {
    
        // If the clicked element is the menu, return
        
    if ($(event.target).parents(".custom-menu").length > 0) return;

        
        // Hide the menu
    $(".custom-menu").hide(100);
    if (activeRightClickItem !== null) {
        activeRightClickItem = null;
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
            CreateNewNoteOnPage(newTask, event)
            break;
        case "deleteTask":
            DeleteTaskAndNoteFromNote(activeRightClickItem);
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
    activeRightClickItem = note;
})

function CreateIncubatorBoard() {
    return CreateAndPushBoard("Incubator");
}

function GetTaskIDFromNote(note) {
    // turn the note into a jqueryNote instead, and get the taskID attribute from that - I had issues getting the value.
    // note.getAttribute("taskID") did not work
    // note.dataset.taskID did not work


    var jqueryNote = $(note);
    var taskIDString = jqueryNote.attr("taskid");
    var taskID = parseInt(taskIDString);
    return taskID;
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
    var taskID = GetTaskIDFromNote(note);
    DeleteTaskFromTaskID(taskID);
    var jqueryNote = $(note);
    jqueryNote.remove();
}

// Fun things
function LimitedRandom(min,max) // min and max included
{
    return Math.floor( Math.random() * (max-min+1)+min );
}

function checkNumberOfIntegersNeededForRandom(min, max, checkNum) {
    var iterations = 0;
    if (checkNum >= max) return "Number you are looking for is higher than the possible value";
    while (LimitedRandom(min, max) !== checkNum) {
        iterations++
    }
    return "It took: " + iterations.toLocaleString('en') + " iterations to get " + checkNum.toLocaleString('en') + " with the min of " + min.toLocaleString('en') + " and the max of " + max.toLocaleString('en') + ".";
}