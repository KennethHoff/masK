let boards = [
    // {
    //     id: 0,
    //     name: "Test Board",
    //     tasks: [1]
    // },
    // {
    //     id: 1,
    //     name: "Test Board 2",
    //     tasks: []
    // }
]

let tasks = [
    // {
    //     id: 1,
    //     name: "Test Task",
    //     status: "done", 
    //     description: "Description",
    //     creationDate: "1970-01-01",
    //     deadlineDate: "1970-01-01",
    //     completionDate: "1970-01-01"
    // }
]
function CreateNewBoard(_name) {
    var newBoard = {
        id: boards.length,
        name: _name,
        tasks: []
    }
    // console.log("New _board_ with id " + newBoard.id + " created with the name " + newBoard.name + (suppliedWithTasks ? (" With " + newB<oard.tasks.length+1 + " tasks.") : "."));
    // boards.push(newBoard);
    return newBoard;
}

function CreateNewTask(_name, _description, _deadlineDate) {
    if (_name == undefined) {
        return "Name not supplied!"
    }

    console.log("Desc:" + _description + "\nDeadline: " + _deadlineDate);

    let newTask = {
        id: tasks.length,
        name: _name,
        // if description is undefined, set it to "No description", otherwise set the input
        description: (_description == undefined ? "No description" : _description),
        // if deadline is undefined, set it to null, otherwise set the input
        deadlineDate: (_deadlineDate == undefined ? null : _deadlineDate),
        creationDate: new Date(),
        completionDate: null
    }
    return newTask;
    // console.log("New _task_ with id " + newTask.id + " created with the name " + newTask.name + " with the description: '" + newTask.description + "'\n" +
    // "The deadline is: " + newTask.deadlineDate + ", and the creation date is: " + newTask.creationDate + ", and the completion date (should not be set) is: " + newTask.completionDate);
}
function CreateAndPushBoard(_name) {
    var newBoard = CreateNewBoard(_name)
    boards.push(newBoard);
    return boards;
}

function CreateAndPushTask(_name, _description, _deadlineDate) {
    var newTask = CreateNewTask(_name, _description, _deadlineDate)
    tasks.push(newTask);
    return tasks;
}

function AddTaskToBoard(_taskInt, _boardInt) {
    var board = boards[_boardInt];
    board.tasks.push(_taskInt);
    var firstTask = tasks[board.tasks[0]];
    return firstTask;
}

// board:
// id = int,
// name = string,
// tasks (array) = "reference" id.

// tasks:
// id = int,
// name = string,
// status = string,
// creationDate = date,
// completionDate = date