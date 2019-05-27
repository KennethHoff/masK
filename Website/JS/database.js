let currentIndexForAssignment = 0;

// TODO: Currently all arrays share the same ID generator (which is good).
// This makes it somewhat difficult to get a specific element of a type. (Let's say the 2nd created user).
// I haven't gotten to utilizing these elements, so it's possible that this is not relevant, or that I'm not thinking straight...

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
    //     users: []
    //     creationDate: "1970-01-01",
    //     deadlineDate: "1970-01-01",
    //     completionDate: "1970-01-01"
    // }
]

let users = [
    // {
    //     id: 5,
    //     name: "Test Name",
    //     roles: [],
    // }
]

let roles = [
    // {
    //     id: 1,
    //     name: "Test Role",
    // }
]


function CreateNewBoard(_name) {
    let newBoard = {
        id: IndexGenerator(),
        name: _name,
        tasks: []
    }
    return newBoard;
}
function CreateAndPushBoard(_name) {
    if (_name == undefined) return null;

    let newBoard = CreateNewBoard(_name)
    boards.push(newBoard);
}

function CreateNewTask(_name, _description, _deadlineDate) {
    let newTask = {
        id: IndexGenerator(),
        name: _name,
        // if description is undefined, set it to "No description", otherwise set it to the input
        description: (_description == undefined ? "No description" : _description),
        users: [],
        // if deadline is undefined, set it to null, otherwise set it to the input
        deadlineDate: (_deadlineDate == undefined ? null : _deadlineDate),
        creationDate: new Date(),
        completionDate: null
    }
    return newTask;
}
function CreateAndPushTask(_name, _description, _deadlineDate) {
    if (_name == undefined) return null;
    
    let newTask = CreateNewTask(_name, _description, _deadlineDate)

    tasks.push(newTask);
}

function CreateNewUser(_name) {
    let newUser = {
        id: IndexGenerator(),
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
        id: IndexGenerator(),
        name: _name
    }
    return newRole;
}

function CreateAndPushRole(_name) {
    if (_name == undefined) return null;

    let newRole = CreateNewRole(_name);
    roles.push(newRole);
}

function AddTaskToBoard(_taskInt, _boardInt) {
    var board = boards[_boardInt];

        // If input is invalid, leave the function
    if (board == null || board == undefined) return null;
        // If task already exists inside board, leave the function
    if (board.tasks.includes(_taskInt)) return null;
    
    board.tasks.push(_taskInt);
}

function AddUserToTask(_userInt, _taskInt) {
    var user = users[_userInt];
    var task = tasks[_taskInt];

    // If input is invalid, leave the function
    if ( (user == null || user == undefined) || (task == null || task == undefined) ) return null;
    // If user already exists inside task, leave the function
    if (task.users.includes(_userInt)) return null;

    task.users.push(_userInt);
}

function AddRoleToUser(_roleInt, _userInt) {
    var role = roles[_roleInt];
    var user = users[_userInt];

    if ( (role == null || role == undefined) || (user == null || user == undefined) ) return null;

    if (user.roles.includes(_roleInt)) return null;

    user.roles.push(_roleInt);
}

function IndexGenerator() {
    var tempIndex = currentIndexForAssignment++;
    return tempIndex;
}

function Test() {
    CreateAndPushBoard("Dette er et Board");
    CreateAndPushTask("Dette er en Task");
    CreateAndPushUser("Dette er en User");
    CreateAndPushRole("Dette er en Role");
    AddTaskToBoard(0,0);
    AddUserToTask(0,0);
    AddRoleToUser(0,0);


    var testBoardInt = 0;
    var testTaskInt  = 0;
    var testUserInt  = 0;
    var testRoleInt  = 0;

    return roles[ users[ tasks[ boards[testBoardInt].tasks[testTaskInt] ].users[testUserInt] ].roles[testRoleInt] ];
}

// To access a list of all roles from a  user from a task inside a specific board:
// users[ tasks[ boards['board int'].tasks['task int'] ].users['user int'] ];