// console.log("canvas selction", localStorage.getItem("canvas_selection"));
let is_dev = true;

let backend_deployed = "https://drawexquisitecorpse.herokuapp.com";
let backend_dev = "http://localhost:3000";

let join_dev = "D:\\Blake\\Documents\\Moved Docs\\Git\\ExquisiteCorpseProject\\ExquisiteCorpse\\joinremote.html";
let join_deployed = "https://drawexquisitecorpse.netlify.com/joinremote";

let start_dev = "D:\\Blake\\Documents\\Moved Docs\\Git\\ExquisiteCorpseProject\\ExquisiteCorpse\\startremote.html"
let start_deployed = "https://drawexquisitecorpse.netlify.app/startremote"

let backend = backend_deployed;
let base_join_url = join_deployed;
let start_url = start_deployed;
if(is_dev){ 
  // start_url = start_dev;
  // base_join_url = join_dev;
  backend = backend_dev;
}


// let join_url = null;

console.log("hmmmmm")
let selection = localStorage.getItem("canvas_selection");
console.log("aa", localStorage.getItem("pair_id"))

let id = localStorage.getItem("pair_id");
let pair_id =  id + selection;
let other_id = ""

if(selection === "top"){ other_id = id + "bottom" }
else{ other_id = id + "top"}


arrow_styling();

function arrow_styling(){
   
  if(selection === "bottom"){
    // let arrow = 
    document.getElementById("above_canv").style.display = "flex";
  }
  else if(selection === "top"){
    // let arrow = 
    document.getElementById("below_canv").style.display = "flex";
  }
  else{console.log("error, could not find canvas selection")}
}

function make_join_url() {
  // let pair_id = localStorage.getItem("pair_id");
  let canvas_selection = localStorage.getItem("canvas_selection");
  let canvas_other = "";
  if(canvas_selection === "top"){
    canvas_other = "bottom";
  } 
  else {
    canvas_other = "top";
  } 
  join_url = `${base_join_url}?${id}&${canvas_other}`;
  console.log("url", join_url);
}

if (localStorage.getItem("player_status") === "starting"){
  console.log("starting");
  document.getElementById("copy_btn").style.display = "inline";
  document.getElementById("copied_message").style.display = "inline";
  make_join_url();
} 
else {
  localStorage.setItem("player_status", "joining");
  // localStorage.setItem("pair_id", "joining");
}

  // var seed = Math.random();
  // // console.log(seed);
  // seed = seed.toString();
  // sha256(seed);
  // var hash = sha256.create();
  // hash.update(seed);
  // let hex_val = hash.hex();
  // let url_val = hex_val.substring(0, 8);

  // console.log(hash);
  // console.log(hex_val);
  // console.log(url_val);

let returned_state = null;
 
