$(document).ready(readyNow)

function readyNow() {
 console.log('hello');
 $('.grid-container').on('click', submitBtn)
};

function submitBtn() {
    console.log('clicked');
    $('#output').append()

}; // end of function

// git push --set-upstream origin feature-client