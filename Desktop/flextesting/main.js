// //////////////// lists database///////////////not in use yet
var arrayOfLists=[];


// this is container that holds everything. it will be used to target id of objects
//on the site
var containerCatalogue = document.getElementById("container");



//her the container directory is used. whenever we click on sth inside this 
//container it fetches id of anything.
containerCatalogue.addEventListener("click",e =>{
    

    //if we click on an object that has addNewListButton in id then new input
    //is implemented. 
    //function createInput() make that button Add new list changes so the 
    // user can write the name of a new list
    if((e.target.id).includes("addNewListButton") ){
        createInput(e.target.id);
    }

    //this function takes value from input and saves it 
    //as a name of the newly created list
    if((e.target.id).includes("buttonAcceptList")){
        acceptNewList(e.target.id);
    }

    //this function starts createNewCard function that is an user input process
    if((e.target.id).includes("implement")){
        createNewCard(e.target.id);
    }

   
    // this function accepts the input and add new card to the cards container of the
    //column
    if((e.target.id).includes("button2")){
        addNewCard(e.target.id);
    }

});

//in this function button Add new list is changed into input field by changing style.display
//add new list becomes invisible, input field becomes visible
function createInput(id){
    var containerID = parseInt(id);
    var addNewListButton = document.getElementById(id);
    var addNewListInput = document.getElementById(containerID + "addNewListInput");
    addNewListButton.style.display ='none';
    addNewListInput.style.display = 'block';
}


//this function takes value from input newListInput. if value is true(exists) 
// cardContainer is created and holds the name of the list from value.
//next its calling another function createCardContainer that takes id of created container

function acceptNewList(id){
    //containerID turns id of objects into a number so its easier to navigate
    //as every column has specific number starting from 0 and all objects inside this columns have
    //id that starts with the same number
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
// in this function div cardInhold is created. cardInhold holds all cards on the list
// it is attached to. this function creates also textarea that will be used when
// user wants to add new card. function adds also buttons both to start
//process of adding new card and accepting it. whenever started this function
// calls also another function addNewColumn()
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
    //this button starts process of creating new card
    itemButton.innerText = "+Add";
    itemButton.classList.add("addCardButton");
    itemButton.id= id+"implement";
    itemDiv.appendChild(itemButton);
    // this button accepts input and creates new card
    var itemButton2 = document.createElement("button");
    itemButton2.innerText = "+Add";
    itemButton2.classList.add("addCardButtonHide");
    itemButton2.id = id + "button2";
    itemDiv.appendChild(itemButton2);

    
    addNewColumn();
}

// this function open textarea for new card. here user can write whatever
//he/she wants that will appear as a card inside a column
function createNewCard (id){
    //containerID turns id of objects into a number so its easier to navigate
    //as every column has specific number starting from 0 and all objects inside this columns have
    //id that starts with the same number
    var containerID = parseInt(id);
    var button1 = document.getElementById(containerID+"button2");
    var button2 = document.getElementById(containerID+"implement");
    var textArea = document.getElementById(containerID+"textArea");
    button1.style.display = "inline-block";
    button2.style.display ="none"
    textArea.classList.add("textArea");
    textArea.classList.remove("textAreaHide");  
}

//this function creates another column next to the column that was created
//by the user. this function calls also for function addNewButton() that creates
//Add new list button of another column     
function addNewColumn(){
    var nextColumnDiv = document.createElement("div");
    nextColumnDiv.classList.add("columnContainer");
    nextColumnDiv.id = idGenerator()+"columnContainer";
    containerCatalogue.appendChild(nextColumnDiv)
    addNewButton(parseInt(nextColumnDiv.id),nextColumnDiv);
}

//this function creates new Add new list button and addNewListInput div that inholds
//can be used while clicked on Add new list button. 
function addNewButton(id,nextColumnDiv){
    var addNewListButton = document.createElement("button");
    addNewListButton.classList.add("addNewListButton");
    addNewListButton.textContent = "Add new list";
    addNewListButton.id = id+"addNewListButton";
    nextColumnDiv.appendChild(addNewListButton);
    var addNewListInputDiv = document.createElement("div");
    addNewListInputDiv.classList.add("addNewListInput");
    addNewListInputDiv.id = id + "addNewListInput";
    nextColumnDiv.appendChild(addNewListInputDiv);
    var createInputField = document.createElement("input");
    createInputField.type = "text";
    createInputField.placeholder = "Enter list title";
    createInputField.id = id + "valueAcceptList";
    addNewListInputDiv.appendChild(createInputField);
    var createInputButton = document.createElement("button");
    createInputButton.type = "button";
    createInputButton.textContent = "Add list";
    createInputButton.id = id + "buttonAcceptList";
    addNewListInputDiv.appendChild(createInputButton);
}



// this function accepts value from the card input and adds newly created card
//as a block to cardInhold container.
function addNewCard(id){
    //containerID turns id of objects into a number so its easier to navigate
    //as every column has specific number starting from 0 and all objects inside this columns have
    //id that starts with the same number
    var containerID = parseInt(id);
    var value = document.getElementById(containerID+"textArea").value;
    document.getElementById(id).style.display ="none";
    document.getElementById(containerID+"textArea").classList.add("textAreaHide");
    document.getElementById(containerID+"textArea").classList.remove("textArea");
    var cardInhold = document.getElementById(containerID+"cardInhold");
    var itemDiv = document.createElement("div");
    cardInhold.appendChild(itemDiv);
    var itemP = document.createElement("p");
    itemP.textContent = value;
    itemDiv.appendChild(itemP);
    itemDiv.classList.add("cardCreated");
    document.getElementById(containerID+"implement").style.display = 'block';
    document.getElementById(containerID+"textArea").value =""

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






















