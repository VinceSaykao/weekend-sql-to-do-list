$(document).ready(readyNow)

function readyNow() {
 console.log('hello');
 $('.grid-container').on('click', submitBtn)

 getToDoList();

};

function submitBtn() {
    console.log('clicked');
    $('#output').append()

}; // end of function

// git push --set-upstream origin feature-client

function getToDoList() {
    console.log( 'in toDoList');
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

function rendertoDoList(response) {
    console.log('List has been rendered');
    for (let i = 0; i < response.length; i++) {
        $('#output').append(`
        <tr data-id=${response[i].id}>
          <td>${response[i].to_do}</td>
          <td>${response[i].notes}</td>
          <button class="btn-delete" data-id=${response[i].id}>DELETE</button>
          <button class="btn-done" data-id=${response[i].id}>DONE</button>
          </td>>
          </tr>
        `)
      } // end of for loop
    }; // end of function
    
