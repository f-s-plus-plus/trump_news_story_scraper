//array of tag buttons
let btnArray = ['button1', 'button2','button3','button4','button5','button6'];
//array of tags (note that the two arrays have the same length)
let tagsArray = ["Politics", "New York", "Letters", "Opinion", "Books"];

//iterates over the buttons and attaches an event listener to check if they are clicked
for(let i = 0; i < btnArray.length; i++) {
  console.log("i is : " + i);
  document.getElementById(btnArray[i]).addEventListener("click", () => {
    //adds active css class to the button to show that it has been selected
    document.getElementById(btnArray[i]).className = "active";
    //sets the hidden text input to the corresponding tagsArray value (for the post request)
    document.getElementById('form_tag').value = tagsArray[i];
    for(let j = 0; j < btnArray.length; j++) {
      //removes that css class from all of the other buttons
      if(i != j) {
        document.getElementById(btnArray[j]).classList.remove("active");
      }
    }
  });
}
