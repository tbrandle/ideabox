var objectArray = []


$(document).ready(function() {
  for(var i =0; i < localStorage.length; i++){
    objectArray.push(localStorage.getItem(localStorage.key(i)));
  }
  parsedArray = objectArray.map(function(val, i) {
    return (JSON.parse(objectArray[i]));
  })
})

function Idea(titleInput, bodyInput){
  this.title = titleInput
  this.body = bodyInput
  this.quality = "swill"  || quality //need to research and add switch case
  this.id = Date.now();
}

// function retrievedIdea() {
  // for(var i =0; i < localStorage.length; i++){
    // return parsedIdea;
  // }


$('.save-btn').on('click', function () {
  var titleInput = $('.title-user-input').val();
  var bodyInput = $('.body-user-input').val();
  var idea = new Idea(titleInput, bodyInput);
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea);
  console.log(idea);
  console.log(titleInput);
  $('.idea-storage-list').prepend(
    `<article class="idea">
      <h2>${titleInput}</h2>
      <input class="delete-btn" type="submit" value="" src="icons/delete.svg">
      <p class="idea-description">${bodyInput}</p>
      <button class="up-vote-btn rating" type="button" name="button"></button>
      <button class="down-vote-btn rating"type="button" name="button"></button>
      <p class="rating">Quality: swill</p>
    </article>`
  )

})

  // retrievedIdea = localStorage.getItem();
  // var parsedIdea = JSON.parse(retrievedIdea)
  // console.log(parsedIdea);
// })


$('.idea-storage-list').on('click', '.delete-btn', function(){
  $(this).parent().remove();
}
)
