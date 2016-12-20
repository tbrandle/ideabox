var parsedArray = []

$(document).ready(function() {
  for(var i =0; i < localStorage.length; i++){
    parsedArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  for(var i=0; i< parsedArray.length; i++){
  $('.idea-storage-list').prepend(
    `<article id="${parsedArray[i].id}" class="idea">
      <h2>${parsedArray[i].title}</h2>
      <input class="delete-btn" type="submit" value="" src="icons/delete.svg">
      <p class="idea-description">${parsedArray[i].body}</p>
      <button class="up-vote-btn rating" type="button" name="button"></button>
      <button class="down-vote-btn rating"type="button" name="button"></button>
      <p class="rating">Quality: ${parsedArray[i].quality}</p>
    </article>`
  )
}
})

function Idea(titleInput, bodyInput){
  this.title = titleInput
  this.body = bodyInput
  this.quality = "swill"  || quality //need to research and add switch case
  this.id = Date.now();
}

$('.save-btn').on('click', function () {
  var idea = new Idea($('.title-user-input').val(), $('.body-user-input').val());
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea);
  $('.idea-storage-list').prepend(
    `<article id="${idea.id}" class="idea">
      <h2>${idea.title}</h2>
      <input class="delete-btn" type="submit" value="" src="icons/delete.svg">
      <p class="idea-description">${idea.body}</p>
      <button class="up-vote-btn rating" type="button" name="button"></button>
      <button class="down-vote-btn rating"type="button" name="button"></button>
      <p class="rating">Quality: ${idea.quality}</p>
    </article>`
  )
  clearInputs();
})

$('.idea-storage-list').on('click', '.delete-btn', function(){
  $(this).parent().remove();
  var id = $(this).parent().attr("id")
  localStorage.removeItem(id);
  }
)

function clearInputs(){
  $('.title-user-input').val('');
  $('.body-user-input').val('');
  console.log('hi');
};

