// What my comments mean / other information relevant to my code:


// I will sometimes (Only in the documentation) use {board}, or {task} etc.. 
// I know these are not actually valid types (Because I know javascript doesn't really "do types" that way.
// I do it because I feel it's more readable this way)


// I use a "_" before a parameter if the 'name' of the parameter is the same as an attribute I set. This is mostly for readability purposes.
// Example: function CreateUser(_name) [...] user.name = _name;


// If there are some weird things where the naming makes absolutely no sense and it says *..let..* where it clearly should say *..var..* (like for example "letiables" instead of "variables") that was because I changed all my 'var' into 'let' halfway into the project.


// [???] Means it is temporary and/or needs to be rewritten (.. or I forgot to remove it :>)


// Some 'less than ideal' things:
// When you delete something (eg. Task) it will not be removed from its respective 'parent' array (eg. Board). so:
// Create Task > Add Task.id to Board "tasks" array > Delete Task > board "tasks" array still has the .id value.
// This is an incredibly minor thing, so I don't think I will bother working on it.


// in the JSDoc I almost exclusively use @param, and that is mostly because I'm new to it and don't know the letious syntax.
// Also, the documentation for JSDoc was unavailable at the time.
// The URL was changed from usejsdoc.org => jsdoc.app, but no redirecting was available, and the change was very recent)

let currentIndexForIDGenerator = 0;
/**
 * Which board to put new tasks into if you don't specify
 * 
 * The default is the "To Do" board
 */
let defaultBoard;
let incubatorBoard;

/**
 * @description Array for all boards ("Incubator", "To Do" etc..)
 * @param {string} id random ID - never change it
 * @param {string} name What you see at the top of the board
 * @param {task[]} tasks All tasks assigned to this board
 * @param {Number} pageOrder Which order the board is relative to other boards (Lower comes earliest) [For things like the Main Page]
 */

let boards = [
    // {
    //     id: (random),
    //     name: "Test Board",
    //     tasks: [],
    //     pageOrder: Number
    // }
];

/**
 * Array (of objects) for all tasks ("Finish the exam", "Write this documentation", etc..)
 * Object includes:
 * @param {string} id random ID - never change it
 * @param {string} name What you see on the notes
 * @param {string} description Longer description - what you see when you click on a note
 * @param {user[]} users All users assigned to this task
 * @param {Date} creationDate When this task was created. Automatically set when you create it - never change it
 * @param {Date} completionDate When this task was completed
 * @param {Number} boardOrder // Where, relative to other tasks, it sits on the board [If the board supports it - main page mostly] (if same number (which should never happen), be based on ID)
 * @param {{x: Number, y: Number}} boardPosition // Where on the board it sits [If the board supports it - incubator mostly]
 */
let tasks = [
    // {
    //     id: (random),
    //     name: "Test Task",
    //     description: "Description",
    //     users: [],
    //     creationDate: "1970-01-01",
    //     deadlineDate: "1970-01-01",
    //     completionDate: "1970-01-01",
    //     boardOrder: Number,
    //     boardPosition: {x: Number, y: Number}
    // }
];
/**
 * Array for all users ("Kenneth Hoff", "Andreas S Saxvik", etc..)
 * @param {string} id random ID - never change it
 * @param {string} name What you see
 * @param {boolean} visibleInSidebar Whether or not this is displayed in the sidebar
 * @param {role[]} roles All roles assigned to this user
 */
let users = [
    // {
    //     id: (random),
    //     name: "Test Name",
    //     visibleInSidebar,
    //     roles: [],
    // }
];
/**
 * Array for all roles ("Front-End", "Database Engineer", etc..)
 * @param {string} id random ID - never change it
 * @param {string} name What you see
 */
let roles = [
    // {
    //     id: (random),
    //     name: "Test Role",
    // }
];


/* --- Object Manipulation START --- */

/* --------- BOARD START -------- */

/**
 * Creates a new Board and returns it. Will not push to an array.
 * @param {string} _name What the name of the board will be
 * @returns {board} returns the board object (id, name, tasks[])
 */
function CreateBoard(_name) {
    if (_name == undefined) return null;
    let newBoard = {
        id: IDGenerator(),
        name: _name,
        tasks: [],
        pageOrder: 0
    };
    return newBoard;
}

/**
 * Creates a new board, pushes it to the array(and saves Cookies), and returns the board.
 * @param {string} _name What the name of the board will be
 * @returns {board} returns the board object (id, name, tasks[])
 */
function CreateAndPushBoard(_name) {
    let tempBoard = CreateBoard(_name)
    let newBoard = PushGenericElementToArray(boards, tempBoard);
    return newBoard;
}
/**
 * Updates the value of an existing board
 * @param {board} board A board object
 * @param {string} _name The new name of the board
 */
