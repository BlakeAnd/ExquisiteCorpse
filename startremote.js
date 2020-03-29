makeid();

function selectedRandom() {
  let rand = Math.random();
  if (rand < 0.5){
    selectedTop();
  } 
  else {
    selectedBottom();
  }
}

function selectedTop() {
  // canvas_selection = "top";
  localStorage.setItem("canvas_selection", "top")
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}

function selectedBottom() {
  // canvas_selection = "bottom";
  localStorage.setItem("canvas_selection", "bottom")
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}

function makeid() {
  let len = 6;
  let text = "";
  let char_list = "abcdefghijklmnopqrstuvwxyz";
  for(var i=0; i < len; i++ ){  
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  console.log(text);
  localStorage.setItem("exquisite_session_id", text);
}

