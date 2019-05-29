var container = document.querySelector("#incubatorContainer");
var activeItem = null;
var currentZIndex = 0;

// Touch events
container.addEventListener("touchstart", DragStart);
container.addEventListener("touchend", DragEnd);
container.addEventListener("touchmove", Drag);

// Mouse events
container.addEventListener("mousedown", DragStart);
container.addEventListener("mouseup", DragEnd);
container.addEventListener("mousemove", Drag);

function GetNextZIndex() {
    currentZIndex++;
    return currentZIndex;
}

function DragStart(e) {
    if (!IsLeftButton(e)) return;
    if (e.target.className === 'note') {
        activeItem = e.target;
    }
    else if (e.target.parentElement.className === 'note') {
        activeItem = e.target.parentElement;
    }
    else return;
    
    if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
    }
    if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
    }
    if (e.type === "touchStart") {
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
    } 
    else {
        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
    }
    
    SetZIndex(activeItem, GetNextZIndex());
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
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;

        // Whenever you stop dragging a note, it will be go back to the default
        // SetZIndex(activeItem, 0);
    }
    activeItem = null;
}

function Drag(e) {
    // If you're "dragging" (ie. moving the mouse) and you're not holding a note, return.
    if (activeItem == null) return;
    e.preventDefault();
    // If you're touching the screen with your fingers.
    if (e.type === "touchMove") {
        // Set the current position variables (not the actual positions) to be the difference between where you clicked and where you started dragging
        activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
        activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    }
    // Otherwise.. (Which should only be if you are clicking with the mouse)
    else {
        // Set the current position variables (not the actual positions) to be the difference between where you clicked and where you started dragging
        activeItem.currentX = e.clientX - activeItem.initialX;
        activeItem.currentY = e.clientY - activeItem.initialY;
    }

    // Whenever you hold a note, it will be on the top
    // Set the new offSet to be where it currently sits.
    // This is used to accurately place the div where you want it.
    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;
    SetTranslate(activeItem.currentX, activeItem.currentY, activeItem);
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
    var vector2Position = {
        left: event.pageX - position.left,
        top: event.pageY - position.top
    }
    return vector2Position;
}

function IsLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
}

function CreateNewNoteOnPage(task, event) {
    var newDiv = document.createElement("div");
    container.appendChild(newDiv);
    newDiv.setAttribute("class", "note");
    newDiv.setAttribute("id", task.id);
    newDiv.innerHTML = "<h1>" + task.name + "</h1>";
    // newDiv.innerHTML = "<p" + 

    // Setting the position
    var pos = GetPosition(event, container);
    var left = pos.left - ($(newDiv).width() / 2);
    var top = pos.top - ($(newDiv).height() / 2);
    SetTranslate(left, top, newDiv);
    newDiv.xOffset = left;
    newDiv.yOffset = top;
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
});


// If the menu element(li under 'custom-menu' is clicked
$(".custom-menu li").click(function(event){
    
    // Switch Case on all elements with the attribute 'data-acion'
    switch($(this).attr("data-action")) {   
        
        // A case for each action.
        case "newTask":
            var newTask = CreateAndPushTask(new Date().toString());
            CreateNewNoteOnPage(newTask, event)
            break;
    }
  
    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);
}); 