// const { default: Axios } = require("axios");
let id_array = null;
let deployed = "https://drawexquisitecorpse.herokuapp.com";
let local = "http://localhost:5000";
let url = local;
axios({
  method: 'get',
  url: `${url}/drawings/${pair_id}`
})
.then( res => {
  console.log(res)
})
.catch( err => {
  console.log("pinged err", err);
})

localStorage.setItem("player_status", "starting")
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
  localStorage.setItem("pair_id", text);
}

