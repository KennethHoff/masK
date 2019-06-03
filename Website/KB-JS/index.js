// {console.log("LOL");
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  function handleDragStart(e) {
    this.style.opacity = '0.4';  }
  
  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  
    return false;
  }
  
  function handleDragEnter(e) {
    this.classList.add('over');
  }
  
  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }
  
  var cols = document.querySelectorAll('#columns .column');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
  });
  function handleDrop(e) {
  
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    // See the section on the DataTransfer object.
    return false;
  }
  
  function handleDragEnd(e) {
  
    [].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });
  }
  
  var cols = document.querySelectorAll('#columns .column');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
  });

  var dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }
  
    if (dragSrcEl != this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }

//   ********************************************************************
//   ********************************************************************
//   ********************************************************************
//   StickyNotes
//   ********************************************************************
//   ********************************************************************
//   ********************************************************************

  
  // var colors = ["#e9692c", "#ed9121","#ffc324","#fff000","#66b447","#8ee53f"];
  //   var colorIndex = 0;
  //   function randomColor() {
  //       var col = document.getElementById("testNote");
  //       if( colorIndex >= colors.length ) {
  //           colorIndex = 0;
  //       }
  //       col.style.backgroundColor = colors[colorIndex];
  //       colorIndex++;
  // }


  (function () {
    'use strict';
    
    var draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteBtnEl;
    
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
    
    createNote = function () {
      var stickerEl = document.createElement('div'),
          barEl = document.createElement('div'),
          textareaEl = document.createElement('textarea');
          var xPos = LimitedRandom(0, window.innerWidth - 200);
          var yPos = LimitedRandom(150, window.innerHeight - 200)

      
          var transformCSSValue = "translateX(" + xPos + "px) translateY(" + yPos + "px)";


      function LimitedRandom(min,max) // min and max included 
      {
      return Math.floor(Math.random()*(max-min+1)+min);

      }

      stickerEl.style.transform = transformCSSValue; 
      
      barEl.classList.add('bar');
      stickerEl.classList.add('sticker');
      
      stickerEl.appendChild(barEl);
      stickerEl.appendChild(textareaEl); 
      
      stickerEl.addEventListener('mousedown', onDragStart, false);
      
      document.body.appendChild(stickerEl);
    };
    
    createNote(); 
    
    addNoteBtnEl = document.querySelector('.addNoteBtn');
    addNoteBtnEl.addEventListener('click', createNote, false);
    document.addEventListener('mousemove', onDrag, false);
    document.addEventListener('mouseup', onDragEnd, false);
  })();


  //*************************************** *//
  //*************************************** *//
  //*************************************** *//
  //***********-------Cookie------********* *//
  //*************************************** *//
  //*************************************** *//
  //*************************************** *//
  

  // function setCookie(cname,cvalue,exdays) {
  //   var d = new Date();
  //   d.setTime(d.getTime() + (exdays*24*60*60*1000));
  //   var expires = "expires=" + d.toGMTString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // }
  
  // function getCookie(cname) {
  //   var name = cname + "=";
  //   var decodedCookie = decodeURIComponent(document.cookie);
  //   var ca = decodedCookie.split(';');
  //   for(var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }
  
  // function checkCookie() {
  //   var user=getCookie("username");
  //   if (user != "") {
  //     alert("Welcome again " + user);
  //   } else {
  //      user = prompt("Please enter your name:","");
  //      if (user != "" && user != null) {
  //        setCookie("username", user, 30);
  //      }
  //   }
  // }