// What my comments mean:

// [???] Means it is temporary and/or needs to be rewritten (.. or I forgot to remove it :>)

let currentIndexForIDGenerator = 0;

///
LoadFromCookies();

/**
 * Array for all boards ("Incubator", "To Do" etc..)
 * @param {string} id random ID - never change it
 * @param {string} name What you see at the top of the board
 * @param {task[]} tasks All tasks assigned to this board
 */

let boards = [
    // {
    //     id: (random),
    //     name: "Test Board",
    //     tasks: []
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
 */
let tasks = [
    // {
    //     id: (random),
    //     name: "Test Task",
    //     description: "Description",
    //     users: [],
    //     creationDate: "1970-01-01",
    //     deadlineDate: "1970-01-01",
    //     completionDate: "1970-01-01"
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

/**
 * Creates a new Board and returns it. Will not push to an array.
 * @param {string} _name What the name of the board will be
 */
function CreateNewBoard(_name) {
    let newBoard = {
        id: IDGenerator(),
        name: _name,
        tasks: []
    };
    return newBoard;
}

/**
 * Creates a new board, pushes it to the array(and saves Cookies), and returns the board.
 * @param {string} _name What the name of the board will be
 */
function CreateAndPushBoard(_name) {
    if (_name == undefined) return null;
    let newBoard = CreateNewBoard(_name)
    PushGenericElementToGenericArray(boards, newBoard);
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

function DeleteBoard(board, reason) {
    RemoveGenericElementFromGenericArray(boards, board, reason);
}

/**
 * Creates a new task and returns it. Will not push to an array.
 * @param {string} _name What the name of the task will be
 * @param {string} _description What the description of the task will be
 * @param {Date} _deadlineDate What the deadline of the task will be
 */
function CreateNewTask(_name, _description, _deadlineDate) {
    var maxNameLength = 48;alert
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
        completionDate: null
    }
    return newTask;
}
/**
 * Creates a new task, pushes it to the array(and saves Cookies), and returns the task.
 * @param {string} _name What the name of the task will be
 * @param {string} _description What the description of the task will be
 * @param {Date} _deadlineDate What the deadline of the task will be
 */
function CreateAndPushTask(_name, _description, _deadlineDate) {
    if (_name == undefined) return null;
    
    let newTask = CreateNewTask(_name, _description, _deadlineDate)

    PushGenericElementToGenericArray(tasks, newTask);
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
 * @param {int} taskID The ID of the task you want to delete
 * @param {string} [reason] [Optional] The reason you wanted to delete it
 */
function DeleteTask(task, reason) {
    RemoveGenericElementFromGenericArray(tasks, task, reason);
}

/**
 * Creates a new user and returns it. Will not push it to an array.
 * @param {string} _name What the name of the user will be
 */
function CreateNewUser(_name) {
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
 */
function CreateAndPushUser(_name, _role) {
    if (_name == undefined) return null;

    let newUser = CreateNewUser(_name, _role);
    users.push(newUser);
}

function CreateNewRole(_name) {
    let newRole = {
        id: IDGenerator(),
        name: _name
    }
    return newRole;
}

function CreateAndPushRole(_name) {
    if (_name == undefined) return null;

    let newRole = CreateNewRole(_name);
    roles.push(newRole);
}

function AddTaskIDToBoard(task, board) {
        // If input is invalid, leave the function
    if (board == null || board == undefined) return null;
    if (task == null  || task == undefined)  return null;
    var id = task.id;
        // If task already exists inside board, leave the function
    if (board.tasks.includes(id)) return null;
    
        // If it passed every error check, then it can be pushed into the array.
    board.tasks.push(id);
}
function AddTaskIDToBoardViaBoardID(taskID, boardID) {
    var task  = GetTaskFromID(taskID);
    var board = GetBoardFromID(boardID);
    AddTaskIDToBoard(task, board);
}

function AddUserIDToTask(user, task) {

        // If input is invalid, leave the function
    if (user == null || user == undefined) return null;
    if (task == null || task == undefined) return null;
    var id = user.id;

        // If user already exists inside task, leave the function
    if (task.users.includes(id)) return null;

        // If it passed every error check, then it can be pushed into the array.
    task.users.push(id);
}
function AddUserIDToTaskViaTaskID(userID, taskID) {
    var user = GetUserFromID(userID);
    var task = GetTaskFromID(taskID);
    AddUserIDToTask(user, task);
}

function AddRoleIDToUser(role, user) {

        // If input is invalid, leave the function
    if (role == null || role == undefined) return null;
    if (user == null || user == undefined) return null;
    var id = role.id;

        // If role already exists inside user, leave the function
    if (user.roles.includes(id)) return null;

        // If it passed every error check, then it can be pushed into the array.
    user.roles.push(id);
}
function AddRoleIDToUserViaUserID(roleID, userID) {
    var role = GetRoleFromId(roleID);
    var user = GetUserFromID(userID);
    AddRoleIDToUser(role, user);
}

    // Input any array and any element and the element will be pushed into the array, as well as save *all* cookies.
    // Not very performant, but it's _fine_ for now

/**
 * @param {array} arr An array object (Array.IsArray())
 * @param {int} ele the ID of the element (arr[?].id)
 * @param {string} [reason] an optional variable to show the reason it was deleted
 */
function PushGenericElementToGenericArray(arr, ele) {
    arr.push(ele);
    SaveAllToCookies();
}
/**
 * @param {[]} arr An array object (Array.IsArray())
 * @param {object} ele the element (arr[?])
 * @param {string} [reason] an optional variable to show the reason it was deleted
 */
function RemoveGenericElementFromGenericArray(arr, ele, reason) {

    // if the reason parameter is not given, then set the reason to be "No Reason Given"
    // [???] Currently not being used
    if (reason === undefined) reason = "No reason given";

    // Check where in the array(ie. the index) the element is
    var index = arr.findIndex(ele);

    // If the task does not exist within the array (Which means the indexOf function returns -1)
    if (index === -1) {
        // send a message that the task does not exist and return out of the function.
        console.warn("Cannot delete Element: It does not exist");
        return;
    }
    arr.splice(index, 1);
    SaveAllToCookies();
}
function CheckIfArrayAlreadyIncludesName(array, name) {
    return array.find(function(e) {return e.name == name});
}

/**
 * 
 * @param {array} arr An array object (Array.IsArray());
 * @param {int} id the ID of the element (arr[?].id)
 */
function GetGenericArrayElementFromID(arr, id) {
    return array.find(function (e) { return e.id == id });
}

function GetBoardFromID(id) {
    return GetGenericArrayElementFromID(boards, id);
}
function GetTaskFromID(id) {
    return GetGenericArrayElementFromID(tasks, id);
}
function GetUserFromID(id) {
    return GetGenericArrayElementFromID(users, id);
}
function GetRoleFromId(id) {
    return GetGenericArrayElementFromID(roles, id);
}

// Save all to cookies that will delete itself after 7 days. (You're welcome, sensor ;) )
function SaveAllToCookies() {
    Cookies.set("Boards", boards, {expires: 7});
    Cookies.set("Tasks",  tasks , {expires: 7});
    Cookies.set("Users",  users , {expires: 7});
    Cookies.set("Roles",  roles , {expires: 7});
}


// Loads all cookies related to this website
function LoadFromCookies() {
    Cookies.get();
}

// var id = IDGenerator();
function IDGenerator() {
    return currentIndexForIDGenerator++;
}

function Test() {
    CreateAndPushBoard("Dette er et Board");
    CreateAndPushTask( "Dette er en Task");
    CreateAndPushUser( "Dette er en User");
    CreateAndPushRole( "Dette er en Role");

    AddTaskIDToBoardViaBoardID(tasks[0].id, boards[0].id);
    AddUserIDToTaskViaTaskID( users[0].id, tasks[0].id);
    AddRoleIDToUserViaUserID( roles[0].id, users[0].id);
}