console.log("canvas selction", localStorage.getItem("canvas_selection"));

function make_join_url() {
  let pair_id = localStorage.getItem("pair_id");
  let canvas_selection = localStorage.getItem("canvas_selection");
  let canvas_other = "";
  if(canvas_selection === "top"){
    canvas_other = "bottom";
  } 
  else {
    canvas_other = "top";
  } 
  let join_url = `https://drawexquisitecorpse.netlify.com/joinremote?${pair_id}&${canvas_other}`;
  console.log("url", join_url);
}

if (localStorage.getItem("player_status") === "starting"){
  console.log("starting");
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

  let combinedImageData = combined_context.getImageData(0,0, 4, 6);


  let pair_id = localStorage.getItem("pair_id");
  let selected_canvas = localStorage.getItem("canvas_selection");

  let data = {
    img_data: imageData, 
    //above converts to clamped array to regular array, stores better on back end
    selected_canvas: selected_canvas,
    pair_id: pair_id
  }
  console.log("data sent:", data)
  
  let deployed = "https://drawexquisitecorpse.herokuapp.com";
  let local = "http://localhost:5000";
  let url = local;
  axios({
    method: 'post',
    url: `${url}/drawings`,
    data: data
  })
    .then( res => {
      console.log("res!", res);
      let response_length = res.data[0].merge_string.length;

        // window.location.assign(`https://drawexquisitecorpse.netlify.com/waiting`);
        let safety_counter = 0;
        let interval = setInterval(ping, 5000);

        function ping () {
          console.log("sent in get:", pair_id);
          safety_counter += 1;
          console.log("count", safety_counter);
          axios({
            method: 'get',
            url: `${url}/drawings`,
            data: data
          })
          .then( res => {
            console.log("pinged res", res)
            response_length = res.data[0].merge_string.length;
          })
          .catch( err => {
            console.log("pinged err", err);
          })
          if(res.data[0].merge_string.length === 2 || safety_counter > 2){
            console.log("10?", safety_counter);
            clearInterval(interval);
          }
        }
 
        // setTimeout(function(){ combine_canvases(); }, 5000);
        // returned_state = false;
      // else{
        let combined_data = Uint8ClampedArray.from(res.data[0].image_data);
        combinedImageData.data.set(combined_data);
        console.log("combined", combined_data.length);
        combined_context.putImageData(combinedImageData, 0, 0);
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

        context.strokeStyle = "#df4b26";
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
        canvas.addEventListener('pointerup',   ev_canvas, false);
        
      }
    
      // This painting tool works like a drawing pencil which tracks the mouse 
      // movements.
      function tool_pencil () {
        var tool = this;
        this.started = false;

        this.pointerdown = function (ev) {
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
          if (tool.started) {
            context.lineTo(ev._x, ev._y);
            
            context.stroke();

          } 


        };

        this.pointerup = function (ev) {
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
        if (ev.layerX || ev.layerX == 0) { // Firefox
          ev._x = ev.layerX;
          ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
          ev._x = ev.offsetX;
          ev._y = ev.offsetY;
        }
    
        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
          func(ev);
        }
      }

      // function ev_canvas2 (ev) {
      //   if (ev.layerX || ev.layerX == 0) { // Firefox
      //     ev._x = ev.layerX;
      //     ev._y = ev.layerY;
      //   } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      //     ev._x = ev.offsetX;
      //     ev._y = ev.offsetY;
      //   }
    
      //   // Call the event handler of the tool.
      //   // var func = tool[ev.type]; 
      //   var func2 = tool2[ev.type]; 
      //   if (func2) {
      //     // console.log(ev.y);
      //     func2(ev);
      //   }
      // }

      init();
      // initb();
 

      // init("canvasb");
    
    }, false); }