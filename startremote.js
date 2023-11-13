// const { default: Axios } = require("axios");

let id_obj = {};
let collision_string = "collision";
let start_string = "visit_start"

let deployed_api = "https://drawexquisitecorpse.herokuapp.com";
let dev_api = "http://localhost:3000";

let deployed_redirect = "https://drawexquisitecorpse.netlify.com/remotedraw"
let dev_redirect = "file:///D:/Blake/Documents/Moved%20Docs/Git/ExquisiteCorpseProject/ExquisiteCorpse/remotedraw.html"

//change dev/prod here
let is_dev = false;

let backend = deployed_api;
let redirect = deployed_redirect;

if(is_dev){
  backend = dev_api;
  // redirect = dev_redirect
}


axios({
  method: 'get',
  url: `${backend}/every_canvas_id`
})
.then( res => {
  console.log(res) 
  let id_arr = res.data;
  for(let i = 0; i < id_arr.length; i++){
    let current_id = id_arr[i].drawing_canvas;
    id_obj[current_id] =  true;
  }
  make_id(); 
})
.catch( err => {
  console.log("pinged err", err);
})

// axios({
//   method: 'put',
//   url: `${backend}/count/${start_string}`
// })
// .then( res => {

// })
// .catch( err => {
//   console.log("pinged err", err);
// })

function collision_count () { //sends call to backend to update based on fact that there was an id collision/duplicate
  axios({
    method: 'put',
    url: `${backend}/count/${collision_string}`
  })
  .then( res => {
    
  })
  .catch( err => {
    console.log("pinged err", err);
  })
}

localStorage.setItem("player_status", "starting")




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
  window.location.assign(`${redirect}`);
}

function selectedBottom() {
  // canvas_selection = "bottom";
  localStorage.setItem("canvas_selection", "bottom")
  window.location.assign(`${redirect}`);
  // https://drawexquisitecorpse.netlify.com/remotedraw
  // file:///D:/Blake/Documents/Moved%20Docs/Git/ExquisiteCorpseProject/ExquisiteCorpse/remotedraw.html
}

let safety_counter = 0;
function make_id() {
  safety_counter ++;
  if(safety_counter > 1){
    // collision_count();
  }
  let len = 6;
  let text = "";
  let char_list = "abcdefghijklmnopqrstuvwxyz";
  for(var i=0; i < len; i++ ){  
    text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  if(id_obj[text] === true && safety_counter < 1000){
    make_id();
  }
  console.log("id to set", text);
  localStorage.setItem("pair_id", text);
}

