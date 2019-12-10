  // context = document.getElementById('canvas').getContext("2d");
  // // var canvasDiv = document.getElementById('canvasDiv');
  // // canvas = document.createElement('canvas');
  // // canvas.setAttribute('width', canvasWidth);
  // // canvas.setAttribute('height', canvasHeight);
  // // canvas.setAttribute('id', 'canvas');
  // // canvasDiv.appendChild(canvas);
  // // if(typeof G_vmlCanvasManager != 'undefined') {
  // // 	canvas = G_vmlCanvasManager.initElement(canvas);
  // // }
  // // context = canvas.getContext("2d");

  // $('#canvas').on('pointerdown', e => {
  //   console.log("down")
  //   var mouseX = e.pageX - this.offsetLeft;
  //   var mouseY = e.pageY - this.offsetTop;
      
  //   paint = true;
  //   addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  //   redraw();
  // });

  // $('#canvas').on("pointermove", e => {
  //   if(paint){
  //     console.log("movewhiledown", event.pressure)
  //     addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  //     redraw();}
  //   // } else{
  //   //   console.log("nodown")
  //   //   pointerup();
  //   // }
  // });

  // pointerup = () => {
  //   paint = false;
  // };

  // $('#canvas').on("pointerleave", (e) => {
  //   paint = false;
  // }); 

  // var clickX = new Array();
  // var clickY = new Array();
  // var clickDrag = new Array();
  // var paint;

  // function addClick(x, y, dragging)
  // {
  //   clickX.push(x);
  //   clickY.push(y);
  //   clickDrag.push(dragging);
  // }

  // function redraw(){
  //   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    
  //   context.strokeStyle = "#df4b26";
  //   context.lineJoin = "round";
  //   context.lineWidth = 5;
        
  //   for(var i=0; i < clickX.length; i++) {		
  //     context.beginPath();
  //     if(clickDrag[i] && i){
  //       context.moveTo(clickX[i-1], clickY[i-1]);
  //      }else{
  //        context.moveTo(clickX[i]-1, clickY[i]);
  //      }
  //      context.lineTo(clickX[i], clickY[i]);
  //      context.closePath();
  //      context.stroke();
  //   }
  // }





  let lower_num = 0;
  let higher_num = 150;    
  function tops() {
    lower_num = 0;
    higher_num = 150;   
  }

  function bots() {
    lower_num = 150;
    higher_num = 300; 
  }




  // Keep everything in anonymous function, called on window load.

  if(window.addEventListener) {
    window.addEventListener('load', function () {
      var  canvas, context, tool;
      function init () {
        // Find the canvas element.

        canvas = document.getElementById(`canvas`);

        if (!canvas) {
          alert('Error: I cannot find the canvas element!');
          return;
        }
    
        if (!canvas.getContext) {
          alert('Error: no canvas.getContext!');
          return;
        }
    
        // Get the 2D canvas context.
        context = canvas.getContext('2d');
        if (!context) {
          alert('Error: failed to getContext!');
          return;
        }
    
        // Pencil tool instance.
        tool = new tool_pencil();
    
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

      context.strokeStyle = "#df4b26";
      context.lineJoin = "round";
      context.lineWidth = 5;

        this.pointerdown = function (ev) {
          // if(event.pressure > 0){
          if(lower_num <= ev._y && ev._y <= higher_num){
            context.beginPath();
            context.moveTo(ev._x, (ev._y ));
            console.log("pointerdown", ev._y)
            tool.started = true;
          }
          // } else {
          //   this.pointerup
          // }

      };

        this.pointermove = function (ev) {
          if (tool.started && lower_num <= ev._y && ev._y <= higher_num) {
            console.log(lower_num, ev._y, higher_num)
            context.lineTo(ev._x, ev._y);
            
            context.stroke();
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
            console.log("pointerup")
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



      // var  canvasb, contextb, toolb;
      // function initb () {
      //   // Find the canvas element.

      //   canvasb = document.getElementById(`canvasb`);

      //   if (!canvasb) {
      //     alert('Error: I cannot find the canvas element!');
      //     return;
      //   }
    
      //   if (!canvasb.getContext) {
      //     alert('Error: no canvas.getContext!');
      //     return;
      //   }
    
      //   // Get the 2D canvas context.
      //   contextb = canvasb.getContext('2d');
      //   if (!context) {
      //     alert('Error: failed to getContext!');
      //     return;
      //   }
    
      //   // Pencil tool instance.
      //   toolb = new tool_pencilb();

      //   contextb.beginPath();
      //   contextb.arc(95, 50, 40, 0, 2 * Math.PI);
      //   contextb.stroke(); 
    
      //   // Attach the mousedown, mousemove and mouseup event listeners.

      //   canvasb.addEventListener('pointerdown',  ev_canvasb, false);
      //   canvasb.addEventListener('pointermove',   ev_canvasb, false);
      //   canvasb.addEventListener('pointerup',   ev_canvasb, false);
        
      // }
    
      // // This painting tool works like a drawing pencil which tracks the mouse 
      // // movements.
      // function tool_pencilb () {
      //   var toolb = this;
      //   this.started = false;

      // contextb.strokeStyle = "#000000";
      // contextb.lineJoin = "round";
      // contextb.lineWidth = 5;

      //   this.pointerdown = function (ev) {
      //     // if(event.pressure > 0){
      //       contextb.beginPath();
      //       contextb.moveTo(ev._x, (ev._y ));
      //       console.log("pointerdown", ev._y)
      //       toolb.started = true;
      //     // } else {
      //     //   this.pointerup
      //     // }

      // };

      //   this.pointermove = function (ev) {
      //     if (toolb.started) {
      //       // console.log("pointermove")
      //       contextb.lineTo(ev._x, ev._y);
      //       contextb.stroke();
      //     } 
      //     // else{  this.pointerup
      //     // }
      //   };

      //   this.pointerup = function (ev) {
      //     if (toolb.started) {
      //       console.log("pointerup")
      //       toolb.pointermove(ev);
      //       toolb.started = false;
      //     }
      //   };
      // }
    
      // // The general-purpose event handler. This function just determines the mouse 
      // // position relative to the canvas element.
      // function ev_canvasb (ev) {
      //   if (ev.layerX || ev.layerX == 0) { // Firefox
      //     ev._x = ev.layerX;
      //     ev._y = ev.layerY;
      //   } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      //     ev._x = ev.offsetX;
      //     ev._y = ev.offsetY;
      //   }
    
      //   // Call the event handler of the tool.
      //   var func = toolb[ev.type];
      //   if (func) {
      //     func(ev);
      //   }
      // }



      init();
      // initb();
 

      // init("canvasb");
    
    }, false); }