function UpdateBoard(board, _name) {
    board.name = name;
}
/**
 * Deletes the board from the boards array.
 * @param {board} board 
 * @param {string} [reason] [Optional] The reason it was deleted.
 */
function DeleteBoard(board, reason) {
    RemoveGenericElementIDFromArray(boards, board.ID, reason);
}



/* --------- BOARD END -------- */
/* --------- TASK START -------- */




/**
 * Creates a new task and returns it. Will not push to an array.
 * @param {string} _name What the name of the task will be
 * @param {string} _description What the description of the task will be
 * @param {Date} _deadlineDate What the deadline of the task will be
 * @returns {task} returns the task object (id, name, description, user[], deadlineDate, creationDate, completionDate)
 */
function CreateTask(_name, _description, _deadlineDate) {
    if (_name == undefined) return null;
    let maxNameLength = 48;
    // if (_name.length >= maxNameLength) window.alert("Name length >= " + maxNameLength);
    _name = _name.slice(0, maxNameLength);
    let newTask = {
        id: IDGenerator(),
        name: _name,
        // if description is undefined, set it to "No description", otherwise set it to the input
        description: (_description == undefined ? "No description" : _description),
        users: [],
        // if deadline is undefined, set it to null, otherwise set it to the input
        deadlineDate: (_deadlineDate == undefined ? null : _deadlineDate),
        // Sets it to the current date as of creation
        creationDate: new Date(),
        completionDate: null,
        // Where, relative to other tasks, it sits on the board [If the board supports it - main page mostly] (if same number (which should never happen), be based on ID)
        boardOrder: 0,
        // Where on the board it sits [If the board supports it - incubator mostly]
        boardPosition: {left: 0, top: 0}

    }
    return newTask;
}
/**
 * Creates a new task, pushes it to the array(and saves Cookies), and returns the task.
 * @param {string} _name What the name of the task will be
 * @param {string} _description What the description of the task will be
 * @param {Date} _deadlineDate What the deadline of the task will be
 * @returns {task} returns the task object (id, name, description, user[], deadlineDate, creationDate, completionDate)
 */
function CreateAndPushTask(_name, _description, _deadlineDate) {
    let tempTask = CreateTask(_name, _description, _deadlineDate)
    let newTask = PushGenericElementToArray(tasks, tempTask);
    return newTask;
}
/**
 * Updates the values of an existing task
 * @param {task} task A task object
 * @param {string} [newName] [Optional] The new name of the task
 * @param {string} [newDescription] [Optional] The new description of the task
 * @param {Date} [newDeadline] [Optional] The new deadline of the task
 */
function UpdateTask(task, newName, newDescription, newDeadline) {
    task.name = newName;
    task.description = newDescription;
    task.deadlineDate = newDeadline;
}

/**
 * Deletes a task from the tasks array, given an ID
 * @param {task} task The task you want to delete
 * @param {string} [reason] [Optional] The reason it was deleted
 */
function DeleteTask(task, reason) {
    RemoveGenericElementIDFromArray(tasks, task.ID, reason);
}


/* --------- TASK END -------- */
/* --------- USER START -------- */



/**
 * Creates a new user and returns it. Will not push it to an array.
 * @param {string} _name What the name of the user will be
 * @returns {user} returns the user object (id, name, role[])
 */
function CreateUser(_name) {
    if (_name == undefined) return null;
    let newUser = {
        id: IDGenerator(),
        name: _name,
        roles: [],
    }
    console.log("New user created: " + newUser.name);
    return newUser;
}
/**
 * Creates a new user, pushes it to the array(and saves Cookies), and returns the user.
 * @param {string} _name What the name of the user will be
 * @returns {user} returns the user object (id, name, role[])
 */
function CreateAndPushUser(_name, _role) {
    let tempUser = CreateUser(_name, _role);
    let newUser = PushGenericElementToArray(users, tempUser);
    return newUser;
}
/**
 * Update the values of an existing user
 * @param {user} user The user you want to update
 * @param {string} newName The new name of the user
 */
function UpdateUser(user, newName) {
    user.name = newName;
}

/**
 * 
 * @param {user} user Which user to delete
 * @param {string} user.name name of the user
 * @param {string} [reason] the reason it was deleted
 */
function DeleteUser(user, reason) {
    RemoveGenericElementIDFromArray(users, user.ID, reason);
}


/* --------- USER END -------- */
/* --------- ROLE START -------- */



/**
 * Creates a new role and returns it. Will not push it to an array.
 * @param {string} _name What the name of the role will be
 * @returns {role} returns the role object (id, name)
 */
function CreateRole(_name) {
    if (_name == undefined) return null;
    let newRole = {
        id: IDGenerator(),
        name: _name
    }
    return newRole;
}

/**
 * Creates a new role, pushes it to an array (and saves Cookies), and returns the role.
 * @param {string} _name What the name of the role will be
 * @returns {role} returns the role object (id, name)
 */
