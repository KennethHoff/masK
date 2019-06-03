// {console.log("LOL");

//   ********************************************************************
//   ********************************************************************
//   ********************************************************************
//   StickyNotes
//   ********************************************************************
//   ********************************************************************
//   ********************************************************************


  // function that Count clicks on create new Note button
  var clicks = 1;
  function counter(){
      clicks += 1;
      document.getElementsByClassName("addNoteBtn").innerHTML = clicks;
      console.log("Note: " + clicks);
    }

    
  (function () {
    'use strict';
    
    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl,
        buttonEl;
    
    onDragStart = function (ev) {
      var boundingClientRect;
      if (ev.target.className.indexOf('bar') === -1) {
        return;
      }
      
      draggedEl = this;
      
      boundingClientRect = draggedEl.getBoundingClientRect();
      
      grabPointY = boundingClientRect.top - ev.clientY;
      grabPointX = boundingClientRect.left - ev.clientX;
    };
    
    onDrag = function (ev) {
      if (!draggedEl) {
        return;
      }
      
      var posX = ev.clientX + grabPointX,
          posY = ev.clientY + grabPointY;
      
      if (posX < 0) {
        posX = 0;
      }
      
      if (posY < 0) {
        posY = 0;
      }
      
      draggedEl.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
    };
    
    onDragEnd = function () { 
      draggedEl = null;
      grabPointX = null;
      grabPointY = null;
    };
    
    /*
    the function we call when we click on Create new Note button. 
    inn this function we are creating new elements and put them together mot make
    a new Sticky Note, and within this function we create new note at a random location
    */
    function createNote() {
      var stickerEl = document.createElement('div'),
          barEl = document.createElement('div'),
          buttonEl = document.createElement('button'),
          textareaEl = document.createElement('textarea');
    
         // Variable to limit the random spawn for the Note's
          var xPos = LimitedRandom(0, window.innerWidth - 200);
          var yPos = LimitedRandom(150, window.innerHeight - 200);

          var transformCSSValue = "translateX(" + xPos + "px) translateY(" + yPos + "px)";
        //   var transformCSSValue = "translateX(" + event.clientX + "px) translateY(" +  event.clientX + "px)";
         

        // the function to get out a random number from within the valid range thats preset 
      function LimitedRandom(min,max) // min and max included 
      {
      return Math.floor(Math.random()*(max-min+1)+min);
      }

      stickerEl.style.transform = transformCSSValue; 
      
      barEl.classList.add('bar');
      buttonEl.classList.add('noteBtn');
      stickerEl.classList.add('sticker');
            
      
      
      stickerEl.appendChild(barEl).innerHTML = " Note #" + clicks;
      stickerEl.appendChild(buttonEl).innerHTML = "X";
      stickerEl.appendChild(textareaEl).innerHTML = "Text Content";
      stickerEl.addEventListener('mousedown', onDragStart, false);
      document.body.appendChild(stickerEl);
    }
    
    

    createNote(); 
    addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click', createNote, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
    buttonEl = document.querySelector('.noteBtn');
    buttonEl.addEventListener('click', randomColor, false);   
  })();
 
  
    var colors = ["#e9692c", "#ed9121","#ffc324","#fff000","#66b447","#8ee53f"];
    var colorIndex = 0;
    function randomColor() {
        // var col = document.getElementsByClassName('bar');
        if( colorIndex >= colors.length ) {
            colorIndex = 0;
        }
        document.body.style.background = colors[colorIndex];
        colorIndex++;
  }


// Original colours for sticky note's, function for loop thru all colours 
  

//   document.onmousedown = click;
               
//             // click function called 
//             function click(event) { 
                  
//                 // Condition to disable left click 
//                 if (event.button == 2) { 
//                     // test();
//                     randomColor();
//                    test(); 
//                 } 
//             } 

            function test(){
                    console.log("You've tried to open context menu");
                    // window.event.returnValue = false;
                    void(document.oncontextmenu=null);
            }


// // Listen for click events on the <body> element
// document.documentElement.addEventListener( "click", function ( event ) {
    
//     // Create an element to hold out "o", and some styles
//     var element = document.createElement( "span" ),
//         elStyle = {
//             position: "absolute",
//             top: event.clientY + "px",
//             left: event.clientX + "px",

            
//         };
    
//     // Apply our styles to the element
//     Object.keys( elStyle ).forEach( function ( property ) {
//         element.style[ property ] = elStyle[ property ];
//     });
    
//     // Set the innerHTML of the element, and insert it into the <body>
//     element.innerHTML = "masK";
//     document.body.appendChild( element );
    
// });





















//   //*************************************** *//
//   //*************************************** *//
//   //*************************************** *//
//   //***********-------Cookie------********* *//
//   //*************************************** *//
//   //*************************************** *//
//   //*************************************** *//
  

//   // function setCookie(cname,cvalue,exdays) {
//   //   var d = new Date();
//   //   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   //   var expires = "expires=" + d.toGMTString();
//   //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   // }
  
//   // function getCookie(cname) {
//   //   var name = cname + "=";
//   //   var decodedCookie = decodeURIComponent(document.cookie);
//   //   var ca = decodedCookie.split(';');
//   //   for(var i = 0; i < ca.length; i++) {
//   //     var c = ca[i];
//   //     while (c.charAt(0) == ' ') {
//   //       c = c.substring(1);
//   //     }
//   //     if (c.indexOf(name) == 0) {
//   //       return c.substring(name.length, c.length);
//   //     }
//   //   }
//   //   return "";
//   // }
  
//   // function checkCookie() {
//   //   var user=getCookie("username");
//   //   if (user != "") {
//   //     alert("Welcome again " + user);
//   //   } else {
//   //      user = prompt("Please enter your name:","");
//   //      if (user != "" && user != null) {
//   //        setCookie("username", user, 30);
//   //      }
//   //   }
//   // }
//   // Drag to delete

//   function allowDrop(ev)
// {
// ev.preventDefault();
// }
// function drag(ev)
// {
// ev.dataTransfer.setData("Text",ev.target.id);
// }
// function drop(ev)
// {
// ev.preventDefault();
// var data=ev.dataTransfer.getData("Text");
// var el = document.getElementById(data);
// el.parentNode.removeChild(el);
// }

// function remove(){
// var list = document.getElementsByClassName("sticker");
// list.removeChild(list.childNotes[0]);
// }


