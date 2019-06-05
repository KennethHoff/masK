// CurrentIndex is the variable that ID generator uses to generate IDs
// Or numbers from 0 to length of array.
let currentIndex = 0;

/*--------------------FUNCTIONS----------------------*/
/** 
 * Main function that runs the other functions inside it
 * Its also here that the ulNavigator = ul with id "navigator"
 * Sidebar is where everything is inside.
*/
let ulNavigator = CreateUl("navigator", null, document.getElementById("sidebar"));
/*---------------ARRAY---------------*/

/**
 * MemberList array with navigation buttons and (members) with a potential calender function. 
*/

const imageFolder = "../Images"
let memberList = [
    {
        name: "incubator",
        html: "<a href='../HTML/incubator.html'><img class='navi' src='../Images/incubator-white.wide.png' alt='Incubator'></a>"
    },
    {
        name: "Members",
        html: "<a href='#'><img class='navi' src='../Images/memberLogo-white.png' alt = 'Memebers'></a>",
        subMenu: users
    },
    {
        name: "Book",
        html: "<a href='../HTML/battleplan.html'><img class='navi' src='../Images/book-logo-white-wide.png' alt = 'Battleplan'></a>",
    }];
// ------------------- ARRAY end --------------------

// --------------------- Render function ------------------
   RenderMemberList();

/** 
 * this function calls the RenderArray function with the memberList.
 * 
 * */
function RenderMemberList() {
    RenderArray(memberList, ulNavigator);
}
/** 
 * This function iterates through the array given, and if the ul is null, set the ul to ulNavigator
 * @param {string[]} array a given array
 * @param {string} ul a given ul element, if the ul is null. Set it to ulNavigator.
 * */
function RenderArray(array, ul) {
    for (var i = 0; i < array.length; i++){
        RenderObject(array[i], (ul === null ? ulNavigator : ul));
    }
}
/**  
 * A function that render an object, in this case objEle = li and ulElement
 * also saves the function createLi(objEle) which creates an Li to the variable Li
 * and create the Li appended to the given ulElement.  
 * @param {String} objEle is the object element in the array aka [ { Element is inside } <-- obj ]
 * @param {String} ulElement is an ul element which an li is appended to.
 *  
*/
function RenderObject(objEle, ulElement) {
    var li = CreateLi(objEle = objEle);
    ulElement.appendChild(li);

/* 
    Checks if the type of objEle === string or .subMenu === undefined or objEle.subMenu.length === 0 if it is return
    signs the CreateUl(null, null, li) function to the variable subMenuUl
    calls on the RenderArray function with the array parameter: 'subMenu' in the objEle object, 
    and ul parameter: subMenuUl, which is a newly created ul. aka dropdown.
*/
    // if (typeof(objEle) === "string" || objEle.subMenu === undefined || objEle.subMenu.length === 0) return;
    if (typeof(objEle) === 'string' || objEle.subMenu === undefined) return;

    // alert(Array.isArray(objEle.subMenu));

    li.setAttribute("class", "subMenu hasSubMenu");
    var subMenuUL = CreateUl(null, "dropdown", li);
    RenderArray(objEle.subMenu, subMenuUL);
}
// ------------------- Render function end ------------------------


/*-----------------FUNCTION FOR LI AND UL ------------------*/

/**
 * Function named createLi that creates an li and sets the attribute id="" to the li that is made 
 * @param {string} objEle is the object element in the array aka [ { Element is inside } <-- obj ]
 * @param {Element} li HTML element that is created.
 * @returns {Element} HTML element li.  
 * */
function CreateLi(objEle) {
    var li = document.createElement("li");
    li.setAttribute("id", IDGenerator());
    if (typeof(objEle) === "string") {
        li.innerHTML = objEle;
    return li;
}
   
/** 
 * checks if objEle.subMenu is an array and that the objEle.subMenu.length is greater than or equal to 0
   set the attribute class="hasSubMenu". objEle is the li.
*/
    if (Array.isArray(objEle.subMenu) && objEle.subMenu.length >= 0 ) li.setAttribute("class", "hasSubMenu");
    /*get the String value inside the li pluss the li name or objEle.name*/
    li.innerHTML = (objEle.html !== undefined ? objEle.html : objEle.name);
        /*returns the li */
    return li;
}
/** 
 * This function creates an Ul and sets an id and or class if its not undefined or not null
   also check if parentElement is not undefined or not null, if its not then create
   a new ul appended to parentElement.

 * @param {String} id id of the ul if ul is not undefined or null.
 * @param {string} cl Class of the ul if ul is not undefined or null
 * @param {object} parentElement is a parant of the ul
 */
function CreateUl(id, cl, parentElement) {
    var ul = document.createElement("ul");
    if (id != undefined || id != null ) ul.setAttribute("id", id);
    if (cl != undefined || cl != null) ul.setAttribute("class", cl);
    if (parentElement != undefined || parentElement != null) parentElement.appendChild(ul);
    return ul;
}
/*-----------------FUNCTION FOR LI AND UL end ------------------*/