function CreateAndPushRole(_name) {
    let tempRole = CreateRole(_name);
    let newRole = PushGenericElementToArray(roles, tempRole);
    return newRole;
}
/**
 * 
 * @param {role} role The role you want to update
 * @param {string} _name The new name of the role
 */
function UpdateRole(role, _name) {
    role.name = _name;
}

function DeleteRole(role, reason) {
    RemoveGenericElementIDFromArray(roles, role.ID, reason);
}

/* --------- USER END -------- */

/* --- Object Manipulation END --- */

/* --- Array manipulation START --- */


/* --------- TASK START -------- */

/**
 * Adds a given task (in the form of its ID) to a board
 * @param {Number} taskID the ID of a task
 * @param {board} board Which board you want the task to be pushed into
 */
function AddTaskIDToBoard(taskID, board) {
        // If input is invalid, leave the function
    if (board == null || board == undefined) return null;

    // If task already exists inside board, leave the function
    if (board.tasks.includes(taskID)) return null;
    
        // If it passed every error check, then it can be pushed into the array.
    board.tasks.push(taskID);
}

function MoveTaskFromOneBoardToAnother(oldBoard, newBoard, taskID) {
    MoveGenericElementFromOneArrayToAnother(oldBoard.tasks, newBoard.tasks, taskID);
}

/* --------- TASK END -------- */
/* --------- USER START -------- */

/**
 * Adds a given user (in the form of its ID) to a task 
 * @param {Number} userID the ID of a user
 * @param {task} task Which task you want the user to be pushed into
 */
function AddUserIDToTask(userID, task) {

        // If input is invalid, leave the function
    if (task == null || task == undefined) return null;
        // If user already exists inside task, leave the function
    if (task.users.includes(userID)) return null;

        // If it passed every error check, then it can be pushed into the array.
    task.users.push(userID);
}

/**
 * Don't know why this function would ever be used, but good to have, I guess
 */
function MoveUserFromOneTaskToAnother(oldTask, newTask, userID) {
    MoveGenericElementFromOneArrayToAnother(oldTask.users, newTask.users, userID);
}


/* --------- USER END -------- */
/* --------- ROLE START -------- */

/**
 * Adds a given role (in the form of its ID) to a user
 * @param {Number} roleID the ID of a role
 * @param {user} user which user you want the role to be pushed into
 */
function AddRoleIDToUser(roleID, user) {

        // If input is invalid, leave the function
    if (user == null || user == undefined) return null;

        // If role already exists inside user, leave the function
    if (user.roles.includes(roleID)) return null;

        // If it passed every error check, then it can be pushed into the array.
    user.roles.push(roleID);
}

/**
 * Don't know why this function would ever be used, but good to have, I guess
 */
function MoveRoleFromOneUserToAnother(oldUser, newUser, roleID) {
    MoveGenericElementFromOneArrayToAnother(oldUser.roles, newUser.roles, roleID);
}

/**
 * Input any array and any element and the element will be pushed into the array
 * @param {array} arr An array object (Array.IsArray())
 * @param {(Object|number)} ele the element (arr[?]) *or* the ID
 * @param {string} [reason] [Optional] The reason it was deleted
 */
function PushGenericElementToArray(arr, ele) {

    let returnEle, found

    if (typeof(ele) === typeof(1)) {
        found = arr.find(function(e) {
            let same = e === ele;
            if (same) return e;
            return false;
        })
    }
    else {

        // returns the element if it exists, false if element does not exist, or undefined is array is empty. #JustJavascriptThings
        found = arr.find(function (e) {
            let sameID = e.id === ele.id;
            let sameName = e.name === ele.name;
            if (sameID || sameName) return e;
            return false;
        });
    }

    if (found === false || found === undefined) {
        arr.push(ele);
        returnEle = ele;
    }
    else {
        returnEle = found;
    }
    return returnEle;





    // let newEle;

    // if (ele === null || ele === undefined) return false;

    // // If the name of the element already exists, return that existing element instead

    // var foundEle = arr.find( function(e) {
    //     let sameID = e.id === ele.id;
    //     let sameName = e.name === ele.name;

    //     if (sameID || sameName) return true;
    //     return false;
    // });


    // if (foundEle === null || foundEle === undefined) {
    //     newEle = ele;
    //     arr.push(newEle);
    // }
    // else {
    //     newEle = foundEle;

    //         // I was thinking of doing this, but I figured it's completely unnecessary. 
    //         // "Oh no, an integer increased by 4 when it didn't have to!"
    //         // The pros (more consistent IDs) does not outweigh the cons (potential of two things with same ID)
    //     // currentIndexForIDGenerator--; 
    // }
    // return newEle;

}
/**
 * @param {[]} arr An array object (Array.IsArray())
 * @param {number} eleID the element (arr[?])
 * @param {string} [reason] an optional variable to show the reason it was deleted
 */
