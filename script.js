var parsedArray = []

function prepend(idea) {
  $('.idea-storage-list').prepend(
    `<article id="${idea.id}" class="idea">
    <input class="title" type="input" value="${idea.title}">
    <input class="delete-btn" type="submit" value="" src="icons/delete.svg">
    <textarea class="body" type="input">${idea.body}</textarea>
    <button class="up-vote-btn rating" type="button" name="button"></button>
    <button class="down-vote-btn rating"type="button" name="button"></button>
    <p class="quality rating">quality: ${idea.quality}</p>
    </article>`
  );
}

function clearInputs(){
  $('.title-user-input').val('');
  $('.body-user-input').val('');
}

function Idea(titleInput, bodyInput){
  this.title = titleInput
  this.body = bodyInput
  this.quality = "swill"
  this.id = Date.now();
  this.count = 0;
}

$(document).ready(function() {
  for(var i =0; i < localStorage.length; i++){
    parsedArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  for(var i=0; i< parsedArray.length; i++){
      prepend(parsedArray[i]);
}
})

$('.save-btn').on('click', function () {
  var idea = new Idea($('.title-user-input').val(), $('.body-user-input').val());
  localStorage.setItem(idea.id, JSON.stringify(idea));
  prepend(idea);
  clearInputs();
})

$('.idea-storage-list').on('click', '.delete-btn', function(){
  $(this).parent().remove();
  var id = $(this).parent().attr("id")
  localStorage.removeItem(id);
  }
)

$('.search-input').on('keyup', function(){
  var searchVal = $('.search-input').val()
  $.each($('.idea'), function(index, articleElement) {
    if ($(articleElement).children("h2").text().indexOf(searchVal) < 0) {
      console.log($(articleElement).children("h2").text());
      $(articleElement).hide()
    }
  })
})

function changeRating (idea, val) {
  if (idea.count <= 0) {
    idea.quality = "swill"
    val.text('quality: swill')
    idea.count = 0;
  }
  else if (idea.count === 1) {
    idea.quality = "plausible"
    val.text('quality: plausible')

  } else if (idea.count >= 2) {
    idea.quality = "genius"
    val.text("quality: genius")
    idea.count = 2;
  }
  localStorage.setItem(idea.id, JSON.stringify(idea));
}

$('.idea-storage-list').on('click', '.up-vote-btn', function(){
  var id = $(this).parent().attr("id")
  var idea = JSON.parse(localStorage.getItem(id))
  var thisIdea = $(this).siblings('.quality')
  idea.count += 1;
  changeRating(idea, thisIdea)
})

$('.idea-storage-list').on('click', '.down-vote-btn', function(){
  var id = $(this).parent().attr("id")
  var idea = JSON.parse(localStorage.getItem(id))
  var thisIdea = $(this).siblings('.quality')
  idea.count -= 1;
  changeRating(idea, thisIdea)
})

$('.idea-storage-list').on('blur', '.title', function() {
  var id = $(this).parent().attr("id")
  var idea = JSON.parse(localStorage.getItem(id))
  idea.title = $(this).val()
  localStorage.setItem(idea.id, JSON.stringify(idea));
})

$('.idea-storage-list').on('blur', '.body', function() {
  var id = $(this).parent().attr("id")
  var idea = JSON.parse(localStorage.getItem(id))
  idea.body = $(this).val()
  localStorage.setItem(idea.id, JSON.stringify(idea));
})
