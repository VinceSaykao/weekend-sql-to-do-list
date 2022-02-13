$(document).ready(readyNow)

function readyNow() {
 console.log('hello');
 $('.grid-container').on('click', '.btn-submit', submitBtn);
 $('#output').on('click', '.btn-delete', toDoListDelete);
$('#output').on('click','.btn-done', toDoListDone);
getToDoList()

};


function submitBtn() {
  console.log('clicked');
  // postToDoList
  
 
  
  
  let toDo = {
      to_do: $('#input').val(),
      //notes: $('#notes').val()
  }
  postToDoList(toDo);
  $('#input').val('');

}; // end of function

// git push --set-upstream origin feature-client


function toDoListDone() {
  console.log('done');
      let marked = $(this).text().toLowerCase();
      let id = $(this).closest('tr').data().id
      $(this).css("background-color","yellow");
      console.log(id, marked);
      $.ajax({
        method: 'PUT',
        url: `/toDoList/${id}`,
        data: {
          marked: marked
        }
      }).then(function(response) {
          getToDoList();
      }).catch(function(err) {
        console.log(err);
      })
    }; // end of function

    function getToDoList() {
      console.log( 'in toDoList');
      $('#output').empty();
    $.ajax({
      method: 'GET',
      url: "/toDoList"
    }).then(function(response){
      console.log('response', response);
      rendertoDoList(response); // calls rendertoDoList
    }).catch (function(error){
      console.log('Lmao, that sucks...')
    })
    
    }; // end of function
    


function postToDoList(toDo) {
    console.log('Post works');

    $.ajax({
        type: 'POST',
        url: '/toDoList',
        data: toDo
      }).then(function(response){
        console.log('Response from server', response);
        
        getToDoList();
      }).catch(function(error){
        console.log('Error in POST', error);
      })
    }; // end of function



function rendertoDoList(response) {
    console.log('List has been rendered');
    for (let i = 0; i < response.length; i += 1) {
        $('#output').append(`
        <tr data-id=${response[i].id}>
          <td>${response[i].to_do}</td>
          <td><button class="btn-done" data-id=${response[i].id}>DONE</button></td>
          <td><button class="btn-delete" data-id=${response[i].id}>DELETE</button></td>
          <td><textarea rows = "5" cols = "" name = "description">
          Write Something...
       </textarea> <button id="enter-notes">Enter Notes</button
          </td>
          </tr>
        `) // <td>${response[i].notes}</td>
      } // end of for loop
    }; // end of function

function toDoListDelete() {
    console.log('deleted');
    let doId = $(this).closest('tr').data().id;
$.ajax({
    method: 'DELETE',
    url: `/toDoList/${doId}`
}).then(function(response) {
    console.log('Deleted!', response);
}).catch(function(error) {
    console.log('Error Deleteing', error);
})
getToDoList();

}; // end of function 
    




