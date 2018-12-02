
let btnArray = ['button1', 'button2','button3','button4','button5','button6'];
let tagsArray = ["Politics", "New York", "Letters", "Opinion", "Book"];
  console.log("Hello")
for(let i = 0; i < btnArray.length; i++) {
  console.log("i is : " + i);
  document.getElementById(btnArray[i]).addEventListener("click", () => {
    document.getElementById(btnArray[i]).className = "active";
    document.getElementById('form_tag').value = tagsArray[i];
    for(let j = 0; j < btnArray.length; j++) {
      if(i != j) {
        document.getElementById(btnArray[j]).classList.remove("active");
      }
    }

  });
}
