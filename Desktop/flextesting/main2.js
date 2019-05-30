// //////////////// lists database///////////////
var arrayOfLists=[];

////////// add new list section ////////////////////////






var containerCatalogue = document.getElementById("container");





containerCatalogue.addEventListener("click",e =>{
    //all add new list buttons have id over 3000
    console.log(e.target.id);
  
    
    
    if((e.target.id).includes("add")){

        createNewCardd(e.target.id);
    }

   

    if((e.target.id).includes("button2")){
        addNewCard(e.target.id);
    }

    if((e.target.id).includes("addNewListButton") ){
        
        createInput(e.target.id);
    }

    if((e.target.id).includes("buttonAcceptList")){
        acceptNewList(e.target.id);
    }
});

function createInput(id){
    var containerID = parseInt(id);
    var addNewListButton = document.getElementById(id);
    var addNewListInput = document.getElementById(containerID + "addNewListInput");
    addNewListButton.style.display ='none';
    addNewListInput.style.display = 'block';
}


function createNewCardd (id){
    var containerID = parseInt(id);
    var button1 = document.getElementById(containerID+"button2")
    console.log(button1.id);
    
    
}





function acceptNewList(id){
    var containerID = parseInt(id);
    var columnContainer = document.getElementById(containerID + "columnContainer");
    var acceptNewListButton = document.getElementById(containerID + "buttonAcceptList");
    var value = document.getElementById(containerID+"valueAcceptList").value;
  
    console.log(columnContainer.id)
    
    if(value){
        var addNewListButton = document.getElementById(containerID+"addNewListButton");
        var addNewListInput = document.getElementById(containerID + "addNewListInput");
        addNewListButton.style.display ='none';
        addNewListInput.style.display = 'none';
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("cardContainer");
        itemDiv.id = containerID + "cardContainer";
        columnContainer.appendChild(itemDiv);
        var nameOfClass = document.createElement("p");
        nameOfClass.innerText = value;
        itemDiv.appendChild(nameOfClass);
        createCardContainer(containerID,itemDiv);

    }
}

function createCardContainer(id,itemDiv){
    var cardContainerInholdDiv = document.createElement("div");
    cardContainerInholdDiv.id = id + "cardInhold";
    cardContainerInholdDiv.classList.add("cardInhold");
    itemDiv.appendChild(cardContainerInholdDiv);
    var addTextAreaToCardContainer = document.createElement("textarea");
    addTextAreaToCardContainer.id = id+ "textArea";
    addTextAreaToCardContainer.classList.add("textAreaHide");
    itemDiv.appendChild(addTextAreaToCardContainer);

    var itemButton = document.createElement("button");
    itemButton.innerText = "+Add";
    itemButton.classList.add("addCardButton");
    itemButton.id= id+"add";
    itemDiv.appendChild(itemButton);
    var itemButton2 = document.createElement("button");
    itemButton2.innerText = "+Add";
    itemButton2.classList.add("addCardButtonHide");
    itemButton2.id = id + "button2";
    itemDiv.appendChild(itemButton2);
}

        


        
        

            // //name of this container has to be changed
            // var cardContainerInholdDiv = document.createElement("div");
            // cardContainerInholdDiv.id = itemDiv.id + "cardInhold";
            // cardContainerInholdDiv.classList.add("cardInhold");
            // itemDiv.appendChild(cardContainerInholdDiv);
            // var addTextAreaToCardContainer = document.createElement("textarea");
            // addTextAreaToCardContainer.id = itemDiv.id + "textArea";
            // addTextAreaToCardContainer.classList.add("textAreaHide");
            // itemDiv.appendChild(addTextAreaToCardContainer);


            
            
            // // create column for next list
            // var nextColumnDiv = document.createElement("div");
            // nextColumnDiv.classList.add("columnContainer");
        //     nextColumnDiv.id = idGenerator();
        //     containerCatalogue.appendChild(nextColumnDiv);

        //     //add new List button to the newly created column
        //     var addNewListButton = document.createElement("button");
        //     addNewListButton.classList.add("addNewListButton");
        //     addNewListButton.textContent = "Add new list";
        //     addNewListButton.id = 3000 + parseInt(nextColumnDiv.id);
        //     nextColumnDiv.appendChild(addNewListButton);
        //     var addNewListInputDiv = document.createElement("div");
        //     addNewListInputDiv.classList.add("addNewListInput");
        //     addNewListInputDiv.id = 3500 + parseInt(nextColumnDiv.id);
        //     nextColumnDiv.appendChild(addNewListInputDiv);
        //     var createInputField = document.createElement("input");
        //     createInputField.type = "text";
        //     createInputField.placeholder = "Enter list title";
        //     createInputField.id = addNewListInputDiv.id + "value";
        //     addNewListInputDiv.appendChild(createInputField);
        //     var createInputButton = document.createElement("button");
        //     createInputButton.type = "button";
        //     createInputButton.textContent = "Add list";
        //     createInputButton.id = addNewListInputDiv.id + "button";
        //     addNewListInputDiv.appendChild(createInputButton);

        // }})
        
//    }
   

// });





///////// add new card improvisation

//  function createNewCard(idNumber){
//     var containerID = parseInt(idNumber);
//     console.log(containerID + "button2");
//     document.getElementById(containerID+"button2").classList.add("addCardButton2");
//     document.getElementById(containerID+"button2").classList.remove("addCardButtonHide");
//     document.getElementById(containerID+"textArea").classList.add("textArea");
//     document.getElementById(containerID+"textArea").classList.remove("textAreaHide");
//     document.getElementById(idNumber).classList.add("addCardButtonHide");
//     document.getElementById(idNumber).classList.remove("addCardButton");
    

//     }


    
    function addNewCard(id){ //1000button2
        
            var value = document.getElementById(parseInt(id)+"textArea").value;
            document.getElementById(id).classList.add("addCardButtonHide");
            document.getElementById(id).classList.remove("addCardButton2");
            document.getElementById(parseInt(id)+"textArea").classList.add("textAreaHide");
            document.getElementById(parseInt(id)+"textArea").classList.remove("textArea");
            var division = document.getElementById(parseInt(id)+"cardInhold");
            var itemDiv2 = document.createElement("div");
            division.appendChild(itemDiv2);
            var itemP = document.createElement("p");
            itemP.textContent = value;
            itemDiv2.appendChild(itemP);
            itemDiv2.classList.add("cardCreated");
            document.getElementById(parseInt(id)+1000).classList.remove("addCardButtonHide");
            document.getElementById(parseInt(id)+1000).classList.add("addCardButton");
            document.getElementById(parseInt(id)+"textArea").value ="";
    }
  
 function addNewLines(str){
     var result = '';
     while(str.length >0){
         result += str.substring(0,10) + '\n';
         str= str.substring(10);
     }
     return result;
 }






// //////////////////// Generate ID Section //////////////////
var startNumberID = 1;

//function that generates ID number iterating startNumberID;
function idGenerator(){
    var numberID = startNumberID++;
   return numberID;
}

// function that pushes generated ID number to arrayOfLists database
//not used yet
function pushToArrayOfLists(numberID){
    pushToArrayOfLists.push({listID:numberID})
}






















