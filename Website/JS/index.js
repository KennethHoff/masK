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

  function myBackground() {

    input = document.getElementById ("myFile");
    alert(input.value);

    // document.body.style.backgroundColor = "#f3f3f3";
       document.body.style.backgroundImage = "url('" + input.value + "')";
  }
