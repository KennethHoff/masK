$(loginMenuBtn).on("click", loginMenu);
$(signUpMenuBtn).on("click", signUpMenu);

$(loginBtn).on("click", login)
$(getstartedBtn).on("click", signup)

function signUpMenu() {
    document.getElementById("login").style.display ="none";
    document.getElementById("signup").style.display="block";
    document.getElementById("signUp").classList.add("active");
    document.getElementById("logIn").classList.remove("active");
}

function loginMenu() {
    document.getElementById("signup").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("logIn").classList.add("active");
    document.getElementById("signUp").classList.remove("active");
}

function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var found = users.find(function(e) {
        return e.username === username && e.password === password;
    });
    if (found) {
        location.href = "../HTML/incubator.html";
    }
    else {
        alert("Wrong password or username");
    }
}
                   

function signup() {
    var signupFirstname = document.getElementById("signupFirstname").value;
    var signupLastname = document.getElementById("signupLastname").value;
    var signupUser = document.getElementById("signupUser").value;
    var signupPassword = document.getElementById("signupPassword").value;

    var name = signupFirstname + " " + signupLastname;
    var username = signupUser;
    var password = signupPassword;

    if (name.length     <= 1 || name     === undefined || name     === null) {
        alert("Name too short");
        return;
    }
    if (username.length <= 1 || username === undefined || username === null) {
        alert("Username too short");
        return;
    } 
    if (password.length <= 1 || password === undefined || password === null) {
        alert("Password too short");
        return;
    }

    let newUser = CreateAndPushUser(name, username, password);

    loginMenu();
    document.getElementById("username").value = username;
    
    // alert(newUser.name + "\n" + newUser.username);

    // location.href = "../HTML/incubator.html";
}

