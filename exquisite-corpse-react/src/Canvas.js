import React, { Component } from 'react';
import Immutable from 'immutable';
import Drawing from "./Drawing";
import './Canvas.css'


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
    <div ref="drawArea" className="drawAre"     
      onMouseDown={this.handleMouseDown.bind(this)}
      onMouseMove={this.handleMouseMove}
      >
      
      <Drawing lines={this.state.lines} />
    </div>
  );
}
}


export default Canvas;