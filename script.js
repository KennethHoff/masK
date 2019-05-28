(function(){
   var ul = CreateUl("navigator", null, parentElement = document.getElementById("sidebar"));

   memberList = [
      {
         name: "Filler"
         // subMenu: []
      },
      {
         name: "Member",
         subMenu: ["Kenneth", "asd", "asf", "basd"],
         subMenu2: ["cal", "cal", "cal", "cal"]
      },
      {
         name: "Filler"
         // subMenu: []
      },
      {
         name: "Filler"
         // subMenu: []
      },
      {
         name: "Filler"
         // submenu: []
      }];

   // document.getElementById("sidebar").appendChild(ul);
   RenderMemberList();

   function RenderMemberList() {
      RenderArray(memberList, ul);
    }
   function RenderArray(array) {
      for (var i = 0; i < array.length; i++){
         RenderObject(array[i], ul);
      }
   }
/*A function that render an object, in this case objEle = li and ulElement
also saves the function createLi(objEle) which creates an Li to the variable Li
and adds or create the Li under ul element navigator.  */
   function RenderObject(objEle, ulElement){
      var li = createLi(objEle);
      ulElement.appendChild(li);

/* Checks if the type of objEle === string or .subMenu === undefined or objEle.subMenu.length === 0 if it is return 0 or undefined or string
signs the CreateUl(null, null, li) function to the variable subMenuUl
calls on the RenderArray function and loops through the objEle, subMenu, subMenuUl to create it.
*/
      if (typeof(objEle) === String || objEle.subMenu === undefined || objEle.subMenu.length === 0) return;
      console.log(objEle.name + " have sub menu");
      var subMenuUL = CreateUl(null, null, li);
      RenderArray(objEle.subMenu, subMenuUL);
   }
})();
/*Function named createLi that creates an li and sets the attribute class="" to the li that is made */
function createLi(objEle) {
   var li = document.createElement("li");
   li.setAttribute("class", "test");
   console.log("Name ? " + objEle.name);
   if (typeof(objEle) == String) {
      console.log("hallo?");
      li.innerHTML += objEle;
      return li;
   }
/* checks if objEle.subMenu is an array and that the objEle.subMenu.length is greater than or equal to 0
set the attribute class="haveSubMenu". objEle is the li. */
   if (Array.isArray(objEle.subMenu) && objEle.subMenu.length >= 0 ) li.setAttribute("class", "haveSubMenu");
/*get the String value inside the li pluss the li name or objEle.name*/
   li.innerHTML += objEle.name;
      /*returns the li */
   return li;
}
/*This function creates an Ul and sets an id and or class if its not undefined or not null
also check if parentElement = sidebar is not undefined or not null, if its not then add or create
ul under parentElement. 
*/
function CreateUl(id, cl, parentElement) {
   var ul = document.createElement("ul");
   if (id != undefined || id != null ) ul.setAttribute("id", id);
   if (cl != undefined || cl != null) ul.setAttribute("class", cl);
   if (parentElement != undefined || parentElement != null) parentElement.appendChild(ul);
   return ul;
}

var nav = document.getElementById("navigator");

for(var ul of memberList){
   var li = document.createElement("li");
   li.classList.add("hasSub")
   nav.appendChild(li);

   var navi = document.createElement("ul");
   li.appendChild(navi);

   for(var secoundUl of memberList){
      var secoundLi = document.createElement("li");
      secoundLi.classList.add("subMenu");
      navi.appendChild(secoundLi);
   }
}