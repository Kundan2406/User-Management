document.addEventListener("DOMContentLoaded", (event) => {

    var FileName = '';
 
    const loginlist = JSON.parse(localStorage.getItem("loggedin"));
 
    let loginUserId = loginlist[0].loginId;
    let userName = loginlist[0].loginName;
 
    document.getElementById('fileName').addEventListener('change', function (event) {
      let file = event.target.files[0];
 
       FileName = file.name
    });
 
    document.getElementById('UploadDoc').addEventListener('click', function () {
 
       const fileLabel = document.getElementById("fileLabel").value;
       if (!fileLabel) {
          alert("Enter File Name");
       } else if (!FileName) {
          alert("Upload a file to proceed");
       } else {
          const Documents = JSON.parse(localStorage.getItem("Documents")) || [];
          const newUpload = {
             id: Date.now(),
             loginUserId,
             userName,
             fileLabel,
             FileName
          };
          Documents.push(newUpload);
          localStorage.setItem("Documents", JSON.stringify(Documents));
          window.location.href = "document.html";
          alert('File uploaded successfully!');
 
       }
 
    });
    // Upload a File Ends
 
 
    // Edit a File Starts
 
    let selectedFileName;
    let selectedId;
 
    $('.EditFileName').each(function () {
 
       $(this).on("click", function () {
          selectedFileName = $(this).attr('data-name');
          selectedId = $(this).attr('data-id');
          document.getElementById("EditFileLabel").value = selectedFileName;
       });
 
    });
 
    document.getElementById('EditDoc').addEventListener('click', function () {
       const fileLabel = document.getElementById("EditFileLabel").value;
 
       if (fileLabel) {
          const Documents = JSON.parse(localStorage.getItem("Documents")) || [];
 
          const updatedDocs = Documents.map(item => {
             if (item.id == selectedId) {
                return {
                   ...item,
                   fileLabel: fileLabel
                };
             }
             return item;
          });
 
          localStorage.setItem('Documents', JSON.stringify(updatedDocs));
          alert('File Description Modified Successfully!');
          window.location.href = "document.html";
          return true;
       }
 
    });
 
    // Edit a File Ends
 
    // Delete a File Starts
 
    let deleteId;
 
    $('.DeleteFile').each(function () {
 
       $(this).on("click", function () {
          deleteId = $(this).attr('data-id');
       });
 
    });
 
    document.getElementById("DeleteDocs").addEventListener('click', function () {
       let array = JSON.parse(localStorage.getItem("Documents")) || [];
       let newResult = array.filter(item => item.id != deleteId);
       localStorage.setItem('Documents', JSON.stringify(newResult));
       alert('Docs Deleted Successfully!');
       window.location.href = "document.html";
       return true;
    });
 
    // Delete a File ends
 
 });