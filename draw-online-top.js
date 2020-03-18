
function combine_canvases () {
  // var can3 = document.getElementById('canvas3');
  // var ctx3 = can3.getContext('2d'); 


  // axios.get("http://localhost:5000/")
  //   .then( res => {
  //     console.log(res);
  //   })
  //   .catch( err => {
  //     console.log(err);
  //   })


  context = canvas.getContext('2d');
  // context2 = canvas2.getContext('2d');
 
  // ctx3.drawImage(canvas, 0, 270);
  // ctx3.drawImage(canvas2, 0, 0);

    
//   var imageData = ctx3.getImageData(0, 0, 400, 600);
//   console.log(imageData.data.length);
//   //examine every pixel, 
//   //change any old rgb to the new-rgb
//   for (var i = 430000; i < 434000; i += 4) { 
//       // is this pixel the old rgb?
//       if (125 < imageData.data[i + 3] && imageData.data[i + 3] < 135) {
//           imageData.data[i + 3] = 0;
//       } 
//   }
//   for (var i = 478000; i < 482000; i += 4) { 
//     // is this pixel the old rgb?
//     if (125 < imageData.data[i + 3] && imageData.data[i + 3] < 135) {
//         imageData.data[i + 3] = 0;
//     } 
// }
//   ctx3.putImageData(imageData, 0, 0);


var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
var JSON_img_data = JSON.stringify(imageData);
  // console.log(JSON_img_data);

  // var ctx3 = can3.getContext('2d'); 
  axios({
    method: 'post',
    url: "http://localhost:5000/drawings",
    data: JSON_img_data
  })
    .then( res => {
      console.log("res!", res);
    })
    .catch( err => {
      console.log(err);
    })



  // put the re-colored image back on the image
  // var img1 = document.getElementById("image1");
  // img1.src = c.toDataURL('image/png');
}






  // Keep everything in anonymous function, called on window load.

  if(window.addEventListener) {
    window.addEventListener('load', function () {
      var  canvas, context, tool;
      // var canvas2, context2, tool2;
      function init () {
        // Find the canvas element.


        // var can3 = document.getElementById('canvas3');
        // var ctx3 = can3.getContext('2d'); 



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

        //   context2.beginPath(); 
        // context2.setLineDash([10, 10]);

        //   // Staring point (10,45)
        //   context2.moveTo(10,270);
        //   // End point (180,47)
        //   context2.lineTo(390,270);
        //   // Make the line visible
        //   context2.stroke();
  
        //   context2.setLineDash([]);
        // context.setLineDash([]);

        // Pencil tool instance.
        tool = new tool_pencil();
        // tool2 = new tool_pencil2();
    
        // Attach the mousedown, mousemove and mouseup event listeners.

        canvas.addEventListener('pointerdown',  ev_canvas, false);
        canvas.addEventListener('pointermove',   ev_canvas, false);
        canvas.addEventListener('pointerup',   ev_canvas, false);

        // canvas2.addEventListener('pointerdown',  ev_canvas2, false);
        // canvas2.addEventListener('pointermove',   ev_canvas2, false);
        // canvas2.addEventListener('pointerup',   ev_canvas2, false);
        
      }
    
      // This painting tool works like a drawing pencil which tracks the mouse 
      // movements.
      function tool_pencil () {
        var tool = this;
        this.started = false;

      // context.strokeStyle = "#df4b26";
      // context.lineJoin = "round";
      // context.lineWidth = 5;

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
            // if(ev.y < 50){

            // context2.lineTo(ev._x,  ev._y + 270);
            // context2.stroke();
            // } else{
              // context2.beginPath();
            // }
          } 
          // else{
          //   if (tool.started) {
          //     console.log("pointerup")
          //     tool.pointermove(ev);
          //     tool.started = false;
          //   }
          // }

        };

        this.pointerup = function (ev) {
          if (tool.started) {
            // console.log("pointerup")
            tool.pointermove(ev);
            tool.started = false;
          }
        };
      }

      // function tool_pencil2 () {
      //   var tool2 = this;
      //   this.started = false;

      // context2.strokeStyle = "#df4b26";
      // context2.lineJoin = "round";
      // context2.lineWidth = 5;

      //   this.pointerdown = function (ev) {
      //     // if(event.pressure > 0){
      //     // if(lower_num <= ev._y && ev._y <= higher_num){
      //       context2.beginPath();
      //       context2.moveTo(ev._x, (ev._y ));
      //       tool2.started = true;


      //       context.beginPath();
      //       context.moveTo(ev._x, ev._y - 270);
      //     // }
      //     // } else {
      //     //   this.pointerup
      //     // }

      // };

      //   this.pointermove = function (ev) {
      //     if (tool2.started) {
      //       context2.lineTo(ev._x, ev._y);
            
      //       context2.stroke();

      //       context.lineTo(ev._x,  ev._y - 270);
      //       context.stroke();
          
      //     } 
      //     // else{
      //     //   if (tool.started) {
      //     //     console.log("pointerup")
      //     //     tool.pointermove(ev);
      //     //     tool.started = false;
      //     //   }
      //     // }

      //   };

      //   this.pointerup = function (ev) {
      //     if (tool2.started) {
      //       // console.log("pointerup")
      //       tool2.pointermove(ev);
      //       tool2.started = false;
      //     }
      //   };
      // }
    
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