import React, { Component } from 'react';
import Immutable from 'immutable';
import Drawing from "./Drawing";


class Canvas extends Component {

  constructor() {
    super();
    this.state = {
      isDrawing: false,
      lines: Immutable.List(),
    };
    
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return;
    }
  
    const point = this.relativeCoordinatesForEvent(mouseEvent);
  
    this.setState(prevState => {
      return {
        lines: prevState.lines.push(Immutable.List([point])),
        isDrawing: true,
      };
    });
  }
  
  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    });
  }

render() {
  return (
    <div ref="drawArea" 
      onMouseDown={this.handleMouseDown.bind(this)}
      onMouseMove={this.handleMouseMove}
      >
      
      <Drawing lines={this.state.lines} />
    </div>
  );
}
}

  // componentDidMount() {
  //   const canvas = this.refs.canvas
  //   const ctx = canvas.getContext("2d")
  //   const img = this.refs.image

  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0)
  //     ctx.font = "40px Courier"
  //     ctx.fillText(this.props.text, 210, 75)
  //   }
  // }
//   componentDidMount() {
//     this.updateCanvas();
// }
// updateCanvas() {
//     const ctx = this.refs.canvas.getContext('2d');
//     ctx.fillRect(0,0, 400, 400);
// }

//   render() {
//     return (
//       <div>
//         ok
//         <canvas ref="canvas" width={640} height={850} id="canvas" ></canvas>
//         <img ref="image" source="cheese" className="hidden"></img>
//       </div>
//     )
//   }
// }

export default Canvas;