function RemoveGenericElementIDFromArray(arr, eleID, reason) {

    if (eleID === null || eleID === undefined) return false;

    let index;

    // if the reason parameter is not given, then set the reason to be "No Reason Given"
    // [???] Currently not being used
    if (reason === undefined) reason = "No reason given";

        // Check where in the array(ie. the index) the element is
    index = arr.findIndex(function (e) {
        console.log("Looking for ID: " + eleID + ". Found: " + e.id);
        return e === eleID;
    });


    // If the task does not exist within the array (Which means the indexOf function returns -1)
    if (index === -1) {
        // send a message that the task does not exist and return out of the function.
        console.warn("Cannot delete Element: It does not exist");
        return false;
    }

    arr.splice(index, 1);
    return true;
}

/**
 * Moves an element from one array to another
 * @param {[*]} fromArr Which array to move element from
 * @param {[*]} toArr Which array to move element to
 * @param {*} ele Which element to move
 * @param {string} [reason] Why you want to move it 
 */
function MoveGenericElementFromOneArrayToAnother(fromArr, toArr, eleID, reason) {

    if (reason === undefined) reason = "No reason given";

        // If you were to able to remove, push it to another, otherwise don't even bother trying.
    if (RemoveGenericElementIDFromArray(fromArr, eleID, reason)) {
        PushGenericElementToArray(toArr, eleID, reason);
    }
}

/**
 * 
 * @param {array} arr An array object (Array.IsArray());
 * @param {Number} id the ID of the element (arr[?].id)
 */
function GetGenericArrayElementFromID(arr, id) {
    return arr.find(function (e) { return e.id == id });
}


/**
 * @param {Number} id the ID of the board
 * @returns {board} The board element
 */
function GetBoardFromID(id) {
    return GetGenericArrayElementFromID(boards, id);
}
/**
 * @param {Number} id the ID of the task
 * @returns {task} The task element
 */
function GetTaskFromID(id) {
    return GetGenericArrayElementFromID(tasks, id);
}
/**
 * @param {Number} id the ID of the user
 * @returns {user} The user element
 */
function GetUserFromID(id) {
    return GetGenericArrayElementFromID(users, id);
}
/**
 * @param {Number} id the ID of the role
 * @returns {role} The role element
 */
function GetRoleFromId(id) {
    return GetGenericArrayElementFromID(roles, id);
}


function CreateDefaultBoards() {
    var newIncubatorBoard = CreateAndPushBoard("Incubator");
    var newTodoBoard = CreateAndPushBoard("ToDo");
    var newInProgressBoard = CreateAndPushBoard("InProgress");
    var newCompletedBoard = CreateAndPushBoard("Completed");

    incubatorBoard = newIncubatorBoard;
    defaultBoard = newTodoBoard;

}


/* --- Array Manipulation END --- */


/* ------- Cookies START ------- */
/**
 * Save all to cookies that will delete itself after 7 days. (You're welcome, sensor ;) )
 */
function SaveAllToCookies() {
    Cookies.set("Boards", boards, {expires: 7});
    Cookies.set("Tasks",  tasks , {expires: 7});
    Cookies.set("Users",  users , {expires: 7});
    Cookies.set("Roles",  roles , {expires: 7});
    Cookies.set("currentIndexForIDGenerator", currentIndexForIDGenerator, {expires: 7});
}



/**
 * Loads all cookies related to this website, and parse them as JSON.Parse would (ie. turn them back into Arrays)
 */
function LoadFromCookies() {
    // console.log(Cookies.get("Boards"));
    let tempBoards = Cookies.getJSON("Boards");
    let tempTasks = Cookies.getJSON("Tasks");
    let tempUsers = Cookies.getJSON("Users");
    let tempRoles = Cookies.getJSON("Roles");
    boards = (tempBoards === undefined ? [] : tempBoards );
    tasks = (tempTasks === undefined ? [] : tempTasks);
    users = (tempUsers === undefined ? [] : tempUsers);
    roles = (tempRoles === undefined ? [] : tempRoles);

    let tempIndex = Cookies.getJSON("currentIndexForIDGenerator");
    currentIndexForIDGenerator = (tempIndex >= 0 ? tempIndex : 0);
}


// Just before the page unloads, save all information to cookies.
$(window).on("beforeunload", function () {
    SaveAllToCookies();
});


LoadFromCookies();
CreateDefaultBoards();


/* ------- Cookies END ------- */

/**
 * Gives you the next ID, then increments the value
 */
function IDGenerator() {
    return currentIndexForIDGenerator++;
}

function Test() {
    MoveTaskFromOneBoardToAnother(incubatorBoard, defaultBoard, incubatorBoard.tasks[incubatorBoard.tasks.length-1]);
}