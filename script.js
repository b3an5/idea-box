var ideaTitle = document.querySelector('.idea-title');
var ideaBody = document.querySelector('.idea-body');
var saveButton = document.querySelector('.save-button');
var deleteButton = document.querySelector('.delete-button');
var outputSection = document.querySelector('#output-section');

// ideaTitle.addEventListener('keyup', enableSave);
// ideaBody.addEventListener('keyup', enableSave);
$(saveButton).on('click', createIdea)

function createIdea(event) {
  event.preventDefault();
  var idea = document.createElement('div'); 
  idea.innerHTML = 
            `<h2>${ideaTitle.value}</h2> 
            <button class="delete-button"></button>
            <p class="idea-details">${ideaBody.value}</p>
            <p class="idea-quality">
            <button class="upvote-button"></button>
            <button class="downvote-button"></button> 
            quality: <span class="quality-value">swill</span></p>
            <hr>`
  document.getElementById('output-section').prepend(idea);
  var deleteButton = document.querySelector('.delete-button');
  var upvoteButton = document.querySelector('.upvote-button');
  var downVoteButton = document.querySelector('.downvote-button');
  deleteButton.addEventListener('click', deleteIdea);
  upvoteButton.addEventListener('click', upVote);
  downVoteButton.addEventListener('click', downVote);
  ideaTitle.value = '';
  ideaBody.value = '';
}
  
function deleteIdea(event) {
  if(event.target.className === 'delete-button') {
  event.target.parentNode.remove();
 }
}

function upVote(event) {
 if (event.target.className === 'upvote-button') {
  if ($(event.target).siblings('.quality-value').text() === 'swill') {
    $(event.target).siblings('.quality-value').text('plausible');
  } else {
   $(event.target).siblings('.quality-value').text('genius'); 
  }
 }
};

function downVote(event) {
 if (event.target.className === 'downvote-button') {
  if ($(event.target).siblings('.quality-value').text() === 'genius') {
    $(event.target).siblings('.quality-value').text('plausible');
  } else {
   $(event.target).siblings('.quality-value').text('swill'); 
  }
 }
};




