document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById('SendMessage').addEventListener('click', SendMessage);
 
    const loggedInUser = JSON.parse(localStorage.getItem("loggedin"));
 
 
    document.getElementById('senderName').innerHTML = loggedInUser[0].loginName;
 
    function SendMessage() {
 
 
       let textMessage = document.getElementById("message-input").value;
 
       let ChatBox = localStorage.getItem("ChatBox") ? JSON.parse(localStorage.getItem("ChatBox")) : [];
 
       var date = new Date;
       var time = `${date.getHours()}:${date.getMinutes()}`;
 
       if (textMessage != "") {
 
          let SaveMessage = {
             id: Number(new Date()),
             userName: loggedInUser[0].loginName,
             message: textMessage,
             time: time
          };
 
          ChatBox.push(SaveMessage);
 
          localStorage.setItem("ChatBox", JSON.stringify(ChatBox));
          window.location.reload();
          return true;
 
       } else {
          alert("Please enter a Message to Send");
          return false;
       }
 
    }
 
 });