function copyUrl () {
    console.log("url", join_url);
    let dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.getElementById("copied_message").innerHTML = "copied!"
    setTimeout(function(){ 
      document.getElementById("copied_message").innerHTML = "send link to a friend" 
    }, 1600);

    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = join_url;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function start_new() {
  window.location.assign(`${start_url}`);
}

function download_image() {
  var canvas = document.getElementById("combined_canvas");
  image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "exquisite_corpse.png";
  link.href = image;
  link.click();
}

function combined_styling () {
  document.getElementById("combined_canvas").style.display = "block";
  document.getElementById("canvas").style.display = "none";

  document.getElementById("above_canv").style.display = "none";
  document.getElementById("below_canv").style.display = "none";

  document.getElementById("doing_drawing").style.display = "none";
  document.getElementById("download_img").style.display = "inline";
  document.getElementById("start_new").innerHTML = "new drawing";
}

function combine_canvases () {
  let combined_canvas = document.getElementById('combined_canvas');
  let combined_context = combined_canvas.getContext('2d'); 


  context = canvas.getContext('2d');

  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(imageData);
  imageData = Array.from(imageData.data);
  // console.log(imageData);
  // console.log(imageData.length);
  // var JSON_img_data = JSON.stringify(imageData);
  // console.log(JSON_img_data);
  // console.log(JSON_img_data);

  //   // var ctx3 = can3.getContext('2d'); 

  let combinedImageData = combined_context.getImageData(0,0, combined_canvas.width, combined_canvas.height);


  // let pair_id = localStorage.getItem("pair_id");
  let selected_canvas = selection;
  // localStorage.getItem("canvas_selection");

  let data = {
    img_data: imageData, 
    //above converts to clamped array to regular array, stores better on back end
    selected_canvas: selected_canvas,
    pair_id: pair_id
  }
  console.log("data sent:", data, pair_id)

getCombined = () => {
  console.log("sent id", id)
  axios({
    method: 'get',
    url: `${backend}/combined/${id}`
  })
  .then( resz => {
    console.log("api combined response", resz)
  })
  .catch( err => {
    console.log("pinged err", err);
  })
  // let return_data = Uint8ClampedArray.from(resz.data[0].image_data);

}


  axios({
    method: 'post',
    url: `${backend}/drawings`,
    data: data
  })
    .then( res => {
      console.log("res!", res);
      let api_response = res.data;

        // window.location.assign(`https://drawexquisitecorpse.netlify.com/waiting`);
      let selection = localStorage.getItem("canvas_selection")
      if(api_response === "drawing added!"){
        let safety_counter = 0;
        ping();
        let interval = setInterval(ping, 5000);
        document.getElementById("submit_button").style.display = "none";
        document.getElementById("submitted_message").style.display = "inline";

        function ping () {
          console.log("sent in get:", data);
          
          console.log("count", safety_counter);
          axios({
            method: 'get',
            url: `${backend}/drawings/${other_id}`
          })
          .then( res => {
            safety_counter += 1;
            console.log("pinged res", res)
            response_length = res.data.length;

            console.log("len:", response_length);
            if(response_length > 0){
              // document.getElementById("combined_canvas").style.display = "inline";
              // console.log("10?", safety_counter);
              // combined_styling();
              getCombined()


              // combinedImageData.data.set(combined_data);
              // console.log("combined", combined_data.length);
              // combined_context.putImageData(combinedImageData, 0, 0);
              clearInterval(interval);
            }
            else if (safety_counter > 1000){
              alert("No response received for other half of drawing. Timed out.");
              clearInterval(interval);
            }
          })
          .catch( err => {
            console.log("pinged err", err);
          })
        }
 
      }
      else{
        // document.getElementById("combined_canvas").style.display = "inline";
        combined_styling();
        let combined_data = Uint8ClampedArray.from(res.data[0].image_data);
        combinedImageData.data.set(combined_data);
        console.log("combined", combined_data.length);
        combined_context.putImageData(combinedImageData, 0, 0);
      }
        // setTimeout(function(){ combine_canvases(); }, 5000);
        // returned_state = false;
      // else{

      // }


    })
    .catch( err => {
      console.log("err!", err);
    })

    // combined_context.drawImage(res., 0, 600);

}

  // Keep everything in anonymous function, called on window load.

  if(window.addEventListener) {
    window.addEventListener('load', function () {
      var  canvas, context, tool;

      function init () {




        canvas = document.getElementById(`canvas`);
        // canvas2 = document.getElementById(`canvas2`);
        // canvas3 = document.getElementById(`canvas3`);

        if (!canvas ) {
          alert('Error: I cannot find the canvas element!');
          return;
        }
    
        if (!canvas.getContext ) {
          alert('Error: no canvas.getContext!');
          return;
        }
    
        // Get the 2D canvas context.
        context = canvas.getContext('2d');
        // context2 = canvas2.getContext('2d');
        if (!context) {
          alert('Error: failed to getContext!');
          return;
        }
        let color = "#000000"
        context.strokeStyle = color;
        context.lineJoin = "round";
        context.lineWidth = 5;  
        if(localStorage.getItem("canvas_selection") == "top" ){
          context.beginPath(); 
          // Staring point (10,45)
          // context.setLineDash([10, 10]);
          context.moveTo(150, 300);
          // End point (180,47)
            context.lineTo(150, 280);
            context.moveTo(250, 300);
            // End point (180,47)
            context.lineTo(250, 280);
            // Make the line visible
            context.stroke();
        } else { 
          context.beginPath(); 
          // Staring point (10,45)
          // context.setLineDash([10, 10]);
          context.moveTo(150, 0);
          // End point (180,47)
            context.lineTo(150, 20);
            context.moveTo(250, 0);
            // End point (180,47)
            context.lineTo(250, 20);
            // Make the line visible
            context.stroke();
        }

        tool = new tool_pencil();
        // tool2 = new tool_pencil2();
    
        // Attach the mousedown, mousemove and mouseup event listeners.

        canvas.addEventListener('pointerdown',  ev_canvas, false);
        canvas.addEventListener('pointermove',   ev_canvas, false);
        window.addEventListener('pointerup',   ev_canvas, false);
        
      }
    
      // This painting tool works like a drawing pencil which tracks the mouse 
      // movements.
      function tool_pencil () {
        var tool = this;
        this.started = false;

        this.pointerdown = function (ev) {
          console.log("DOWN")
          // if(event.pressure > 0){
          // if(lower_num <= ev._y && ev._y <= higher_num){
            context.beginPath();
            context.moveTo(ev._x, (ev._y ));

            // context2.beginPath();
            // context2.moveTo(ev._x, ev._y + 270);

            tool.started = true;
          // }
          // } else {
          //   this.pointerup
          // }

      };

        this.pointermove = function (ev) {
          console.log("MOVING")
          if (tool.started) {
            context.lineTo(ev._x, ev._y);
            
            context.stroke();

          } 


        };

        this.pointerup = function (ev) {
          console.log("UP")
          if (tool.started) {
            // console.log("pointerup")
            tool.pointermove(ev);
            tool.started = false;
          }
        };
      }
    
      // The general-purpose event handler. This function just determines the mouse 
      // position relative to the canvas element.
      function ev_canvas (ev) {
        // if (ev.layerX || ev.layerX == 0) { // Firefox
        //   ev._x = ev.layerX;
        //   ev._y = ev.layerY;
        // } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        //   ev._x = ev.offsetX;
        //   ev._y = ev.offsetY;
        // }
        var rect = canvas.getBoundingClientRect();
        ev._x = ev.clientX - rect.left;
        ev._y = ev.clientY - rect.top;
    
        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
          func(ev);
        }
      }
      init();
      // initb();
 

      // init("canvasb");
    
    }, false); }