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
    location.href = "../HTML/incubator.html";
}

function signup() {
    location.href = "../HTML/incubator.html";
}