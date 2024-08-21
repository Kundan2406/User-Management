// DOM 

document.addEventListener("DOMContentLoaded", () => {

  // for Logout
  const logoutButton = document.getElementById("logout");

  if (logoutButton) {
     logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedin");
        window.location.href = "/";

        const loggedInUser = JSON.parse(localStorage.getItem("loggedin"));

        const newParagraph = document.createElement('p');

        newParagraph.textContent = "You Have Been Logged Out";
        if (!loggedInUser) {
           document.body.appendChild(newParagraph);
        }

     });
  }


  const loggedInUser = JSON.parse(localStorage.getItem("loggedin"));

  if (loggedInUser && window.location.pathname == "/login.html") {
     window.location.href = "userlist.html";
  }
  if (loggedInUser && window.location.pathname == "/register.html") {
     window.location.href = "userlist.html";
  }
  if (loggedInUser && window.location.pathname == "/welcome.html") {
     window.location.href = "userlist.html";
  }

  if (!loggedInUser && window.location.pathname == "/userlist.html") {
     window.location.href = "welcome.html";
  }
  if (!loggedInUser && window.location.pathname == "/chatlist.html") {
     window.location.href = "welcome.html";
  }
  if (!loggedInUser && window.location.pathname == "/document.html") {
     window.location.href = "welcome.html";
  }
  if (!loggedInUser && window.location.pathname == "/edituser.html") {
     window.location.href = "welcome.html";
  }
  if (!loggedInUser && window.location.pathname == "/loginSuccess.html") {
     window.location.href = "welcome.html";
  }

});

// DOM

// ----------------------------- email validation regex starts -----------------------------------

var usernameregex = /^[a-zA-Z-. ]*$/;

function IsEmail(email) {

  let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!regex.test(email)) {
     return false;
  } else {
     return true;
  }
}

// ----------------------------- email validation regex starts -----------------------------------

// ----------------------------- user register validation starts -----------------------------------

let getemail = JSON.parse(localStorage.getItem("users"));

function registerValidate() {


  let fullname = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (fullname == "") {
     alert("Please enter Username");
     return false;
  } else if (usernameregex.test(fullname) == false) {
     alert("Please enter valid Username");
     return false;
  } else if (email == '') {
     alert("Please enter Email");
     return false;
  } else if (IsEmail(email) == false) {
     alert("Please enter valid Email Id");
     return false;
  } else if (password == "") {
     alert("Please enter Password");
     return false;
  } else if (confirmPassword == "") {
     alert("Please enter confirm Password");
     return false;
  } else if (password.length < 7) {
     alert("Password length should be minimum 8 characters");
     return false;
  } else if (confirmPassword.length < 7) {
     alert("Confirm Password length should be minimum 8 characters");
     return false;
  } else if (password != confirmPassword) {
     alert("Password and Confirm Password does not match");
     return false;
  } else if (email != '' && getemail == '') {

     for (let i = 0; i < getemail.length; i++) {

        if (getemail[i].email == email) {
           alert("Email already exists.... Please enter new Email");
           $('#email').focus();
           return false;
        }

     }

  } else {

     let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

     let user = {
        id: Number(new Date()),
        fullname: fullname,
        email: email,
        password: password,
        confirmPassword: confirmPassword
     };

     users.push(user);
     localStorage.setItem("users", JSON.stringify(users));
     return true;
  }


}

// ----------------------------- user register validation ends -----------------------------------

// ----------------------------- user login validation starts -----------------------------------

function loginValidate() {
  let loginEmail = document.getElementById("login_email").value;
  let loginPassword = document.getElementById("login_password").value;

  if (loginEmail == "") {
     alert("Please enter Email id");
     return false;
  } else if (IsEmail(loginEmail) == false) {
     alert("Please enter valid Email Id");
     return false;
  } else if (loginPassword == "") {
     alert("Please enter Password");
     return false;
  } else if (loginPassword.length < 7) {
     alert("Password length should be minimum 8 characters");
     return false;
  } else {

     if (loginEmail != '' && loginPassword != '') {

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find((user) => user.email === loginEmail && user.password === loginPassword);

        if (user) {
           const loggeininfo = [{
              loginId: user.id,
              loginName: user.fullname
           }];
           localStorage.setItem("loggedin", JSON.stringify(loggeininfo));
           window.location.href = "loginSuccess.html";
        } else {
           alert("Wrong Email or Password");
           return false;
        }

     }

  }

}

// ----------------------------- user login validation ends -----------------------------------


// ----------------------------- Edit user functionality starts -----------------------------------

function editUser() {

  let editUsername = document.getElementById("edit_username").value;
  let editEmail = document.getElementById("edit_email").value;
  let editUserID = document.getElementById("getUserId").value;
   
   const usersarray = JSON.parse(localStorage.getItem('users'));
   const loginCheckId = JSON.parse(localStorage.getItem('loggedin'));

   if (editUserID == loginCheckId[0].loginId) {

      if (editUsername == "") {
         alert("Please enter Username");
         return false;
      } else if (usernameregex.test(editUsername) == false) {
         alert("Please enter valid Username");
         return false;
      } else {
         if (editUsername != '') {
            const updatedArray = usersarray.map(item => {
               if (item.id == editUserID) {
       
                  return {
                     ...item,
                     fullname: editUsername
                  };
               }
               return item;
            });
       
            localStorage.setItem('users', JSON.stringify(updatedArray));
            return true;
         }
      }

   } else {

            if (editUsername == "") {
               alert("Please enter Username");
               return false;
            } else if (usernameregex.test(editUsername) == false ) {
               alert("Please enter valid Username");
               return false;
            } else if (editEmail == "") {
               alert("Please enter Email Address");
               return false;
            } else if (IsEmail(editEmail) == false) {
               alert("Please enter valid Email Id");
               return false;
            } else {
               const updatedArray = usersarray.map(item => {
                  if (item.id == editUserID) {
         
                     return {
                        ...item,
                        fullname: editUsername,
                        email: editEmail
                     };
                  }
                  return item;
               });
         
               localStorage.setItem('users', JSON.stringify(updatedArray));
               return true;
            } 

   }

}

// ----------------------------- Edit user functionality ends -----------------------------------

// ----------------------------- edit user hide delete button starts --------------------------

let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

const params = new URLSearchParams(window.location.search);
var userId = params.get('userid');

const user = users.find((user) => user.id == userId);

if (user) {
  document.getElementById("edit_username").value = user.fullname;
  document.getElementById("edit_email").value = user.email ? user.email : 'noemail';
  document.getElementById("getUserId").value = user.id;
}

// ----------------------------- edit user hide delete button ends -----------------------------------