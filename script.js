$(document).ready(getIdea);

var ideaTitle = document.querySelector('.idea-title');
var ideaBody = document.querySelector('.idea-body');
var saveButton = document.querySelector('.save-button');
var deleteButton = document.querySelector('.delete-button');
var outputSection = document.querySelector('#output-section');

ideaTitle.addEventListener('keyup', enableSave);
ideaBody.addEventListener('keyup', enableSave);
$(saveButton).on('click', createIdea);
$('#output-section').on('click', eventDelegator);


// var ideasArray =   new Array();

function eventDelegator(event) {
  if ($(event.target).hasClass('delete-button')) {
    deleteIdea(event)
  }
  if ($(event.target).hasClass('upvote-button')) {
    upVote(event)
  }
  if ($(event.target).hasClass('downvote-button')) {
    updateDownVote()
}
}

function createIdea(event) {
  event.preventDefault();
  var newCard = new Card(ideaTitle.value, ideaBody.value, 'swill');
  
  createHTML(newCard.title, newCard.body, newCard.quality, newCard.id);
  // document.getElementById('output-section').prepend(idea);
  var deleteButton = document.querySelector('.delete-button');
  var upvoteButton = document.querySelector('.upvote-button');
  var downVoteButton = document.querySelector('.downvote-button');
  deleteButton.addEventListener('click', deleteIdea);
  // upvoteButton.addEventListener('click', upVote);
  // downVoteButton.addEventListener('click', downVote);
  clearInputs();
  storeIdea(newCard);
  enableSave();
}

function createHTML(title, body, quality, id) {
  var newDiv = 
            `<div class="newDiv"  data-id=${id}> 
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
  // console.log('hi')
  var id = $(event.target).parents('.newDiv').data('id');
  event.target.parentNode.remove();
  localStorage.removeItem(id);
}

function upVote(event) {
  // console.log('hi')
 if (event.target.className === 'upvote-button') {
  if ($(event.target).siblings('.quality-value').text() === 'swill') {
    $(event.target).siblings('.quality-value').text('plausible');
  } else {
   $(event.target).siblings('.quality-value').text('genius');
  }
  // var retrievedIdea = localStorage.getItem(localStorage.key(i));
  // var parseIdea = JSON.parse(retrievedIdea);
  // parseIdea.quality;
 }
};

function downVote(object) {
  console.log(object);
  if (object.quality === 'genius') {
    object.quality = 'plausible';
  } else {
    object.quality = 'swill'; 
  }
};

function updateDownVote() {
  var clickedCard = $(event.target).parent().parent();
  var parseCard = JSON.parse(localStorage.getItem(clickedCard.data('id')));
  downVote(parseCard);
  // clickedCard.find('.quality-value').text(parseCard.quality);
  storeIdea(parseCard);
  clickedCard.find('.quality-value').text(parseCard.quality);
}

function storeIdea(poop) {
  var stringifiedIdea = JSON.stringify(poop);
  localStorage.setItem(poop.id, stringifiedIdea);
};

function Card(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality;
}

function getIdea() {
  for (var i = 0; i < localStorage.length; i++) {
    var retrievedIdea = localStorage.getItem(localStorage.key(i));
    var parseIdea = JSON.parse(retrievedIdea);
    createHTML(parseIdea.title, parseIdea.body, 
    parseIdea.quality, parseIdea.id);
  }
}





