// const { default: Axios } = require("axios");
let id_obj = {};
let deployed = "https://drawexquisitecorpse.herokuapp.com";
let local = "http://localhost:5000";
let backend = local;
let collision_string = "collision";
let start_string = "visit_start"
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
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
}

function selectedBottom() {
  // canvas_selection = "bottom";
  localStorage.setItem("canvas_selection", "bottom")
  window.location.assign(`https://drawexquisitecorpse.netlify.com/remotedraw`);
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
  console.log(text);
  localStorage.setItem("pair_id", text);
}

