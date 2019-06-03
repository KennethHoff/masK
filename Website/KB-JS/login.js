var signupBtn = document.getElementById("signupBtn");
var loginBtn = document.getElementById("loginBtn");


loginBtn.addEventListener('click', function(){
    document.getElementById("signup").style.display="none";
    document.getElementById("login").style.display="block";
    document.getElementById("logIn").classList.add("active");
    document.getElementById("signUp").classList.remove("active");
});

signupBtn.addEventListener('click', function(){
    document.getElementById("login").style.display ="none";
     document.getElementById("signup").style.display="block";
     document.getElementById("signUp").classList.add("active");
    document.getElementById("logIn").classList.remove("active");
    
})
