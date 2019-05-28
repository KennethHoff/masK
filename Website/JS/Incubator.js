var container = document.querySelector("#incubatorContainer");
var activeItem = null;

// Touch events
container.addEventListener("touchstart", DragStart);
container.addEventListener("touchend", DragEnd);
container.addEventListener("touchmove", Drag);

// Mouse events
container.addEventListener("mousedown", DragStart);
container.addEventListener("mouseup", DragEnd);
container.addEventListener("mousemove", Drag);

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
}

function DragEnd() {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }
    activeItem = null;
}

function Drag(e) {
    if (activeItem == null) return;
    e.preventDefault();
    if (e.type === "touchMove") {
        activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
        activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    }
    else {
        activeItem.currentX = e.clientX - activeItem.initialX;
        activeItem.currentY = e.clientY - activeItem.initialY;
    }
    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;
    SetTranslate(activeItem.currentX, activeItem.currentY, activeItem);
}
function SetTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// Thanks to https://www.kirupa.com/html5/drag.htm for the "boilerplate"

function IsLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
}

// Context Menu

const menu = document.querySelector(".menu");
let menuVisible = false;


function ContextMenu(e) {
    if (activeItem !== null) return;
    e.preventDefault();
    console.log("Context Menu engaged");
}

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
$(container).bind("mousedown", function (e) {
    
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        
        // Hide it
        $(".custom-menu").hide(100);
    }
});


// If the menu element is clicked
$(".custom-menu li").click(function(){
    
    // This is the triggered action name
    switch($(this).attr("data-action")) {
        
        // A case for each action. Your actions here
        case "newTask":
            CreateAndPushTask(new Date().toString());
            console.log(tasks[tasks.length-1]);
            break;
        
    }
  
    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);
  });




  var menuArray = [
    {
        name: "Filler"
    },
    {
        name: "Memebers",
        submenus: ["Kenneth", "Kristiania"]
    }, 
    {
        name: "Fillerino"
    }];

    menuArray[i].name;