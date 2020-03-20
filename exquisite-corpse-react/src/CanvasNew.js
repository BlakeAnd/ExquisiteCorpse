import React, { Component } from 'react';
import Immutable from 'immutable';
import Drawing from "./Drawing";
import './CanvasNew.css'


class Canvas extends Component {

  constructor() {
    super();
    this.state = {

    };
  
  }

  drawing = () => {
    let canvas = document.getElementById(`canvas`);

    let context = canvas.getContext('2d');

    context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;  

          context.beginPath(); 
          // Staring point (10,45)
          // context.setLineDash([10, 10]);
          context.moveTo(100, 0);
          // End point (180,47)
            context.lineTo(100, 20);
            context.moveTo(200, 0);
            // End point (180,47)
            context.lineTo(200, 20);
            // Make the line visible
            context.stroke();

  }


render() {
  return (
    <div>
      <p>eq</p>
      <canvas className="canvas"></canvas>
   </div>
  );
}
}


export default Canvas;