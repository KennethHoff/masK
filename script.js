/*var element = document.getElementById("circlebtn", function(){
   div.classList.toggle("active");
}); */

// funksjon to add class to an element to make it show. 
// Its connected to circlebtn and boardwrapper.
// var boardWrapper = document.getElementById("boardWrapper");

// document.getElementById("circlebtn").addEventListener("click", function(){
//    var itemDiv = document.createElement("div");
//    itemDiv.classList.add("toggle-board");
//    boardWrapper.appendChild(itemDiv);
// });
(function(){
   var ul = CreateUl("navigator", null, parentElement = document.getElementById("sidebar"));

   memberList = [
      {
         name: "Filler"
         // subMenu: []
      },
      {
         name: "Member",
         subMenu: ["Kenneth", "asd", "asf", "basd"]
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
   function RenderArray(array, parentElement) {
      for (var i = 0; i < array.length; i++){
         RenderObject(array[i], ul);
      }
   }

   function RenderObject(objEle, ulElement){
      var li = createLi(objEle);
      ulElement.appendChild(li);

      if (typeof(objEle) === String || objEle.subMenu === undefined || objEle.subMenu.length === 0) return;
      console.log(objEle.name + " has submenu");
      var subMenuUL = CreateUl(null, null, li);
      RenderArray(objEle.subMenu, subMenuUL);
   }
})();

function createLi(objEle) {
   var li = document.createElement("li");
   li.setAttribute("class", "no");
   console.log("Name ? " + objEle.name);
   if (typeof(objEle) == String) {
      console.log("hallo?");
      li.innerHTML += objEle;
      return li;
   }

   if (Array.isArray(objEle.subMenu) && objEle.subMenu.length >= 0 ) li.setAttribute("class", "haveSubMenu");

   li.innerHTML += objEle.name;
      
   return li;
}

function CreateUl(id, cl, parentElement) {
   var ul = document.createElement("ul");
   if (id != undefined || id != null ) ul.setAttribute("id", id);
   if (cl != undefined || cl != null) ul.setAttribute("class", cl);
   if (parentElement != undefined || parentElement != null) parentElement.appendChild(ul);
   return ul;
}