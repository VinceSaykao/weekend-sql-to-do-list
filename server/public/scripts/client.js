$(document).ready(readyNow)

function readyNow() {
 console.log('hello');
 $('.grid-container').on('click', '.btn-submit', submitBtn);
 $('#output').on('click', '.btn-delete', toDoListDelete);
$('#output').on('click','.btn-done', toDoListDone);
$('#output').on('click','.enter-notes',enterNotesDo);
getToDoList();
};




// my GET, recieves information from database but also clears/updates new output
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

// when submit is pressed, it will process my value of input
function submitBtn() {
  console.log('clicked');
  // postToDoList
  let toDo = {
      to_do: $('#input').val(),
  }
  postToDoList(toDo);
  $('#input').val('');

}; // end of function

// git push --set-upstream origin feature-client

// this will update my "done" and return true on database when image is clicked
function toDoListDone() {
  console.log('done');
      let marked = $(this).text();
      let id = $(this).closest('tr').data().id
      console.log(id, marked);
      $.ajax({
        method: 'PUT',
        url: `/toDoList/${id}`,
        data: {
          marked: marked
        }
      }).then(function(response) {
      }).catch(function(err) {
        console.log(err);
      })
      getToDoList() // GET callback
    }; // end of function



    

// ajax post will send input value to database
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
  
    



// this will render onto DOM depending on if my "done" database name is false or true
function rendertoDoList(response) {
  
    console.log('List has been rendered');
    for (let i = 0; i < response.length; i += 1) {
      if (response[i].done === false) { // if "notes" is false
        $('#output').append(`
        <tr data-id=${response[i].id}>
          <td><h4>${response[i].to_do}</h4></td>
          <td><img src="large.png" class="btn-done" data-id=${response[i].id}></td>
          <td><img src="trash.png" class="btn-delete" data-id=${response[i].id}></td>
          <td id="text-area"><textarea class="note-input" rows = "5" cols = "" name = "description">
          Write Something...
       </textarea><button class="enter-notes">Enter Notes</button>
          </td>
          </tr>
        `)
      } else if (response[i].done === true) { // if "notes" is true
        $('#output').append(`
        <tr data-id=${response[i].id}>
          <td><strike><h4>${response[i].to_do}</h4></strike></td>
          <td><img src="sleepy.png" id="sleeping" class="btn-done" data-id=${response[i].id}></td>
          <td><img src="trash.png" class="btn-delete" data-id=${response[i].id}></td>
          <td id="text-area"><textarea class="note-input" rows = "5" cols = "" name = "description">
          Write Something...
       </textarea><button class="enter-notes">Enter Notes</button>
          </td>
          </tr>
        `)
      } else if (response[i].to_do === '') { // else return nothing, not working...
        return;
      }
    } // end of loop
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

function enterNotesDo() {
  let marked = $('.note-input').val().toLowerCase();
  console.log('clicked');
  console.log(marked)
  let id = $(this).closest('tr').data().id;
  console.log(id, marked);
  $.ajax({
    method: 'PUT',
    url: `/notes/${id}`,
    data: {
      marked: marked
    }
  }).then(function(response) {
    getToDoList();
  }).catch(function(err) {
    console.log(err);
  })

}; // end of function
    




