var ideaTitle = document.querySelector('.idea-title');
var ideaBody = document.querySelector('.idea-body');
var saveButton = document.querySelector('.save-button');
var deleteButton = document.querySelector('.delete-button');
var outputSection = document.querySelector('#output-section');

ideaTitle.addEventListener('keyup', enableSave);
ideaBody.addEventListener('keyup', enableSave);
$(saveButton).on('click', createIdea)

// var ideasArray =   new Array();

$(document).ready(getIdea);

function createIdea(event) {
  event.preventDefault();
  var newCard = new Card(ideaTitle.value, ideaBody.value);
  
  createHTML(newCard.title, newCard.body, newCard.quality);
  // document.getElementById('output-section').prepend(idea);
  var deleteButton = document.querySelector('.delete-button');
  var upvoteButton = document.querySelector('.upvote-button');
  var downVoteButton = document.querySelector('.downvote-button');
  deleteButton.addEventListener('click', deleteIdea);
  upvoteButton.addEventListener('click', upVote);
  downVoteButton.addEventListener('click', downVote);
  clearInputs();
  storeIdea(newCard);
  enableSave();
}

function createHTML(title, body, quality) {
  var newDiv = 
            `<div class="newDiv">
            <h2>${title}</h2> 
            <button class="delete-button"></button>
            <p class="idea-details">${body}</p>
            <p class="idea-quality">
            <button class="upvote-button"></button>
            <button class="downvote-button"></button>
            quality: <span class="quality-value">${quality}</span></p>
            <hr>
            </div>`
  $('#output-section').prepend(newDiv)
}

function enableSave() {
  if (ideaTitle.value.length === 0 || ideaBody.value.length === 0) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function clearInputs() {
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

function storeIdea(poop) {
  var stringifiedIdea = JSON.stringify(poop);
  localStorage.setItem(poop.identifier, stringifiedIdea);
};

function Card(title, body) {
  this.title = title;
  this.body = body;
  this.identifier = Date.now();
  this.quality = 'swill';
}

function getIdea() {
  for (var i = 0; i < localStorage.length; i++) {
    var retrievedIdea = localStorage.getItem(localStorage.key(i));
    var parseIdea = JSON.parse(retrievedIdea);
    createHTML(parseIdea.title, parseIdea.body, 
    parseIdea.quality, parseIdea.identifier);
  }
}



