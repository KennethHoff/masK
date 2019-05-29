let currentIndexForIDGenerator = 0;

// TODO: Currently all arrays share the same ID generator (which is good).
// This makes it somewhat difficult to get a specific element of a type. (Let's say the 2nd created user).
// I haven't gotten to utilizing these elements, so it's possible that this is not relevant, or that I'm not thinking straight...


/* What is this?
- Boards ("To Do", "Finished", "Under Review" etc..)
- Tasks ("Create this changelog", "Create Pull Request", "Finish Coding for the day" etc..)
- Users ("Kenneth Hoff", "Kristoffer Opdahl" etc...)
- Roles ("Senior Game Designer", "Front-End" etc...)
 */ 



let boards = [
    // {
    //     id: 0,
    //     name: "Test Board",
    //     tasks: []
    // }
]

let tasks = [
    // {
    //     id: 1,
    //     name: "Test Task",
    //     description: "Description",
    //     status: "done",
    //     users: [],
    //     creationDate: "1970-01-01",
    //     deadlineDate: "1970-01-01",
    //     completionDate: "1970-01-01"
    // }
]

let users = [
    // {
    //     id: 5,
    //     name: "Test Name",
    //     visibleInDropdown,
    //     roles: [],
    // }
]

// foreach (user in users) {
//     if (user.visibleInDropdown) {
//     //Add To Dropdown
//     }
// }

let roles = [
    // {
    //     id: 1,
    //     name: "Test Role",
    // }
]


function CreateNewBoard(_name) {
    let newBoard = {
        id: IDGenerator(),
        name: _name,
        tasks: []
    }
    return newBoard;
}
function CreateAndPushBoard(_name) {
    if (_name == undefined) return null;

    let newBoard = CreateNewBoard(_name)
    boards.push(newBoard);
    return newBoard;
}

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
function CreateAndPushTask(_name, _description, _deadlineDate) {
    if (_name == undefined) return null;
    
    let newTask = CreateNewTask(_name, _description, _deadlineDate)

    tasks.push(newTask);
    return newTask;
}

function CreateNewUser(_name) {
    let newUser = {
        id: IDGenerator(),
        name: _name,
        roles: [],
    }
    return newUser;
}
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


function GetBoardFromID(id) {
    return boards.find(function(e) { return e.id == id});
}
function GetTaskFromID(id) {
    return tasks.find(function(e) { return e.id == id});
}
function GetUserFromID(id) {
    return users.find(function(e) { return e.id == id});
}
function GetRoleFromId(id) {
    return roles.find(function(e) { return e.id == id});
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