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
$('#output-section').on('keyup', eventDelegator2);

function eventDelegator2(event) {
  if ($(event.target).hasClass('newH2')) {
    editContent(); 
  }
  if ($(event.target).hasClass('idea-details')) {
    editContent();
  }
};

function eventDelegator(event) {
  if ($(event.target).hasClass('delete-button')) {
    deleteIdea(event);
  }
  if ($(event.target).hasClass('upvote-button')) {
    upVote(event);
  }
  if ($(event.target).hasClass('downvote-button')) {
    downVote(event);
  }
};

function createIdea(event) {
  event.preventDefault();
  var newCard = new Card(ideaTitle.value, ideaBody.value, 'swill');
  createHTML(newCard.title, newCard.body, newCard.quality, newCard.id);
  var deleteButton = document.querySelector('.delete-button');
  var upvoteButton = document.querySelector('.upvote-button');
  var downVoteButton = document.querySelector('.downvote-button');
  deleteButton.addEventListener('click', deleteIdea);
  clearInputs();
  storeIdea(newCard);
  enableSave();
};

function createHTML(title, body, quality, id) {
  var newDiv = 
            `<div class="newDiv"  data-id=${id}> 
            <h2 contenteditable="true" class="newH2">${title}</h2> 
            <button class="delete-button"></button>
            <p contenteditable="true" class="idea-details">${body}</p>
            <p class="idea-quality">
            <button class="upvote-button"></button>
            <button class="downvote-button"></button>
            quality: <span class="quality-value">${quality}</span></p>
            <hr>
            </div>`
  $('#output-section').prepend(newDiv);
};

function editContent() {
  var updateEdit = JSON.parse(localStorage.getItem($(event.target).parents('.newDiv').attr('data-id')));
  var newTitle = document.querySelector('.newH2');
  var newBody = document.querySelector('.idea-details')
  updateEdit.body = newBody.innerText;
  updateEdit.title = newTitle.innerText;
  localStorage.setItem($(event.target).parents('.newDiv').attr('data-id'), JSON.stringify(updateEdit));
}

function enableSave() {
  if (ideaTitle.value.length === 0 || ideaBody.value.length === 0) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
};

function clearInputs() {
  ideaTitle.value = '';
  ideaBody.value = '';
};
  
function deleteIdea(event) {
  var id = $(event.target).parents('.newDiv').data('id');
  event.target.parentNode.remove();
  localStorage.removeItem(id);
};

function upVote(event) {
  // console.log('hi')
  var storeIdea = JSON.parse(localStorage.getItem($(event.target).parents('.newDiv').attr('data-id')));
  if (event.target.className === 'upvote-button') {
    if ($(event.target).siblings('.quality-value').text() === 'swill') {
      $(event.target).siblings('.quality-value').text('plausible');
      storeIdea.quality = 'plausible';
  } else {
   $(event.target).siblings('.quality-value').text('genius');
   storeIdea.quality = 'genius';
    }
  }
  localStorage.setItem($(event.target).parents('.newDiv').attr('data-id'), JSON.stringify(storeIdea));

  // var retrievedIdea = localStorage.getItem(localStorage.key(i));
  // var parseIdea = JSON.parse(retrievedIdea);
  // parseIdea.quality;
};

function downVote(object) {
  var storeIdea = JSON.parse(localStorage.getItem($(event.target).parents('.newDiv').attr('data-id')));
  if (event.target.className === 'downvote-button') {
    if ($(event.target).siblings('.quality-value').text() === 'genius') {
      $(event.target).siblings('.quality-value').text('plausible');
      storeIdea.quality = 'plausible';
  } else {
   $(event.target).siblings('.quality-value').text('swill');
   storeIdea.quality = 'swill';
    }
  }
  localStorage.setItem($(event.target).parents('.newDiv').attr('data-id'), JSON.stringify(storeIdea));
};

// function updateDownVote() {
//   var clickedCard = $(event.target).parent().parent();
//   var parseCard = JSON.parse(localStorage.getItem(clickedCard.data('id')));
//   downVote(parseCard);
//   // clickedCard.find('.quality-value').text(parseCard.quality);
//   storeIdea(parseCard);
//   clickedCard.find('.quality-value').text(parseCard.quality);
// }

function storeIdea(poop) {
  var stringifiedIdea = JSON.stringify(poop);
  localStorage.setItem(poop.id, stringifiedIdea);
};

function Card(title, body, quality) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = quality;
};

function getIdea() {
  for (var i = 0; i < localStorage.length; i++) {
    var retrievedIdea = localStorage.getItem(localStorage.key(i));
    var parseIdea = JSON.parse(retrievedIdea);
    createHTML(parseIdea.title, parseIdea.body, 
    parseIdea.quality, parseIdea.id);
  }
};

$(document).ready(function(){
 $(".search-input").on("keyup", function() {
   var value = $(this).val().toLowerCase();
   $(".newDiv").filter(function() {
     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
   });
 });
});







